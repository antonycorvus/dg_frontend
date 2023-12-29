declare var window: any;
import { ConnectWallet, DisConnectWallet, WalletInfo } from "@/components";
import { menus } from "@/constants";
import { setWalletInfo, setWeb3Provider, disconnectWallet } from "@/reduxs/accounts/account.slices";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import { Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { ethers } from "ethers"; 
import Link from "next/link";
import { useRouter } from "next/router";
import React, {ReactNode} from 'react';
import { useDispatch } from "react-redux";

interface IProps {
  children: ReactNode;
}

export default function MainLayout({children}: IProps) {
  const router = useRouter();
  console.log(router.pathname)

  const dispatch = useAppDispatch();
  const {wallet} = useAppSelector((state) => state.account);

  const onConnectMetamask = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        undefined
      );
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const bigBalance = await signer.getBalance();
      const bnbBalance = Number.parseFloat(
        ethers.utils.formatEther(bigBalance)
      );
      dispatch(setWalletInfo({ address, bnb: bnbBalance }));
      dispatch(setWeb3Provider(provider));
    }
  };

  return (
    <Flex
      w={{ base: "full", lg: "70%" }}
      flexDirection="column"
      margin="50px auto"
    >
      <Flex w="full" alignItems="center" justifyContent="center">
        <Heading size="lg" fontWeight="bold">
          Blockchain
        </Heading>
        <Spacer />
        {menus.map((menu) => <Link href={menu.url} key={menu.url}>
            <a>
              <Text mx="10px" fontSize="20px" textDecoration="underline">{menu.name}</Text>
            </a>
        </Link>)}
        {!wallet ? (
          <ConnectWallet onClick={onConnectMetamask} />
        ) : (
          <>
            <WalletInfo address={wallet?.address} amount={wallet?.bnb || 0} />
            <DisConnectWallet onClick={() => dispatch(disconnectWallet())} /> 
          </>
        )}

      </Flex>
      <Flex w="full" flexDirection="column" py="50px">
         {children}
      </Flex>     
    </Flex>
  );
}
