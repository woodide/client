import React, {useState,useEffect} from "react";
import {Link, useHistory, useNavigate, useParams} from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import {Box, Flex, Stack, Text, Button, useColorModeValue} from "@chakra-ui/react";
import {useMutation, useQuery} from "react-query";
import {FetchPost} from "../../model/Request";
import queryClient from "../../queries";
import {toast} from "react-toastify";

function ReportPage() {
    const {imageName} = useParams();
    const navigate = useNavigate();
    const [report, setReport] = useState();

    const {
        mutate,
        data: container,
        isLoading,
        isSuccess
    } = useMutation((imageName) => FetchPost({
        isProfessor: false,
        url: "/container",
        data: {
            imageName,
        },
    }));

    useQuery(["student", "report", container?.data?.containerName], {
        onSuccess: (data) => {
            setReport(data?.content);
        }
    });
    useEffect(() => {
        mutate(imageName);
    }, [imageName]);

    const handleSave = async (containerName) => {
        const response = await FetchPost({
            isProfessor: false,
            url: "/student/subject/assignment/report",
            data: {
                containerName,
                content: report,
            }
        });
        console.log(response);
        if(response.status === 200) {
            toast("보고서 저장 완료");
        }
    }


    if (isLoading || !isSuccess) {
        return <div>Loading ...</div>
    }
    const {containerName, assignmentName} = container.data;
    return <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'} p={5}>
        <Stack width={1000}>
            <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}

            >
                <Text textAlign={"center"} marginBottom={5}>{assignmentName} 보고서</Text>
                <Stack data-color-mode="light">
                    <MDEditor
                        value={report}
                        onChange={setReport}
                        height={500}
                        color="#fff"
                    />
                </Stack>
                <div style={{float: "right", marginTop: "10px"}}>
                    <Button style={{width: "100px"}}  bg={'blue.400'}
                            color={'white'}
                            _hover={{
                                bg: 'blue.500',
                            }} onClick={() => handleSave(containerName)}>저장</Button>
                    <Button onClick={() => navigate(-1)} style={{width: "100px", marginLeft: "5px"}}>이전</Button>
                </div>
            </Box>
        </Stack>
    </Flex>

}

export default ReportPage;