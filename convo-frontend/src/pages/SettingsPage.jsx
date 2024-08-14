import { Box, Button, Divider, Flex, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";
import useLogout from "../hooks/useLogout";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { useRef, useState } from "react";
import usePreviewImg from "../hooks/usePreviewImg";

export const SettingsPage = () => {
	const showToast = useShowToast();
	const [user, setUser] = useRecoilState(userAtom);
	const logout = useLogout();
	const [updating, setUpdating] = useState(false);
	const [inputs, setInputs] = useState({
		firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        bio: user.bio,
        password: "",
    });

	const freezeAccount = async () => {
		if (!window.confirm("Are you sure you want to freeze your account?")) return;

		try {
			const res = await fetch("/api/users/freeze", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();

			if (data.error) {
				return showToast("Error", data.error, "error");
			}
			if (data.success) {
				await logout();
				showToast("Success", "Your account has been frozen", "success");
			}
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	const fileRef = useRef(null);

    const { handleImgChange, imgUrl } = usePreviewImg();

	const handleSubmit = async(e) => {
        e.preventDefault();

        if(updating){
            return;
        };

        setUpdating(true);

        try {
            const res = await fetch(`/api/users/update/${user._id}`, {
                method: "PUT",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({...inputs, profilePic: imgUrl }),
            });

            const data = await res.json();

            if(data.error){
                showToast("Error", data.error, "error");
                return;
            };

            showToast("Success", "Profile updated.", "success");
            setUser(data);
            localStorage.setItem("user-convo", JSON.stringify(data));

        } catch (error) {
            showToast("Error", error, "error");
        } finally{
            setUpdating(false);
        };
    };

	return (
		<form onSubmit={handleSubmit}>
			<Flex direction={"column"}>
				<Text fontSize={"5xl"} fontWeight={"bold"}>Settings</Text>

				<Divider my={"5"}/>
				<Box>
					<Text my={"1"} fontSize={"lg"} fontWeight={"bold"}>
						Update Your Username
					</Text>
					<Text my={"1"} color={"gray.light"}>Please enter a display name you are comfortable with.</Text>
					<FormControl>
						<Input
							my={"2"}
							value={inputs.username}
							onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
							_placeholder={{ color: "gray.500" }}
							type='text'
						/>
					</FormControl>
					<Flex justifyContent={"flex-end"}>
						<Button 
						size={"sm"}
						my={"2"}
						bg={'white'}
						color={'black'}
						_hover={{
						bg: 'gray.300',
						}}
						isLoading={updating}
						type='submit'>
							Save
						</Button>
					</Flex>
				</Box>

				<Divider my={"5"}/>
				<Box>
					<Text my={"1"} fontSize={"lg"} fontWeight={"bold"}>
						Update Your Email Address
					</Text>
					<Text my={"1"} color={"gray.light"}>Enter the email addresses you want to use to log in with Convo.</Text>
					<FormControl>
						<Input
							my={"2"}
							value={inputs.email}
							onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
							_placeholder={{ color: "gray.500" }}
							type='email'
						/>
					</FormControl>
					<Flex justifyContent={"flex-end"}>
						<Button 
						size={"sm"}
						my={"2"}
						bg={'white'}
						color={'black'}
						_hover={{
						bg: 'gray.300',
						}}
						isLoading={updating}
						type='submit'>
							Save
						</Button>
					</Flex>
				</Box>

				<Divider my={"5"}/>
				<Box>
					<Text my={"1"} fontSize={"lg"} fontWeight={"bold"}>
						Update Your Password
					</Text>
					<Text my={"1"} color={"gray.light"}>Strengthen your account by ensuring your password is strong. Minimum number of characters is 6.</Text>
					<FormControl>
						<Input
							my={"2"}
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
							_placeholder={{ color: "gray.500" }}
							type='password'
						/>
					</FormControl>
					<Flex justifyContent={"flex-end"}>
						<Button 
						size={"sm"}
						my={"2"}
						bg={'white'}
						color={'black'}
						_hover={{
						bg: 'gray.300',
						}}
						isLoading={updating}
						type='submit'>
							Save
						</Button>
					</Flex>
				</Box>
				
				<Divider my={"5"}/>
				<Box mb={"10"}>
					<Text my={"1"} fontSize={"lg"} fontWeight={"bold"}>
						Freeze Your Account
					</Text>
					<Text my={"1"} color={"gray.light"}>You can unfreeze your account anytime by logging in.</Text>
					<Flex justifyContent={"flex-end"}>
						<Button size={"sm"} colorScheme='red' my={"2"} onClick={freezeAccount}>
							Freeze
						</Button>
					</Flex>
				</Box>
			</Flex>
		</form>
	);
};