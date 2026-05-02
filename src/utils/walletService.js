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