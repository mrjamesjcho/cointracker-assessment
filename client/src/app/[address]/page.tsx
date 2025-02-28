import Transactions from "../components/transactions";

export default function Page() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">Address Transactions</h1>
      <Transactions />
    </div>
  );
}
