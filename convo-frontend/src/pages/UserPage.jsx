import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";


const UserPage = () => {
  const [user,setUser] = useState(null);
  const showToast = useShowToast();

  const { username } = useParams();

  useEffect(() => {
    const getUser = async() => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();

        if(data.error){
          showToast("Error", data.error, "error");
          return;
        };

        setUser(data);

      } catch (error) {
        showToast("Error", error, "error");
      }
    };

    getUser();

  },[username, showToast]);

  if(!user){
    return null;
  };

  return (
    <>
      <UserHeader user={user}/>
      <UserPost/>
    </>
  )
}

export default UserPage