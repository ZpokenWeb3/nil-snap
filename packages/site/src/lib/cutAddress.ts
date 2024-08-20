export const cutAddress = (address: string) => {
  {
    const addressToLowerCase = address.toLowerCase();
    
    return `0x${addressToLowerCase.slice(0, 7)}...${addressToLowerCase.slice(
      addressToLowerCase.length - 8,
    )}`;
  }
};
