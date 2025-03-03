This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## UI Specification for Bitcoin Wallet App

### Overview

The Bitcoin Wallet app is built with Next.js and Apollo Client, providing an interface to manage and view Bitcoin addresses and their associated transactions. The app consists of two main pages: the wallet overview and the transaction history for a specific address.

### Pages

#### Home (Main Page)

- **URL:** `/`
- **Components:**
  - `Addresses`
- **UI Elements:**
  - Header with the title "Bitcoin Wallet".
  - Address input field with a button to add a new address.
  - List of added addresses, clickable to view transactions.
  - Loading and error states for address fetching and adding.

#### Address Transactions Page

- **URL:** `/{address}?id={addressId}`
- **Components:**
  - `Transactions`
- **UI Elements:**
  - Header with the title "Address Transactions".
  - List of transactions with details:
    - Transaction ID
    - Date and time
    - Fee (in Satoshis)
    - Inputs (from addresses and values)
    - Outputs (to addresses and values)
    - Net change for the address
  - Loading and error states for transaction fetching.
  - Display of current balance, number of transactions, and total received amount (fetched from an external API).

### Components

#### `Addresses`

- **Description:** Manages the display and addition of Bitcoin addresses.
- **State:**
  - `addresses`: List of current addresses.
  - `newAddress`: Address string to be added.
- **API Operations:**
  - Query: `getAllAddresses`
  - Mutation: `addAddress`, `fetchAndAddTransactions`
- **UI Behavior:**
  - On adding an address, immediately fetch and sync transactions.
  - Navigate to the transaction page on address click.

#### `Transactions`

- **Description:** Displays transaction details for a specific address.
- **State:**
  - `balance`: Current balance, number of transactions, and total received.
- **API Operations:**
  - Query: `getTransactions`
  - External API call for address balance.
- **UI Behavior:**
  - Show loading and error states.
  - Calculate and display net change in balance per transaction.

### User Flows

1. **Add Address:**

   - User enters an address and clicks "Add".
   - The app adds the address and syncs transactions.
   - The new address appears in the list.

2. **View Transactions:**

   - User clicks an address.
   - The app navigates to the transaction page and fetches transactions.
   - The app shows the transaction list and address balance.

3. **Transaction Details:**

   - User views transaction details, including inputs and outputs.
   - The app shows net balance change for the address.

### Error Handling

- Address and transaction loading errors display appropriate messages.
- Handle empty states with fallback text (e.g., "No addresses added", "No transactions found").

### Styling

- Tailwind CSS for styling.
