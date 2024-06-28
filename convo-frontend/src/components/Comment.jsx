import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import { useState } from "react"
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";


const Comment = ({userAvatar, createdAt, comment, username, likes}) => {
    const [liked, setLiked] = useState(false);

    return (
    <>
        <Flex gap={4} py={2} my={2} w={"full"}>
            <Avatar src="/stockIMG.jpg" size={"sm"}/>
            <Flex gap={1} w={"full"} flexDirection={"column"}>
                <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                    <Text fontSize={"sm"} fontWeight={"bold"}>johnSmith</Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"} color={"gray.light"}>1d</Text>
                        <BsThreeDots/>
                    </Flex>
                </Flex>
                <Text>test comment</Text>
                <Actions liked={liked} setLiked={setLiked}/>
                <Text fontSize={"sm"} color={"gray.light"}>1 likes</Text>
            </Flex>
        </Flex>

        <Divider />
    </>
    )
}

export default Comment