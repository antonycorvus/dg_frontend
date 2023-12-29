export type AddressType  = {
  97: string;
  56: string;
}

export enum CHAIN_ID {
  TESTNET = 97,
  MAINNET = 56,
}

export default function getChainIdFromEnv(): number {
  const env = process.env.NEXT_PUBLIC_CHAIN_ID;
  if (!env) { return 97;}
  return parseInt(env);
}


export const getRPC = () => {
  if (getChainIdFromEnv() === CHAIN_ID.MAINNET)
    return process.env.NEXT_PUBLIC_RPC_MAINNET;
  return process.env.NEXT_PUBLIC_RPC_TESTNET;
}
export const SMART_ADDRESS = {
  CROWD_SALE: {97: '0x6e7230248202E8Eab28c4dF0597709174717EeAC', 56: ''},
  USDT: {97: '0x8C53be8442636D37B10F7345b472c9231aFD5c3E', 56: ''},
  NFT: {97: '0x261F3c84AdA78Dcc021ed2db7410cf74F15e27da', 56: ''},
  MARKET: {97: '0x7825De520C30c1C694FD34E52877F46592C694F6', 56: ''},
  AUCTION: {97: '0x4bB294304c1b3FaE65Ee5e1C8d703188b288087F', 56: ''},
  DGC: {97: '0x455f28320602bB3CE16997805717D5555d77fCfe', 56: ''}
}