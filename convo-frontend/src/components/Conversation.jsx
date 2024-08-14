import { Avatar, AvatarBadge, Box, Flex, Image, Stack, Text, useColorMode, useColorModeValue, WrapItem } from '@chakra-ui/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BsCheck2All, BsFillImageFill } from "react-icons/bs";
import { selectedConversationAtom } from '../atoms/conversationsAtom';
import userAtom from '../atoms/userAtom';

const Conversation = ({ conversation, isOnline }) => {
    const user = conversation.participants[0];
    const currentUser = useRecoilValue(userAtom);
    const lastMessage = conversation.lastMessage;
    const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom);
    const colorMode = useColorMode();

    return (
    <Flex gap={"4"} alignItems={"center"} p={"1"} borderRadius={"md"} _hover={{
        cursor:"pointer",
        bg:useColorModeValue("gray.600","gray.dark"),
        color:"white",
    }} onClick={() => setSelectedConversation({
        _id: conversation._id,
        userId: user._id,
        username: user.username,
        userProfilePic: user.profilePic,
        isVerified: user.isVerified,
        mock: conversation.mock,
    })} bg={selectedConversation?._id === conversation._id ? (colorMode === "light" ? "gray.600" : "gray.dark") : ""}>
        <WrapItem>
            <Avatar size={{
                base:"xs",
                sm:"sm",
                md:"md",
            }} src={user.profilePic}>
                {isOnline ? <AvatarBadge boxSize={"1em"} bg={"green.500"}/> : ""}
            </Avatar>
        </WrapItem>
        
        <Stack direction={"column"} fontSize={"sm"}>
            <Flex alignItems={"center"}>
                <Text fontWeight={"700"} display={"flex"} alignItems={"center"}>
                    {user.username}
                </Text>
                {user.isVerified && (
                    <Image src='/verified.png' w={"4"} h={"4"} ml={"1"}/>
                )}
            </Flex>
            <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={"1"}>
                {currentUser._id === lastMessage.sender ? (
                    <Box color={lastMessage.seen ? "blue.400" : ""}>
                        <BsCheck2All size={"16"}/>
                    </Box>
                ) : ""}
                {lastMessage.text.length > 18 ? lastMessage.text.substring(0,18) + "..." : lastMessage.text || <BsFillImageFill size={"16"}/>}
            </Text>
        </Stack>
    </Flex>
  )
}

export default Conversation