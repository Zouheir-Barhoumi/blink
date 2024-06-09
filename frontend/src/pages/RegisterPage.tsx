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
    <>
      <Flex align="center" justify="center" h="100vh" mt={-8}>
        <Box>
          <Heading mb={8}>Register</Heading>
          <form onSubmit={handleSubmit}>
            <FormControl id="username" mb={4} isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </FormControl>
            <FormControl id="email" mb={4} isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormControl>
            <FormControl id="password" mb={4} isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </FormControl>
            <Button type="submit" bgColor="primary" mb={4}>
              Register
            </Button>
            <Text color="secondary" mb={4}>
              Already have an account?{" "}
              <Link to="/login" color="secondary">
                <Text color="greenV">Login</Text>
              </Link>
            </Text>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default RegisterForm;
