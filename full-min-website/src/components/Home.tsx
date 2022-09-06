import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { BigNumber, Contract, ethers } from "ethers";
import React, { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import RoboPunksNFT from "../RoboPunksNFT.json";

const roboPunksNFTAdress = "0x0c1f99Be36968Fcd204475fEDAEC089221c88Fc4";

type HomeProps = {
  accounts: any[];
  setAccounts: Dispatch<SetStateAction<any>>;
};

const Home = ({ accounts, setAccounts }: HomeProps) => {
  const [mintAmount, setMintAmount] = useState(1);
  const isConnected = Boolean(accounts[0]);

  const handleMint = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        roboPunksNFTAdress,
        RoboPunksNFT.abi,
        signer
      );

      try {
        const response = await contract.mint(BigNumber.from(mintAmount), {
          value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
        });
        console.log("response", response);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
  };

  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };

  return (
    <Flex
      flexDir={"column"}
      justify={"center"}
      align={"center"}
      height={"100vh"}
      pb={"150px"}
    >
      <Box w={"520px"}>
        <Box>
          <Text fontSize={"48px"} textShadow={"0 5px #000000"}>
            RoboPunks
          </Text>
          <Text
            fontSize={"30px"}
            letterSpacing={"-5.5%"}
            fontFamily={"VT323"}
            textShadow={"0 2px 2px #000000"}
          >
            It's 2078. Can the robopunks NFT save humans from destructive
            rampant NFT speculation? Mint Robopunks to find out.
          </Text>
        </Box>
      </Box>
      {isConnected ? (
        <Box>
          <Flex justify={"center"} align={"center"}>
            <Button
              _hover={{ backgroundColor: "#F6517D" }}
              backgroundColor={"#D6517D"}
              borderRadius={"5px"}
              boxShadow={"0px 2px 2px 1px #0F0F0F"}
              color={"white"}
              onClick={handleDecrement}
            >
              -
            </Button>
            <Input
              value={mintAmount}
              background={"white"}
              color={"black"}
              type={"number"}
            />
            <Button
              _hover={{ backgroundColor: "#F6517D" }}
              backgroundColor={"#D6517D"}
              borderRadius={"5px"}
              boxShadow={"0px 2px 2px 1px #0F0F0F"}
              color={"white"}
              onClick={handleIncrement}
            >
              +
            </Button>
          </Flex>
          <Button
            _hover={{ backgroundColor: "#F6517D" }}
            backgroundColor={"#D6517D"}
            borderRadius={"5px"}
            boxShadow={"0px 2px 2px 1px #0F0F0F"}
            color={"white"}
            onClick={handleMint}
            mt={4}
          >
            Mint Now
          </Button>
        </Box>
      ) : (
        <Text
          mt={"70px"}
          fontSize={"30px"}
          color={"#D6517D"}
          letterSpacing={"-5.5%"}
          fontFamily={"VT323"}
          textShadow={"0 2px 2px #000000"}
        >
          You must connect to mint
        </Text>
      )}
    </Flex>
  );
};

export default Home;
