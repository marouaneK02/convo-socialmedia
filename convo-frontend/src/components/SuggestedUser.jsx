import { Avatar, Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useFollowUnfollow from "../hooks/useFollowUnfollow.js";

const SuggestedUser = ({ user }) => {
	const { handleFollowUnfollow, following, updating } = useFollowUnfollow(user);

	return (
		<Flex my={"1"} gap={"2"} justifyContent={"space-between"} alignItems={"center"}>
			
			<Flex gap={"2"} as={Link} to={`${user.username}`}>
				<Avatar src={user.profilePic} name={user.username} />
				<Box>
					<Flex alignItems={"center"} gap={"1"}>
						<Text fontSize={"sm"} fontWeight={"bold"}>
							{user.username}
						</Text>
						{user.isVerified && (
                        	<Image src='/verified.png' fill={"white"} w={"4"} h={"4"}/>
                    	)}
					</Flex>
					<Text color={"gray.light"} fontSize={"sm"}>
						{user.name}
					</Text>
				</Box>
			</Flex>
			
			<Button
				size={"sm"}
				color={following ? "black" : "white"}
				bg={following ? "white" : "blue.400"}
				onClick={handleFollowUnfollow}
				isLoading={updating}
				_hover={{
					color: following ? "black" : "white",
					opacity: ".8",
				}}
			>
				{following ? "Unfollow" : "Follow"}
			</Button>
		</Flex>
	);
};

export default SuggestedUser;