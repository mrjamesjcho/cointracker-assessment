import Addresses from "./components/addresses";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">Bitcoin Wallet</h1>
      <Addresses />
    </div>
  );
}
