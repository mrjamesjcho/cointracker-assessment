import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    getAddress: async (_: any, { address }: { address: string }) => {
      return await prisma.address.findUnique({
        where: { address },
        include: { Transactions: true, Inputs: true, Outputs: true },
      });
    },
    getAddresses: async () => {
      return await prisma.address.findMany();
    },
    getTransactions: async (_: any, { address }: { address: string }) => {
      return await prisma.transaction.findMany({
        where: { addressId: address },
        include: { Inputs: true, Outputs: true },
      });
    },
  },
  Mutation: {
    addAddress: async (_: any, { address }: { address: string }) => {
      return await prisma.address.create({
        data: { address },
      });
    },
    removeAddress: async (_: any, { address }: { address: string }) => {
      return await prisma.address.delete({
        where: { address },
      });
    },
  },
};
export default resolvers;
