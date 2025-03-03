## Database Specification

### Overview

The database schema models a blockchain transaction system, capturing essential details about transactions, their inputs, outputs, and associated addresses.

### Tables

#### Transaction

Stores information about each blockchain transaction.

- `id`: Unique identifier for the transaction (CUID).
- `txid`: Unique transaction ID.
- `txIndex`: Transaction index within a block.
- `blockHeight`: Block number where the transaction is included.
- `blockIndex`: Optional index of the transaction within the block.
- `time`: Timestamp of the transaction.
- `fee`: Transaction fee (in smallest currency unit).
- `size`: Size of the transaction in bytes.
- `weight`: Transaction weight (for SegWit transactions).
- `lockTime`: Lock time for the transaction.
- `doubleSpend`: Boolean indicating if the transaction is a double spend.
- `addressId`: ID of the associated address.

Relations:

- One-to-many with `Input` and `Output`.
- Many-to-one with `Address`.

#### Input

Represents an input in a blockchain transaction.

- `id`: Unique identifier for the input (CUID).
- `address`: Address providing the input.
- `value`: Value of the input.
- `prevTxIndex`: Index of the previous transaction.
- `n`: Index of the input within the transaction.
- `transactionId`: ID of the associated transaction.

Relations:

- Many-to-one with `Transaction`.

#### Output

Represents an output in a blockchain transaction.

- `id`: Unique identifier for the output (CUID).
- `address`: Address receiving the output.
- `value`: Value of the output.
- `spent`: Boolean indicating if the output has been spent.
- `n`: Index of the output within the transaction.
- `transactionId`: ID of the associated transaction.

Relations:

- Many-to-one with `Transaction`.

#### Address

Stores unique blockchain addresses.

- `id`: Unique identifier for the address (CUID).
- `address`: Blockchain address (unique).

Relations:

- One-to-many with `Transaction`.

### Usage

This schema supports querying transaction histories, address balances, and block-level transaction aggregation.

## API Specification

### Overview

This API provides access to blockchain transaction data, supporting both query and mutation operations through a GraphQL interface. It enables retrieving address and transaction details, managing address records, and fetching live transaction data.

---

### API Endpoints

#### Queries

- **`getAddress(addressId: String!): Address`**

  - Retrieves a specific address by ID.
  - **Parameters:**
    - `addressId` (String, required): The ID of the address to fetch.
  - **Returns:** Address object with transaction details.

- **`getAllAddresses: [Address!]`**

  - Fetches all addresses in the database.
  - **Returns:** List of all address objects.

- **`getTransactions(addressId: String!): [Transaction!]`**
  - Retrieves all transactions associated with a given address.
  - **Parameters:**
    - `addressId` (String, required): The ID of the address to fetch transactions for.
  - **Returns:** List of transaction objects.

#### Mutations

- **`addAddress(address: String!): Address`**

  - Adds a new address to the database.
  - **Parameters:**
    - `address` (String, required): The blockchain address to add.
  - **Returns:** The added address object.

- **`removeAddress(addressId: String!): Address`**

  - Removes an address and its associated transactions.
  - **Parameters:**
    - `addressId` (String, required): The ID of the address to remove.
  - **Returns:** The removed address object.

- **`fetchAndAddTransactions(addressId: String!, address: String!): [Transaction!]`**
  - Fetches live transactions for an address and adds them to the database.
  - **Parameters:**
    - `addressId` (String, required): The ID of the address.
    - `address` (String, required): The blockchain address string.
  - **Returns:** List of newly fetched transactions.

### Data Types

- **Address**

  - `id`: ID of the address.
  - `address`: Blockchain address string.
  - `Transactions`: List of transactions linked to the address.

- **Transaction**

  - `id`: ID of the transaction.
  - `txid`: Transaction ID.
  - `txIndex`: Transaction index.
  - `blockHeight`: Height of the block containing the transaction.
  - `blockIndex`: Optional block index.
  - `time`: Transaction timestamp.
  - `fee`: Transaction fee.
  - `size`: Transaction size.
  - `weight`: Transaction weight.
  - `lockTime`: Lock time for the transaction.
  - `doubleSpend`: Indicates if the transaction is a double spend.
  - `Inputs`: List of input objects.
  - `Outputs`: List of output objects.
  - `Address`: Associated address object.

- **Input**

  - `id`: ID of the input.
  - `address`: Input address.
  - `value`: Input value.
  - `prevTxIndex`: Previous transaction index.
  - `n`: Input index within the transaction.
  - `Transaction`: Associated transaction object.

- **Output**
  - `id`: ID of the output.
  - `address`: Output address.
  - `value`: Output value.
  - `spent`: Indicates if the output is spent.
  - `n`: Output index within the transaction.
  - `Transaction`: Associated transaction object.

### Usage

This API is tailored for blockchain explorers, wallets, and analytics platforms. It allows users to explore transaction histories, manage address tracking, and stay updated with live blockchain data.
