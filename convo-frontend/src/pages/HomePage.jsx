import { Flex, Spinner, Box, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import useShowToast from '../hooks/useShowToast';
import Post from '../components/Post';
import { useRecoilState } from 'recoil';
import postsAtom from '../atoms/postsAtom';
import SuggestedUsers from '../components/SuggestedUsers';
import { SlUserFollow } from "react-icons/sl";

const HomePage = () => {
  const showToast = useShowToast();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeedPosts = async() => {
      setPosts([]);
      try {
        const res = await fetch("/api/posts/feed");
        const data = await res.json();

        if(data.error){
          showToast("Error", data.error, "error");
          return;
        };

        setPosts(data);

      } catch (error) {
        showToast("Error", error, "error");
      } finally{
        setLoading(false);
      };
    };

    getFeedPosts();

  },[showToast, setPosts]);

  return (
		<Flex gap='10' alignItems={"flex-start"}>
			<Box flex={"70"}>
				{!loading && posts.length === 0 && (
          <Flex flex={"70"} 
          borderRadius={"md"} 
          p={"2"} 
          flexDirection={"column"} 
          alignItems={"center"} 
          justifyContent={"center"} 
          height={"400px"}
          gap={"6"}>
            <SlUserFollow size={"100"}/>
            <Text fontSize={"20"}> Follow someone to start your feed!</Text>
          </Flex>
        )}

				{loading && (
					<Flex justify='center'>
						<Spinner size='xl' />
					</Flex>
				)}

				{posts.map((post) => (
					<Post key={post._id} post={post} postedBy={post.postedBy} />
				))}
			</Box>
			<Box
				flex={"30"}
				display={{
					base: "none",
					md: "block",
				}}
			>
        <SuggestedUsers/>
			</Box>
		</Flex>
	);
};

export default HomePage