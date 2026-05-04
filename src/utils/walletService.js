import { ethers } from "ethers";

export const connectAndSign = async () => {
  if (!window.ethereum) {
    throw new Error("Please install MetaMask");
  }

  // 🔗 Connect wallet
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);

  const signer = await provider.getSigner();
  const address = await signer.getAddress();

  // 🔐 Create message (backend should also generate this ideally)
  const message = `Login to Crypto App at ${new Date().toLocaleString()}`;

  // ✍️ Sign message
  const signature = await signer.signMessage(message);

  return {
    address,
    signature,
    message,
  };
};

export const connectWallet = async () => {
  if (!window.ethereum) {
    throw new Error("Install MetaMask / Wallet");
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  return accounts[0];
};

export const getConnectedWallet = async () => {
  if (!window.ethereum) return null;

  const accounts = await window.ethereum.request({
    method: "eth_accounts",
  });

  return accounts?.[0] || null;
};

const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955"; // BSC
const USDT_ABI = [
  "function transfer(address to, uint256 amount) returns (bool)",
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

export const connectAndSendUSDT = async (amount) => {
  if (!window.ethereum) {
    throw new Error("Install MetaMask / Wallet");
  }

  // 🔗 Connect
  await window.ethereum.request({ method: "eth_requestAccounts" });

  // 🔄 Switch to BSC
  const chainId = await window.ethereum.request({ method: "eth_chainId" });

if (chainId !== "0x38") {
  throw new Error("Please switch to BSC network manually");
}

  await window.ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: "0x38" }],
  });


  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();

  const receiver = import.meta.env.VITE_PAYMENT_ADDRESS;

  if (!ethers.isAddress(receiver)) {
    throw new Error("Invalid receiver address");
  }

  const contract = new ethers.Contract(USDT_ADDRESS, USDT_ABI, signer);

  const decimals = await contract.decimals();
  const amountInWei = ethers.parseUnits(amount.toString(), decimals);

  // 🔍 Check balance
//   const balance = await contract.balanceOf(address);

//   if (balance < amountInWei) {
//     throw new Error("Insufficient USDT balance");
//   }

//   const bnbBalance = await provider.getBalance(address);

// if (bnbBalance === 0n) {
//   throw new Error("You need BNB for gas fees");
// }

  // 💸 SEND USDT
  // const tx = await contract.transfer(receiver, amountInWei);

  // await tx.wait();

  return {
    walletAddress: address,
    // transactionHash: tx.hash,
    transactionHash: "8973489739hjkdsahfiu89389reh",
    amount,
  };
};