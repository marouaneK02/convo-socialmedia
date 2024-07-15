import { Avatar, Box, Button, Divider, Flex, Spinner, Image, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions";
import Comment from "../components/Comment";
import useGetUserProfile from "../hooks/useGetUserProfile";
import useShowToast from "../hooks/useShowToast";
import postsAtom from "../atoms/postsAtom";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { formatDistanceToNow } from "date-fns";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

const PostPage = () => {
  const { user, loading } = useGetUserProfile();
  const showToast = useShowToast();
  const [post, setPost] = useState(null);
  const [fetchingPost, setFetchingPost] = useState(true);
  const { pid } = useParams();
  const { currentUser } = useRecoilValue(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async() => {
      setFetchingPost(true);
      try {
        const res = await fetch(`/api/posts/${pid}`);
        const data = await res.json();

        setPost(data);

      } catch (error) {
        useShowToast("Error", error, "error");
        setPost([]);
      } finally{
        setFetchingPost(false);
      };
    };

    getPost();

  },[pid, showToast]);

  const handleDeletePost = async() => {
    try {
        if(!window.confirm("Are you sure you want to delete this post?")){
            return;
        };

        const res = await fetch(`/api/posts/${post._id}`,{
            method: "DELETE",
        });

        const data = await res.json();

        if(data.error){
            showToast("Error", data.error, "error");
            return;
        };

        showToast("Success", "Post deleted.", "success");
        navigate(`/${user.username}`);

    } catch (error) {
        showToast("Error", error, "error");
    }
};

  if(!user && loading){
    return(
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"}/>
      </Flex>
    );
  };

  if(!post){
    return null;
  };

  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src={user.profilePic} size={"md"} name={user.firstName}/>
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>{user.username}</Text>
            <Image src="/stockIMG.jpg" w={4} h={4} ml={4}/>
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"} >
          <Text fontSize={"sm"} width={"36"} textAlign={"right"} color={"gray.light"}>
            {formatDistanceToNow(new Date(post.createdAt))} ago
          </Text>
          
          {currentUser?._id === user._id && (
            <DeleteIcon size={"20"} cursor={"pointer"} onClick={handleDeletePost}/>
          )}
        </Flex>
      </Flex>

      <Text my={3}>{post.text}</Text>

      {post.img && (
        <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
          <Image src={post.img} w={"full"}/>
        </Box>
      )}

      <Flex gap={3} my={3}>
        <Actions post={post}/>
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
      {post.replies.map(reply => (
        <Comment key={reply._id} reply={reply} lastReply={reply._id === post.replies[post.replies.length - 1]._id}/>
      ))}
    </>
  )
};

export default PostPage