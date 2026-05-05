export const maskWalletAddress = (address) => {
  if (!address || address.length < 8) return address;
  const firstFour = address.slice(0, 4);
  const lastFour = address.slice(-4);
  return `${firstFour}.......${lastFour}`;
};
