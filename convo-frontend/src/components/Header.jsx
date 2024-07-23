import { Flex, Image, Link, useColorMode, Button } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { AiFillHome } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import useLogout from "../hooks/useLogout";
import { BsFillChatQuoteFill } from "react-icons/bs";

const Header = () => {
  const {colorMode} = useColorMode();
  const user = useRecoilValue(userAtom);
  const logout = useLogout();

  return (
    <Flex justifyContent={"space-between"} mt={6} mb={12}>

        {user && (
          <Link as={RouterLink} to={"/"}>
            <AiFillHome size={"24"} />
          </Link>
        )}

        <Image cursor={"pointer"} alt="logo" w={6} src={"/stockIMG.jpg"}/>

        {user && (
          <Flex alignItems={"center"} gap={"4"}>
            <Link as={RouterLink} to={`/${user.username}`}>
              <RxAvatar size={"24"} />
            </Link>
            <Link as={RouterLink} to={`/chat`}>
              <BsFillChatQuoteFill size={"24"} />
            </Link>
            <Button size={"xs"} onClick={logout}>
              <FiLogOut size={"20"}/>
            </Button>
          </Flex>
        )}
    </Flex>
)}

export default Header