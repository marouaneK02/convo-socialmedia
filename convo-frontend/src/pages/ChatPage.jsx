import { SearchIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Input, Skeleton, SkeletonCircle, Text, useColorModeValue } from '@chakra-ui/react';
import Conversation from '../components/Conversation';
import { GiConversation } from "react-icons/gi";
import MessageContainer from '../components/MessageContainer';
import { useEffect, useState } from 'react';
import useShowToast from '../hooks/useShowToast';
import { useRecoilState, useRecoilValue } from 'recoil';
import { conversationsAtom, selectedConversationAtom } from "../atoms/conversationsAtom";
import userAtom from '../atoms/userAtom';

const ChatPage = () => {
  const showToast = useShowToast();
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [conversations, setConversations] = useRecoilState(conversationsAtom);
  const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom);
  const [searchText, setSearchText] = useState("");
  const [searchingUser, setSearchingUser] = useState(false);
  const currentUser = useRecoilValue(userAtom);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await fetch("/api/messages/conversations");
        const data = await res.json();

        if(data.error){
          showToast("Error", data.error, "error");
          return;
        };

        setConversations(data);

      } catch (error) {
        showToast("Error", error, "error");
      } finally {
        setLoadingConversations(false);
      }
    };

    getConversations();

  },[showToast, setConversations]);

  const handleSearchConversation = async(e) => {
    e.preventDefault();
    setSearchingUser(true);

    try {
      const res = await fetch(`/api/users/profile/${searchText}`);
      const data = await res.json();

      if(data.error){
        showToast("Error", data.error, "error");
        return;
      };

      if(data._id === currentUser._id){
        showToast("Error", "You cannot message yourself.", "error");
        return;
      };

      if(conversations.find(conversation => conversation.participants[0]._id === data._id)){
        setSelectedConversation({
          _id: conversations.find(conversation => conversation.participants[0]._id === data._id)._id,
          userId: data._id,
          username: data.username,
          userProfilePic: data.profilePic,
        });
        return;
      };

      const mockConversation = {
        mock:true,
        lastMessage: {
          text: "",
          sender: "",
        },
        _id: Date.now(),
        participants: [{
          _id: data._id,
          username: data.username,
          userProfilePic: data.profilePic,
        }],
      };

      setConversations((prevConversations) => [...prevConversations, mockConversation]);

    } catch (error) {
      showToast("Error", error, "error");
    } finally{
      setSearchingUser(false);
    }
  };

  return (
    <Box position={"absolute"} w={{
      base:"100%",
      md:"80%",
      lg:"750px",
    }} left={"50%"} transform={"translateX(-50%)"} p={"4"}>
      <Flex gap={"4"} flexDirection={{
        base:"column",
        md:"row",
      }} maxW={{
        sm:"400px",
        md:"100%",
      }} mx={"auto"}>

        <Flex flex={"30"} gap={"2"} flexDirection={"column"} maxW={{
          sm:"250px",
          md:"100%",
        }} mx={"auto"}>
          <Text fontWeight={"700"} color={useColorModeValue("gray.600","gray.400")}>Your Conversations</Text>
          <form onSubmit={handleSearchConversation}>
            <Flex alignItems={"center"} gap={"2"}>
              <Input placeholder='Search for user...' onChange={(e) => setSearchText(e.target.value)}/>
              <Button size={"sm"} onClick={handleSearchConversation} isLoading={searchingUser}>
                <SearchIcon/>
              </Button>
            </Flex>
          </form>

          {loadingConversations && (
            [0,1,2,3,4].map((_,i) => (
              <Flex key={i} gap={"4"} alignItems={"center"} p={"1"} borderRadius={"md"}>
                <Box>
                  <SkeletonCircle size={"10"}/>
                </Box>
                <Flex w={"full"} flexDirection={"column"} gap={"3"}>
                  <Skeleton h={"10px"} w={"80px"}/>
                  <Skeleton h={"8px"} w={"90%"}/>
                </Flex>
              </Flex>
            ))
          )}

          {!loadingConversations && (
            conversations.map(conversation => (
              <Conversation key={conversation._id} conversation={conversation}/>
            ))
          )}
        </Flex>

        {!selectedConversation._id && (
          <Flex flex={"70"} 
          borderRadius={"md"} 
          p={"2"} 
          flexDirection={"column"} 
          alignItems={"center"} 
          justifyContent={"center"} 
          height={"400px"}>
            <GiConversation size={"100"}/>
            <Text fontSize={"20"}> Select a conversation.</Text>
          </Flex>
        )}

        {selectedConversation._id && <MessageContainer/>}

      </Flex>
    </Box>
  )
}

export default ChatPage