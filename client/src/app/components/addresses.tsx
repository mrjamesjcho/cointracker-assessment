"use client";

import { gql } from "@/__generated__/gql";
import { useMutation, useQuery, gql as apolloGql } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Address } from "@/__generated__/graphql";

const GET_ADDRESSES = gql(`
  query GetAllAddresses {
    getAllAddresses {
      id
      address
    }
  }
`);

const ADD_ADDRESS = apolloGql`
  mutation AddAddress($address: String!) {
    addAddress(address: $address) {
      id
      address
    }
  }
`;

const SYNC_TRANSACTIONS = apolloGql`
  mutation SyncTransactions($address: String!, $addressId: String!) {
    fetchAndAddTransactions(address: $address, addressId: $addressId) {
      id
      txid
    }
  }
`;

export default function Addresses() {
  const router = useRouter();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [newAddress, setNewAddress] = useState("");

  const { data, loading, error } = useQuery(GET_ADDRESSES);
  const [
    addAddress,
    {
      data: addAddressData,
      loading: addAddressLoading,
      error: addAddressError,
    },
  ] = useMutation(ADD_ADDRESS);
  const [
    syncTransactions,
    { loading: syncTransactionsLoading, error: syncTransactionsError },
  ] = useMutation(SYNC_TRANSACTIONS);

  useEffect(() => {
    if (data) {
      setAddresses(data.getAllAddresses || []);
    }
  }, [data]);

  useEffect(() => {
    if (addAddressData && newAddress) {
      setAddresses([...addresses, addAddressData.addAddress]);
      setNewAddress("");
      syncTransactions({
        variables: {
          address: addAddressData.addAddress.address,
          addressId: addAddressData.addAddress.id,
        },
      });
    }
  }, [addAddressData, addresses, newAddress, syncTransactions]);

  const handleAddAddress = async () => {
    if (!newAddress) {
      return;
    }
    await addAddress({ variables: { address: newAddress } });
  };

  const renderAddresses = () => {
    if (error) {
      return <div>There was an error fetching your addresses</div>;
    }
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <ul className="w-fit">
        {addresses.length ? (
          addresses.map((address) => (
            <li
              key={address.id}
              className="border py-2 cursor-pointer hover:bg-gray-800 px-4 m-0"
              onClick={() =>
                router.push(`/${address.address}?id=${address.id}`)
              }
            >
              <div>{address.address}</div>
            </li>
          ))
        ) : (
          <div className="ml-2">---No addresses added to wallet---</div>
        )}
      </ul>
    );
  };

  const renderAddAddressMessage = () => {
    if (addAddressLoading) {
      return <div>Adding address...</div>;
    }
    if (addAddressError) {
      return <div>There was an error adding the address</div>;
    }
    if (syncTransactionsLoading) {
      return <div>Syncing transactions...</div>;
    }
    if (syncTransactionsError) {
      return (
        <div>There was an error syncing transactions for the new address</div>
      );
    }
    return null;
  };

  return (
    <div>
      <input
        type="text"
        className="border p-2 mb-2 bg-white text-black"
        placeholder="Add new address"
        value={newAddress}
        onChange={(e) => setNewAddress(e.target.value)}
      />
      <button
        className="ml-4 border rounded-lg p-2 bg-blue-500 cursor-pointer"
        onClick={handleAddAddress}
      >
        Add
      </button>
      {renderAddAddressMessage()}
      <div className="text-lg my-2">Addresses</div>
      {renderAddresses()}
    </div>
  );
}
