import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
  HStack,
  Box,
} from '@chakra-ui/react'
import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import usePreviewImg from '../hooks/usePreviewImg';
import useShowToast from '../hooks/useShowToast';

export default function UpdateProfilePage() {
    const [user, setUser] = useRecoilState(userAtom);
    const showToast = useShowToast();
    const [updating, setUpdating] = useState(false);
    const [inputs, setInputs] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        bio: user.bio,
        password:"",
    });

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
            <Flex
            align={'center'}
            justify={'center'}
            my={"20"}
            py={"20"}>
            <Stack
                spacing={"4"}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.dark')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}>
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                User Profile Edit
                </Heading>
                <FormControl>
                <Stack direction={['column', 'row']} spacing={"6"}>
                    <Center>
                        <Avatar size="xl" boxShadow={"md"} src={imgUrl || user.profilePic}/>
                    </Center>
                    <Center w="full">
                        <Button w="full" onClick={() => fileRef.current.click()}>Change Icon</Button>
                        <Input type="file" hidden ref={fileRef} onChange={handleImgChange}/>
                    </Center>
                </Stack>
                </FormControl>

                <HStack>
                    <Box>
                        <FormControl>
                            <FormLabel>First name</FormLabel>
                            <Input
                                placeholder="John"
                                _placeholder={{ color: 'gray.500' }}
                                type="text"
                                value={inputs.firstName} 
                                onChange={(e) => setInputs((inputs) => ({ ...inputs, firstName: e.target.value}))}
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl>
                            <FormLabel>Last name</FormLabel>
                            <Input
                                placeholder="Smith"
                                _placeholder={{ color: 'gray.500' }}
                                type="text"
                                value={inputs.lastName} 
                                onChange={(e) => setInputs((inputs) => ({ ...inputs, lastName: e.target.value}))}
                            />
                        </FormControl>
                    </Box>
                </HStack>

                <FormControl>
                <FormLabel>Bio</FormLabel>
                <Input
                    placeholder="Biography"
                    _placeholder={{ color: 'gray.500' }}
                    type="text"
                    value={inputs.bio} 
                    onChange={(e) => setInputs((inputs) => ({ ...inputs, bio: e.target.value}))}
                />
                </FormControl>

                <Stack spacing={6} direction={['column', 'row']}>
                <Button
                    bg={'red.400'}
                    color={'white'}
                    w="full"
                    _hover={{
                    bg: 'red.500',
                    }}>
                    Cancel
                </Button>
                <Button
                    bg={'green.400'}
                    color={'white'}
                    w="full"
                    _hover={{
                    bg: 'green.600',
                    }}
                    isLoading={updating}
                    type='submit'>
                    Submit
                </Button>
                </Stack>
            </Stack>
            </Flex>
        </form>
    )
}