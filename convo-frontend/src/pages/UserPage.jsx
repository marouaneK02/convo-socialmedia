import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import Post from "../components/Post";
import postsAtom from "../atoms/postsAtom";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useRecoilState } from "recoil";
import { TfiFaceSad } from "react-icons/tfi";

const UserPage = () => {
  const { user, loading } = useGetUserProfile();
  const showToast = useShowToast();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [fetchingPosts, setFetchingPosts] = useState(true);

  const { username } = useParams();

  useEffect(() => {
    const getPosts = async() => {
      if(!user){
        return;
      };

      setFetchingPosts(true);

      try {
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json();

        setPosts(data);

      } catch (error) {
        showToast("Error", error, "error");
        setPosts([]);
      } finally{
        setFetchingPosts(false);
      };
    };

    getPosts();

  },[username, showToast, setPosts, user]);

  if(!user && loading){
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"}/>
      </Flex>
    )
  };

  if(!user && !loading){
    return (
      <Flex flex={"70"} 
      borderRadius={"md"} 
      p={"2"} 
      flexDirection={"column"} 
      alignItems={"center"} 
      justifyContent={"center"} 
      height={"400px"}
      gap={"6"}>
        <TfiFaceSad size={"100"}/>
        <Text fontSize={"20"}> User not found.</Text>
      </Flex>
  );
  };

  return (
    <>
      <UserHeader user={user}/>

      {!fetchingPosts && posts.length === 0 && (
        <Flex flex={"70"} 
        borderRadius={"md"} 
        p={"2"} 
        flexDirection={"column"} 
        alignItems={"center"} 
        justifyContent={"center"} 
        height={"400px"}
        gap={"6"}>
          <TfiFaceSad size={"100"}/>
          <Text fontSize={"20"}> User has not posted yet.</Text>
        </Flex>
      )}
      {fetchingPosts && (
        <Flex justifyContent={"center"} my={"12"}>
          <Spinner size={"xl"}/>
        </Flex>
      )}
      {posts.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy}/>
      ))}
    </>
  )
}

export default UserPage