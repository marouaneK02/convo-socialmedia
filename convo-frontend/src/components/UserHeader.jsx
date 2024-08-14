import { Avatar, Box, Button, Flex, Image, Link, Menu, MenuButton, MenuItem, MenuList, Portal, Text, VStack, useToast } from "@chakra-ui/react";
import { CgMoreO } from "react-icons/cg";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { Link as RouterLink } from "react-router-dom";
import useFollowUnfollow from "../hooks/useFollowUnfollow";

const UserHeader = ({ user }) => {
    const toast = useToast();
    const currentUser = useRecoilValue(userAtom);
    const { handleFollowUnfollow, following, updating } = useFollowUnfollow(user);

    const copyURL = () => {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL).then(() => {
            toast({ 
                description: "Profile Link copied to clipboard.",
                status: "success",
                duration: 3000,
                isClosable: true})
        });
    };

  return (
    <VStack gap={"4"} alignItems={"start"}>
        <Flex justifyContent={"space-between"} w={"full"}>
            <Box>
                <Flex alignItems={"center"} gap={"2"}>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>{user.firstName} {user.lastName}</Text>
                    {user.isVerified && (
                        <Image src='/verified.png' w={"5"} h={"5"}/>
                    )}
                </Flex>
                <Flex alignItems={"center"} mt={"1"}>
                    <Text fontSize={"sm"} bg={"gray.dark"} px={"2"} py={"1"} borderRadius={"full"}>{user.username}</Text>
                </Flex>
            </Box>
            <Box>
                {user.profilePic && (
                    <Avatar name={user.username} src={user.profilePic} size={{
                        base: 'lg',
                        md: 'xl',
                    }}/>
                )}
                {!user.profilePic && (
                    <Avatar name={user.username} size={{
                        base: 'lg',
                        md: 'xl',
                    }}/>
                )}
            </Box>
        </Flex>

        <Text>{user.bio}</Text>

        {currentUser?._id === user._id && (
            <Link as={RouterLink} to='/update'>
                <Button size={"sm"}>Update Profile</Button>
            </Link>
        )}
        {currentUser?._id !== user._id && (
            <Button size={"sm"} onClick={handleFollowUnfollow} isLoading={updating}>{following ? "Unfollow" : "Follow"}</Button>
        )}
        <Flex w={"full"} justifyContent={"space-between"}>
            <Flex gap={2} alignItems={"center"}>
                <Text color={"gray.light"}>{user.followers.length} followers</Text>
            </Flex>
            <Flex>
                <Box className="icon-container">
                    <Menu>
                        <MenuButton>
                            <CgMoreO size={24} cursor={"pointer"}/>
                        </MenuButton>
                        <Portal>
                            <MenuList bg={"gray.dark"}>
                                <MenuItem bg={"gray.dark"} onClick={copyURL}>Copy Link</MenuItem>
                            </MenuList>
                        </Portal>
                    </Menu>
                </Box>
            </Flex>
        </Flex>

        <Flex w={"full"} flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb={3} cursor={"pointer"}>
            <Text fontSize={"19"} fontWeight={"bold"}>Posts</Text>
        </Flex>
    </VStack>
  )
}

export default UserHeader