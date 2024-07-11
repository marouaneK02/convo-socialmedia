import { Flex, Image, Link, useColorMode } from "@chakra-ui/react"
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { AiFillHome } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";

const Header = () => {
  const {colorMode} = useColorMode();
  const user = useRecoilValue(userAtom);

  return (
    <Flex justifyContent={"space-between"} mt={6} mb={12}>

        {user && (
          <Link as={RouterLink} to={"/"}>
            <AiFillHome size={"24"} />
          </Link>
        )}

        <Image cursor={"pointer"} alt="logo" w={6} src={"/stockIMG.jpg"}/>

        {user && (
          <Link as={RouterLink} to={`/${user.username}`}>
            <RxAvatar size={"24"} />
          </Link>
        )}
    </Flex>
)}

export default Header