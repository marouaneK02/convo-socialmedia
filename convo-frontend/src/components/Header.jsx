import { Flex, Image, useColorMode } from "@chakra-ui/react"


const Header = () => {
  const {colorMode} = useColorMode();

  return (
    <Flex justifyContent={"center"} mt={6} mb={12}>
        <Image cursor={"pointer"} alt="logo" w={6} src={"/stockIMG.jpg"}/>
    </Flex>
)}

export default Header