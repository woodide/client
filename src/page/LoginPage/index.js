import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Panel from "../../component/Panel";
import useForm from "../../hook/useForm";
import { FetchPost, FetchPostWithoutAuth } from "../../model/Request";
import {useRecoilState, useSetRecoilState} from "recoil";
import {studentState,professorState} from "../../atom/user";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

function LoginPage({ professor }) {
  const navigate = useNavigate();

  const { value, handleChange } = useForm({
    email: "",
    password: "",
  });

  const setStudent = useSetRecoilState(studentState);
  const setProfessor = useSetRecoilState(professorState);

  const handleLogin = async (e) => {
    e.preventDefault();
  console.log("ASDA");
    try {
      const response = await FetchPostWithoutAuth("/login", value);
      const _professor = professor ? true : false;
      if (response.status === 200 && _professor === response.data?.isProfessor) {
        // localStorage[_professor ? "professor" : "student"] = response.data.token;
        const {token,username,email,isProfessor} = response.data;
        localStorage[_professor ? "professor" : "student"] = JSON.stringify(response.data);
        if(_professor) {
          setProfessor({
            token, username, email, isProfessor
          });
        } else {
          if(_professor) {
            setStudent({
              token, username, email, isProfessor
            });
          }
        }
        if (!_professor) {
          navigate("/");
          return;
        } else {
          navigate("/professor");
          return;
        }
      } else {
        toast.error("로그인 실패");
      }
    } catch (e) {
      toast.error("로그인 실패");
    }
  };

  return (
      <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}>
        <Stack width={400} height={400} py={12} px={6}>
          <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}>
            <Stack as="form" onSubmit={handleLogin} spacing={4}>
              <FormControl  value={value.email} onChange={handleChange}>
                <FormLabel>이메일</FormLabel>
                <Input type="email" name="email"   />
              </FormControl>
              <FormControl  value={value.password}  onChange={handleChange}>
                <FormLabel>비밀번호</FormLabel>
                <Input type="password"  name="password"/>
              </FormControl>
              <Stack spacing={3}>
                <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}>
                </Stack>
                <Button
                    bg={'blue.400'}
                    type='submit'
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}>
                  로그인
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
  );
}

export default LoginPage;
