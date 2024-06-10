import React, { useState } from "react";
import { register } from "../services/authService";
import { Link } from "react-router-dom";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await register(username, email, password);

      console.log("response: ", response);
      alert("registration successful: " + JSON.stringify(response));
      window.location.href = "/login";
    } catch (error) {
      alert("registration failed: " + error);
      console.log("registration failed", error);
    }
  };
  return (
    <Flex align="center" justify="center" h="100vh">
      {/* <Box bg="black" opacity="100%" w="100vh" h="100vh"></Box> */}
      {/* BG */}
      <Box
        position="absolute"
        inset={0}
        backgroundImage="url('/src/assets/images/image17.png')"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        filter={"brightness(0.4)"}
      >
        <Box
          position="absolute"
          content=""
          bg="secondary.300"
          inset={0}
          opacity={0.4}
        ></Box>
      </Box>

      <Box
        position={"relative"}
        // boxShadow="0px 54px 55px rgba(65, 247, 151, 0.25) ,  0px -12px 30px rgba(65, 247, 151, 0.12),  0px 4px 6px rgba(65, 247, 151, 0.12),  0px 12px 13px rgba(65, 247, 151, 0.17),  0px -3px 5px rgba(65, 247, 151, 0.09)"
      >
        {/* Shadow Box 8 */}
        <Box
          position="absolute"
          top="-1"
          // left="-8px"
          w="calc(100%)"
          h="calc(100%)"
          clipPath="polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)"
          // background="rgba(65, 247, 151, 0.05)" // Semi-transparent green color
          zIndex={0}
        />
        {/* Shadow Box 7 */}
        <Box
          position="absolute"
          top="-2"
          // left="-8px"
          w="calc(100%)"
          h="calc(100%)"
          clipPath="polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)"
          // background="rgba(65, 247, 151, 0.10)" // Semi-transparent green color
          zIndex={0}
        />
        {/* Shadow Box 6 */}
        <Box
          position="absolute"
          top="-3px"
          // left="-4px"
          w="calc(100%)"
          h="calc(100%)"
          clipPath="polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)"
          backgroundColor="rgba(65, 247, 151, 0.15)" // Semi-transparent green color
          filter="blur(8px)"
          zIndex={0}
        />
        {/* Shadow Box 5 */}
        <Box
          position="absolute"
          top="-4px"
          // left="-4px"
          w="calc(100%)"
          h="calc(100%)"
          clipPath="polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)"
          backgroundColor="rgba(65, 247, 151, 0.20)" // Semi-transparent green color
          filter="blur(8px)"
          zIndex={0}
        />
        {/* Shadow Box 4 */}
        <Box
          position="absolute"
          top="-5px"
          // left="-4px"
          w="calc(100%)"
          h="calc(100%)"
          clipPath="polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)"
          backgroundColor="rgba(65, 247, 151, 0.25)" // Semi-transparent green color
          filter="blur(8px)"
          zIndex={0}
        />
        {/* Shadow Box 3 */}
        <Box
          position="absolute"
          top="-6px"
          // left="-4px"
          w="calc(100%)"
          h="calc(100%)"
          clipPath="polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)"
          backgroundColor="rgba(65, 247, 151, 0.30)" // Semi-transparent green color
          filter="blur(8px)"
          zIndex={0}
        />
        {/* Shadow Box 2 */}
        <Box
          position="absolute"
          top="-7px"
          // left="-4px"
          w="calc(100%)"
          h="calc(100%)"
          clipPath="polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)"
          backgroundColor="rgba(65, 247, 151, 0.35)" // Semi-transparent green color
          filter="blur(8px)"
          zIndex={0}
        />
        {/* Shadow Box 1 */}
        <Box
          position="absolute"
          top="-8px"
          // left="-8px"
          w="calc(100%)"
          h="calc(100%)"
          clipPath="polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)"
          backgroundColor="rgba(65, 247, 151, 0.4)" // Semi-transparent green color
          filter="blur(32px)"
          zIndex={0}
        />
        {/* Border Box */}
        <Box
          position="absolute"
          top="-2px"
          left="-2px"
          w="calc(100% + 4px) "
          h="calc(100% - 16px)"
          backgroundColor="#41F797"
          clipPath="polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)"
          zIndex={0}
        />
        {/* Main Form Box */}
        <Box
          position="relative"
          zIndex={1}
          w="400px"
          px="40px"
          bg="bgD"
          boxShadow="lg"
          clipPath="polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)"
          // border="2px solid #41F797"
        >
          <Heading pt="4">Register</Heading>
          <form onSubmit={handleSubmit} style={{ border: "none" }}>
            <FormControl id="username" mb={2} isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                h={"2rem"}
                color="black"
                bg={"whitesmoke"}
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                borderRadius="0"
              />
            </FormControl>
            <FormControl id="email" mb={2} isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                h={"2rem"}
                color="black"
                bg={"whitesmoke"}
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                borderRadius="0"
              />
            </FormControl>
            <FormControl id="password" mb={4} isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                h={"2rem"}
                color="black"
                bg={"whitesmoke"}
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                borderRadius="0"
              />
            </FormControl>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Text fontSize="sm">
                You have an account?{" "}
                <Link to="/login">
                  <Text color="secondary.200">Login</Text>
                </Link>
              </Text>
              <Button
                type="submit"
                color="white"
                bgColor="tertiary"
                alignSelf={"flex-end"}
              >
                Signup
              </Button>
            </Flex>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default RegisterForm;
