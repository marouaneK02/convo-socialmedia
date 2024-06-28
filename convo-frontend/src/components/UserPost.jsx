import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import { Link } from "react-router-dom"
import Actions from "./Actions"
import { useState } from "react"


const UserPost = ({postIMG, postTitle, likes, replies}) => {
    const [liked, setLiked] = useState(false);

    return (
    <Link to={"/john/post/1"}>
        <Flex gap={3} mb={4} py={5}>
            <Flex flexDirection={"column"} alignItems={"center"}>
                <Avatar size="md" name="John Smith" src="/stockIMG.jpg"/>
                <Box w={"1px"} h={"full"} bg={"gray.light"} my={2}/>
                <Box position={"relative"} w={"full"}>
                    <Avatar size={"xs"} name="Johnny Silverhand" src="/stockIMG.jpg" position={"absolute"} top={"0px"} left={"15px"} padding={"2px"}/>
                    <Avatar size={"xs"} name="Johnny Silverhand" src="/stockIMG.jpg" position={"absolute"} bottom={"0px"} right={"-5px"} padding={"2px"}/>
                    <Avatar size={"xs"} name="Johnny Silverhand" src="/stockIMG.jpg" position={"absolute"} bottom={"0px"} left={"4px"} padding={"2px"}/>
                </Box>
            </Flex>

            <Flex flex={1} flexDirection={"column"} gap={2}>
                <Flex justifyContent={"space-between"} w={"full"}>
                    <Flex w={"full"} alignItems={"center"}>
                        <Text fontSize={"sm"} fontWeight={"bold"}>johnSmith</Text>
                        <Image src="/stockIMG.jpg" w={4} h={4} ml={1}/>
                    </Flex>
                    <Flex gap={4} alignItems={"center"} >
                        <Text fontSize={"sm"} color={"gray.light"}>1d</Text>
                        <BsThreeDots/>
                    </Flex>
                </Flex>
                <Text fontSize={"sm"}>test post</Text>
                <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
                    <Image src="/stockIMG.jpg" w={"full"}/>
                </Box>
                <Flex gap={3} my={1}>
                    <Actions liked={liked} setLiked={setLiked}/>
                </Flex>
                <Flex gap={2} alignItems={"center"} >
                    <Text color={"gray.light"} fontSize={"sm"}>{replies} replies </Text>
                    <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}/>
                    <Text color={"gray.light"} fontSize={"sm"}>{likes} likes </Text>
                </Flex>
            </Flex>
        </Flex>
    </Link>
  )
}

export default UserPost