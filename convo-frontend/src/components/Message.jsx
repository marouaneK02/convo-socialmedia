import { Avatar, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Message = ({ ownMessage }) => {
  return (
    <>
      {ownMessage ? (
        <Flex gap={"2"} alignSelf={"flex-end"}>
          <Text maxW={"350px"} bg={"blue.400"} p={"1"} borderRadius={"md"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore officiis maiores facilis cumque eos repellendus est praesentium tenetur dolores minus nihil, obcaecati ullam repudiandae atque? Tenetur dolor suscipit repellat officia ducimus. Aliquid tenetur repudiandae sit similique nisi odit perferendis, praesentium, modi iure pariatur quo? Non sequi nostrum eaque quos harum.
          </Text>
          <Avatar src={""} w={"7"} h={"7"}/>
        </Flex>
      ) : (
        <Flex gap={"2"}>
          <Avatar src={""} w={"7"} h={"7"}/>
          <Text maxW={"350px"} bg={"gray.400"} p={"1"} borderRadius={"md"} color={"black"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore officiis maiores facilis cumque eos repellendus est praesentium tenetur dolores minus nihil, obcaecati ullam repudiandae atque? Tenetur dolor suscipit repellat officia ducimus. Aliquid tenetur repudiandae sit similique nisi odit perferendis, praesentium, modi iure pariatur quo? Non sequi nostrum eaque quos harum.
          </Text>
        </Flex>
      )}
    </>
  )
}

export default Message