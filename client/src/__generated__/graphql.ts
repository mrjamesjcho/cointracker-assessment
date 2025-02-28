/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigInt: { input: any; output: any; }
  DateTime: { input: any; output: any; }
};

export type Address = {
  __typename?: 'Address';
  Transactions?: Maybe<Array<Transaction>>;
  address: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type Input = {
  __typename?: 'Input';
  Transaction: Transaction;
  address: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  n: Scalars['Int']['output'];
  prevTxIndex: Scalars['BigInt']['output'];
  value: Scalars['BigInt']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAddress?: Maybe<Address>;
  fetchAndAddTransactions?: Maybe<Array<Transaction>>;
  removeAddress?: Maybe<Address>;
};


export type MutationAddAddressArgs = {
  address: Scalars['String']['input'];
};


export type MutationFetchAndAddTransactionsArgs = {
  address: Scalars['String']['input'];
  addressId: Scalars['String']['input'];
};


export type MutationRemoveAddressArgs = {
  addressId: Scalars['String']['input'];
};

export type Output = {
  __typename?: 'Output';
  Transaction: Transaction;
  address: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  n: Scalars['Int']['output'];
  spent: Scalars['Boolean']['output'];
  value: Scalars['BigInt']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAddress?: Maybe<Address>;
  getAllAddresses?: Maybe<Array<Address>>;
  getTransactions?: Maybe<Array<Transaction>>;
};


export type QueryGetAddressArgs = {
  addressId: Scalars['String']['input'];
};


export type QueryGetTransactionsArgs = {
  addressId: Scalars['String']['input'];
};

export type Transaction = {
  __typename?: 'Transaction';
  Address: Address;
  Inputs?: Maybe<Array<Input>>;
  Outputs?: Maybe<Array<Output>>;
  blockHeight: Scalars['Int']['output'];
  blockIndex?: Maybe<Scalars['BigInt']['output']>;
  doubleSpend: Scalars['Boolean']['output'];
  fee: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  lockTime: Scalars['Int']['output'];
  size: Scalars['Int']['output'];
  time: Scalars['DateTime']['output'];
  txIndex: Scalars['BigInt']['output'];
  txid: Scalars['String']['output'];
  weight: Scalars['Int']['output'];
};

export type GetAllAddressesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAddressesQuery = { __typename?: 'Query', getAllAddresses?: Array<{ __typename?: 'Address', id: string, address: string }> | null };


export const GetAllAddressesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllAddresses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllAddresses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}}]}}]}}]} as unknown as DocumentNode<GetAllAddressesQuery, GetAllAddressesQueryVariables>;