import React, { useState, useMemo, useEffect } from "react";
import Panel from "../../component/Panel";
import useForm from "../../hook/useForm";
import StudentTable, { makeTableItem } from "../../widget/StudentTable";
import axios from "axios";
import { FetchGet, FetchPost } from "../../model/Request";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {Box, Flex, FormControl, Button, FormLabel, Input, Stack, useColorModeValue} from "@chakra-ui/react";
function CreateSubjectPage() {
  const { value, handleChange } = useForm({ name: "", code: "" });
  const [addList, setAddList] = useState({});
  const navigate = useNavigate();

  const handleCreateSubject = async (e) => {
    e.preventDefault();
    const response = await FetchPost({
      isProfessor: true,
      url: "/professor/subject",
      data: value,
    });
    if (response.status === 200) {
      if(Object.keys(addList).length > 0) {
        await FetchPost({
          isProfessor:true,
          url:"/professor/subject/addStudent",
          data: {
            subjectCode: value.code,
            studentNumberList: Object.keys(addList),
          }
        });
      }
      toast(`${value.name} 과목 생성 완료`);
      navigate("/professor");
    } else {
      toast.error(`${value.name} 과목 생성 실패`);
    }
  };

  return (
      <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}>
        <Stack width={1000} >
          <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}>
            <Stack as="form" onSubmit={handleCreateSubject} spacing={4}>
              <FormControl  value={value.name} onChange={handleChange}>
                <FormLabel>과목 이름</FormLabel>
                <Input type="text" name="name"   />
              </FormControl>
              <FormControl  value={value.code} onChange={handleChange}>
                <FormLabel>과목 코드</FormLabel>
                <Input type="text" name="code"   />
              </FormControl>
                <FormLabel>학생 리스트</FormLabel>

              <StudentTable addList={addList} setAddList={setAddList} />
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
                  과목 생성
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
  );
}

export default CreateSubjectPage;
