import { Avatar, Divider, Flex, Image, Skeleton, SkeletonCircle, Text, useColorModeValue } from '@chakra-ui/react';
import Message from './Message';
import MessageInput from './MessageInput';

const MessageContainer = () => {
  return (
    <Flex flex={"70"} bg={useColorModeValue("gray.200","gray.dark")} p={"2"} borderRadius={"md"} flexDirection={"column"}>
        <Flex w={"full"} h={"12"} alignItems={"center"} gap={"2"}>
            <Avatar src='stockIMG.jpg' size={"sm"}/>
            <Text display={"flex"} alignItems={"center"}>
                johnSmith
                <Image src='stockIMG.jpg' w={"4"} h={"4"} ml={"1"}/>
            </Text>
        </Flex>

        <Divider/>

        <Flex flexDirection={"column"} 
        gap={"4"} 
        my={"4"} 
        p={"2"}
        height={"400px"} 
        overflowY={"auto"}>
            {false && (
                [0,1,2,3,4,5].map((_,i) => (
                    <Flex 
                    key={i} 
                    gap={"2"} 
                    alignItems={"center"} 
                    p={"1"} 
                    borderRadius={"md"} 
                    alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}>
                        {i % 2 === 0 && <SkeletonCircle size={"7"}/>}
                        <Flex flexDirection={"column"} gap={"2"}>
                            <Skeleton h={"8px"} w={"250px"}/>
                            <Skeleton h={"8px"} w={"250px"}/>
                            <Skeleton h={"8px"} w={"250px"}/>
                        </Flex>
                        {i % 2 !== 0 && <SkeletonCircle size={"7"}/>}
                    </Flex>
                ))
            )}
            
            <Message/>
        </Flex>

        <MessageInput/>
    </Flex>
  )
}

export default MessageContainer