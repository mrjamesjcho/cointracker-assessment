import { PrismaClient } from "@prisma/client";
import TransactionsAPI from "./bitcoin_api/transactions.js";
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    getAddress: async (_: any, { addressId }: { addressId: string }) => {
      return await prisma.address.findUnique({
        where: { id: addressId },
        include: { Transactions: true },
      });
    },
    getAllAddresses: async () => {
      return await prisma.address.findMany();
    },
    getTransactions: async (_: any, { addressId }: { addressId: string }) => {
      return await prisma.transaction.findMany({
        where: { addressId },
        include: { Inputs: true, Outputs: true, Address: true },
      });
    },
  },
  Mutation: {
    addAddress: async (_: any, { address }: { address: string }) => {
      return await prisma.address.create({
        data: { address },
      });
    },
    removeAddress: async (_: any, { addressId }: { addressId: string }) => {
      return await prisma.address.delete({
        where: { id: addressId },
      });
    },
    fetchAndAddTransactions: async (
      _: any,
      { addressId, address }: { addressId: string; address: string }
    ) => {
      try {
        const response = await TransactionsAPI.getTransactions(address);
        const transactions = response.txs;
        const newTransactions = [];

        for (const tx of transactions) {
          const trxDb = await prisma.transaction.upsert({
            where: { txid: tx.hash },
            update: {},
            create: {
              txid: tx.hash,
              txIndex: tx.tx_index,
              blockHeight: tx.block_height,
              time: new Date(tx.time * 1000),
              fee: tx.fee,
              size: tx.size,
              weight: tx.weight,
              lockTime: tx.lock_time,
              doubleSpend: tx.double_spend,
              addressId: addressId,
              Inputs: {
                create: tx.inputs.map((input: any) => ({
                  address: input.prev_out.addr,
                  value: input.prev_out.value,
                  prevTxIndex: input.prev_out.tx_index,
                  n: input.prev_out.n,
                })),
              },
              Outputs: {
                create: tx.out.map((output: any) => ({
                  address: output.addr,
                  value: output.value,
                  spent: output.spent,
                  n: output.n,
                })),
              },
            },
          });
          newTransactions.push(trxDb);
        }
        return newTransactions;
      } catch (error) {
        console.error("Error fetching transactions:", error);
        throw new Error("Failed to fetch or save transactions.");
      }
    },
  },
};

export default resolvers;
