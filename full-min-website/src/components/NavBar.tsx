import { Box, Button, Flex, Image, Link, Spacer, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

import TwitterIcon from "../assets/social-media-icons/twitter_32x32.png";
import FacebookIcon from "../assets/social-media-icons/facebook_32x32.png";
import EmailIcon from "../assets/social-media-icons/email_32x32.png";

type NavBarProps = {
  accounts: any[];
  setAccounts: Dispatch<SetStateAction<any>>;
};

const NavBar = ({ accounts, setAccounts }: NavBarProps) => {
  const isConnected = Boolean(accounts[0]);

  const connectAccount = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  };

  return (
    <Flex p={"30px"} align={"center"} justify={"space-between"}>
      <Flex justify={"space-around"} p={"0 75px"} width={"40%"}>
        <Link href={"#"}>
          <Image src={TwitterIcon} alt={""} boxSize={"45px"} />
        </Link>

        <Link href={"#"}>
          <Image src={FacebookIcon} alt={""} boxSize={"45px"} />
        </Link>

        <Link href={"#"}>
          <Image src={EmailIcon} alt={""} boxSize={"45px"} />
        </Link>
      </Flex>

      <Flex
        justify={"space-around"}
        align={"center"}
        width={"40%"}
        fontSize={"24px"}
      >
        <Box margin={"0 15px"}>About</Box>
        <Spacer></Spacer>
        <Box margin={"0 15px"}>Mint</Box>
        <Spacer></Spacer>
        <Box margin={"0 15px"}>Team</Box>
        <Spacer></Spacer>
      </Flex>
      {isConnected ? (
        <Text>Connected</Text>
      ) : (
        <Button
          onClick={connectAccount}
          _hover={{ backgroundColor: "#F6517D" }}
          backgroundColor={"#D6517D"}
          borderRadius={"5px"}
          boxShadow={"0px 2px 2px 1px #0F0F0F"}
          color={"white"}
        >
          Connect
        </Button>
      )}
    </Flex>
  );
};

export default NavBar;
