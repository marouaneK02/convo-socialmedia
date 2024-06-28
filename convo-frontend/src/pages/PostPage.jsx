import { Avatar, Box, Button, Divider, Flex, Image, Text } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import Actions from "../components/Actions"
import { useState } from "react"
import Comment from "../components/Comment"

const PostPage = () => {
  const [liked, setLiked] = useState(false);

  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src="/stockIMG.jpg" size={"md"} name="John Smith"/>
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>johnSmith</Text>
            <Image src="/stockIMG.jpg" w={4} h={4} ml={4}/>
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"sm"} color={"gray.light"}>1d</Text>
          <BsThreeDots />
        </Flex>
      </Flex>

      <Text my={3}>test post</Text>
      <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
        <Image src="/stockIMG.jpg" w={"full"}/>
      </Box>

      <Flex gap={3} my={3}>
        <Actions liked={liked} setLiked={setLiked}/>
      </Flex>

      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"sm"}>2 replies</Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}/>
        <Text color={"gray.light"} fontSize={"sm"}>10 likes</Text>
      </Flex>

      <Divider my={4}/>

      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"}>Log In to post, like and reply.</Text>
        </Flex>
        <Button>Log In</Button>
      </Flex>

      <Divider my={4}/>
      <Comment/>
    </>
  )
}

export default PostPage