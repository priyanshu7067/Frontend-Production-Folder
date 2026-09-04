export const maskWalletAddress = (address) => {
  if (!address || address.length < 8) return address;
  const firstFour = address.slice(0, 4);
  const lastFour = address.slice(-4);
  return `${firstFour}.......${lastFour}`;
};

export const formatINR = (amount, includeSymbol = true) => {
  if (amount === undefined || amount === null || amount === "") return includeSymbol ? "₹0.00" : "0.00";
  const num = Number(amount);
  if (isNaN(num)) return includeSymbol ? "₹0.00" : "0.00";
  
  const formatted = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(num);

  return includeSymbol ? `₹${formatted}` : formatted;
};

