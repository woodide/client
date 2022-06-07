import axios from "axios";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import Panel from "../../component/Panel";
import useForm from "../../hook/useForm";
import {FetchPostWithoutAuth} from "../../model/Request";
import {Box, Flex, FormControl, FormLabel, Input, Button, Stack, useColorModeValue} from "@chakra-ui/react";

function RegisterPage({professor}) {
    const navigate = useNavigate();
    const {value, handleChange} = useForm({
        email: "",
        password: "",
        username: "",
        studentNumber: "",
    });

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await FetchPostWithoutAuth(
                professor ? "/signup/professor" : "/signup/student",
                value
            );
            if (response.status === 200 && response.data?.status === "SUCCESS") {
                navigate(professor ? "/professor/login" : "/login");
                return;
            } else {
                toast.error("회원가입 실패");
            }
        } catch (e) {
            toast.error("회원가입 실패");
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
                    <Stack as="form" onSubmit={handleRegister} spacing={4}>
                        <FormControl>
                            <FormLabel>이메일</FormLabel>
                            <Input type="email" name="email" value={value.email} onChange={handleChange}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>비밀번호</FormLabel>
                            <Input type="password" name="password" value={value.password} onChange={handleChange}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>이름</FormLabel>
                            <Input type="text" name="username" value={value.username} onChange={handleChange}/>
                        </FormControl>
                        {!professor && <FormControl>
                            <FormLabel>학번</FormLabel>
                            <Input type="text" name="studentNumber" value={value.studentNumber}
                                   onChange={handleChange}/>
                        </FormControl>}
                        <Stack spacing={3}>
                            <Stack
                                direction={{base: 'column', sm: 'row'}}
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
                                회원가입
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
    //
    // return (
    //   <Panel>
    //     <div style={{ width: "360px" }}>
    //       <form onSubmit={handleRegister}>
    //         <Form.Label>이메일</Form.Label>
    //         <Form.Control
    //           value={value.email}
    //           type="text"
    //           name="email"
    //           onChange={handleChange}
    //         />
    //         <Form.Label style={{ marginTop: "10px" }}>비밀번호</Form.Label>
    //         <Form.Control
    //           value={value.password}
    //           type="password"
    //           name="password"
    //           onChange={handleChange}
    //         />
    //         <Form.Label style={{ marginTop: "10px" }}>이름</Form.Label>
    //         <Form.Control
    //           value={value.username}
    //           type="text"
    //           name="username"
    //           onChange={handleChange}
    //         />
    //         {!professor && (
    //           <>
    //             <Form.Label style={{ marginTop: "10px" }}>학번</Form.Label>
    //             <Form.Control
    //               value={value.studentName}
    //               type="text"
    //               name="studentNumber"
    //               onChange={handleChange}
    //             />
    //           </>
    //         )}
    //         <Button
    //           as="input"
    //           type="submit"
    //           style={{ width: "100%", marginTop: "20px" }}
    //           value="회원가입"
    //         />
    //       </form>
    //     </div>
    //   </Panel>
    // );
}

export default RegisterPage;
