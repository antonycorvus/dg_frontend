import {
  VStack,
  HStack,
  Input,
  Button,
  UnorderedList,
  ListItem,
  Text,
  ChakraProvider,
  extendTheme,
  Heading,
  Box,
  Td,
  Tr,
  Th,
  Table,
  Tbody,
  Thead,
} from '@chakra-ui/react';
import { IWalletInfo } from '@/_types_';
interface IProps{
  walletInfo?: IWalletInfo;
}

const theme = extendTheme({
  colors: {
    primary: '#FF0000',
  },
  styles: {
    global: {
      body: {
        bg: '',
      },
    },
  },
});

import Image from 'next/image';
import { io, Socket } from 'socket.io-client';

import React, { ChangeEventHandler, useState, useEffect} from 'react';

const socket:Socket = io("http://localhost:3000");

interface User {
  name: string;
  shortname: string;
  identifier: string;
  address: string;
  walletAddress: string;
}

export default function UserManagement({walletInfo}: IProps){
  const gsgs = walletInfo?.address;
  console.log(gsgs);
  //const [socket, setSocket] = useState<any>(undefined);

  const [userList, setUserList] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({
    name: "",
    shortname: "",
    identifier: "",
    address: "",
    walletAddress: "",
  });

  useEffect(()=>{
    
    socket.on("userList", (data: User[]) => {
      setUserList(data);
    });
    return () => {
      socket.off("userList");
    };

  }, [])

  const handleAddUser = () => {
      socket.emit("addUser", newUser);
      setNewUser({
      name: "",
      shortname: "",
      identifier: "",
      address: "",
      walletAddress: "",
      });

   
    
  };

  const handleRemoveUser = (index: number) => {
    socket.emit("removeUser", index);
  };

 

  useEffect(() => {
    const handleUpdateUserList = () => {
      socket.emit("updateUserList");
    };

    setUserList([]);
    handleUpdateUserList();

    return () => {
      socket.off("updateUserList");
    };
  }, []);

  return(
    <ChakraProvider theme={theme}>
       <VStack spacing={4} align="flex-start" p={4} borderRadius="md">
         <Heading size="xl">User Information</Heading>
         <HStack>
             <Input type="text" placeholder="Name" value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <Input type="text" placeholder="Short Name" value={newUser.shortname}
                onChange={(e) => setNewUser({ ...newUser, shortname: e.target.value })}
            />
            <Input type="text" placeholder="CMND" value={newUser.identifier}
                onChange={(e) => setNewUser({ ...newUser, identifier: e.target.value })}
            />
            <Input type="text"  placeholder="Address" value={newUser.address}
                onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
            />
            <Input type="text" placeholder="Wallet Address" value={newUser.walletAddress}
                onChange={(e) => setNewUser({ ...newUser, walletAddress: e.target.value })}
            />
          <Button colorScheme="yellow" color="black" onClick={handleAddUser}>
            Add
          </Button>
        </HStack>
        <HStack>
        <Box width="1200px">
  <Table>
    <Thead>
      <Tr>
        <Th border="1px" borderColor="gray.300">Name</Th>
        <Th border="1px" borderColor="gray.300">Short Name</Th>
        <Th border="1px" borderColor="gray.300">CMND</Th>
        <Th border="1px" borderColor="gray.300">Address</Th>
        <Th border="1px" borderColor="gray.300">Wallet Address</Th>
        <Th borderBottom="1px" borderColor="gray.300"></Th>
      </Tr>
    </Thead>


    <Tbody >
    {userList.map((user, index) => (
        <Tr key={index}>
          <Td border="1px" borderColor="gray.300">{user.name}</Td>
          <Td border="1px" borderColor="gray.300">{user.shortname}</Td>
          <Td border="1px" borderColor="gray.300">{user.identifier}</Td>
          <Td border="1px" borderColor="gray.300">{user.address}</Td>
          <Td border="1px" borderColor="gray.300">{user.walletAddress}</Td>
          <Td border="1px" borderColor="gray.300">
            <Button colorScheme="yellow" size="sm" onClick={() => handleRemoveUser(index)}>
              Remove
            </Button>
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
</Box>
        </HStack>
      </VStack>
    </ChakraProvider>
  );

}