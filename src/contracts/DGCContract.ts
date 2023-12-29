import { ethers } from "ethers";
import { BaseInterface, Erc20 } from "./interfaces";
import { getDgcAbi } from "./utils/getAbis";
import { getDgcAddress } from "./utils/getAddress";

export default class IPTContract extends Erc20 {
  constructor(provider: ethers.providers.Web3Provider) {
    super(provider, getDgcAddress(), getDgcAbi());
  }
}