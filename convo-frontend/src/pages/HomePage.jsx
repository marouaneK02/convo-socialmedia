import { Flex, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import useShowToast from '../hooks/useShowToast';
import Post from '../components/Post';
import { useRecoilState } from 'recoil';
import postsAtom from '../atoms/postsAtom';

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
    <>
      {!loading && posts.length === 0 && (
        <h1>Follow someone to start your feed!</h1>
      )}

      {loading && (
        <Flex justify={"center"}>
          <Spinner size={"xl"}/>
        </Flex>
      )}

      {posts.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy}/>
      ))}
    </>
  );
};

export default HomePage