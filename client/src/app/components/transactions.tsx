"use client";

import { Transaction } from "@/__generated__/graphql";
import { gql, useQuery } from "@apollo/client";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const GET_ADDRESS_TRANSACTIONS = gql`
  query GetAddressTransactions($addressId: String!) {
    getTransactions(addressId: $addressId) {
      id
      txid
      time
      fee
      Inputs {
        address
        value
      }
      Outputs {
        address
        value
      }
    }
  }
`;

export default function Transactions() {
  const params = useParams();
  const searchParams = useSearchParams();
  const addressId = searchParams.get("id");
  const address = params.address as string;

  const [balance, setBalance] = useState<{
    final_balance: number;
    n_tx: number;
    total_received: number;
  } | null>(null);

  const { data, loading, error } = useQuery(GET_ADDRESS_TRANSACTIONS, {
    variables: {
      addressId: addressId,
    },
  });

  useEffect(() => {
    if (!balance) {
      const fetchBalance = async () => {
        const response = await fetch(
          `https://blockchain.info/balance?active=${encodeURIComponent(
            address
          )}`
        );
        const data = await response.json();
        setBalance(data[address]);
      };
      fetchBalance();
    }
  }, [address, balance]);

  const renderTransactions = () => {
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>Error loading transactions</p>;
    }
    if (!data.getTransactions.length) {
      return <p>No transactions found</p>;
    }
    return (
      <>
        {balance ? (
          <div className="font-bold mb-2">
            Balance: {balance.final_balance / 100000000} BTC
          </div>
        ) : null}
        {data.getTransactions.map((transaction: Transaction) => {
          const trxDate = new Date(transaction.time);
          const trxDateString =
            trxDate.toDateString() + " " + trxDate.toTimeString();
          let trxValue = 0;
          return (
            <div key={transaction.id} className="border p-4">
              <div>ID: {transaction.txid}</div>
              <div>{trxDateString}</div>
              <div>Fee: {transaction.fee} Sats</div>
              <div>
                <div className="font-bold">From</div>
                {transaction.Inputs?.map((input, idx) => {
                  if (input.address === address) {
                    trxValue -= input.value;
                  }
                  return (
                    <div className="pl-4" key={`${input.address}-${idx}`}>
                      <p>{input.address}</p>
                      <p>{input.value / 100000000} BTC</p>
                    </div>
                  );
                })}
                <div className="font-bold">To</div>
                {transaction.Outputs?.map((output, idx) => {
                  if (output.address === address) {
                    trxValue += output.value;
                  }
                  return (
                    <div className="pl-4" key={`${output.address}-${idx}`}>
                      <p>{output.address}</p>
                      <p>{output.value / 100000000} BTC</p>
                    </div>
                  );
                })}
                <div className="font-bold">
                  Net change: {trxValue / 100000000} BTC
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return <div>{renderTransactions()}</div>;
}
