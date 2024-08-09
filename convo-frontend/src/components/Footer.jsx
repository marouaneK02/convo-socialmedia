import { Box, Divider, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box marginTop={"auto"}>
      <Divider my={"4"}/>
      <Link as={RouterLink} to={"https://github.com/marouaneK02"}>
        <Text mb={"4"} color={"gray"} align={"center"} fontSize={"14"}>Made by marouaneK02</Text>
      </Link>
    </Box>
  )
}

export default Footer