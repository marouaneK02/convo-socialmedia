import { Flex, Image, Link, useColorMode, Button, Box, Menu, MenuButton, Portal, MenuList, MenuItem } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { AiFillHome } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import useLogout from "../hooks/useLogout";

const Header = () => {
  const user = useRecoilValue(userAtom);
  const logout = useLogout();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      {user ? (
        <Flex justifyContent={"space-between"} mt={"6"} mb={"12"}>
        <Link as={RouterLink} to={"/"}>
            <AiFillHome size={"26"}/>
        </Link>
  
        <Image alt="logo" w={"7"} h={"7"} src={"/logoSM.png"}/>
  
        <Menu>
          <MenuButton>
            <RxAvatar size={"26"} cursor={"pointer"}/>
          </MenuButton>
          <Portal>
            <MenuList bg={"gray.dark"}>
              <MenuItem bg={"gray.dark"}>
                <Link as={RouterLink} to={`/${user.username}`}>Profile Page</Link>
              </MenuItem>
              <MenuItem bg={"gray.dark"}>
                <Link as={RouterLink} to={`/chat`}>Chat Page</Link>
              </MenuItem>
              <MenuItem bg={"gray.dark"}>
                <Link as={RouterLink} to={`/settings`}>Settings</Link>
              </MenuItem>
              <MenuItem bg={"gray.dark"}>
                <Link onClick={logout}>Logout</Link>
              </MenuItem>
            </MenuList>
          </Portal>
        </Menu>
      </Flex>
      ) : (
        <Flex display={"flex"} justifyContent={"center"} alignItems={"center"} mt={"6"} mb={"12"}>
          <Link as={RouterLink} to={"/"}>
            <Image alt="logo" w={"7"} h={"7"} src={"/logoSM.png"}/>
          </Link>
        </Flex>
      )}
    </>
)}

export default Header