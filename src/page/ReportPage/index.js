import React, {useState} from "react";
import {Link, useHistory, useNavigate, useParams} from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import {Box, Flex, Stack, Text,Button, useColorModeValue} from "@chakra-ui/react";

function ReportPage() {
    const {id} = useParams();
    const [report, setReport] = useState();
    const navigate = useNavigate();

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
                <Text textAlign={"center"} marginBottom={5}>MIPS Simulator 보고서</Text>
                <Stack data-color-mode="light">
                    <MDEditor
                        value={report}
                        onChange={setReport}
                        height={500}
                        color="#fff"
                    />
                </Stack>
                <div style={{float: "right", marginTop: "10px"}}>
                    <Button style={{width: "100px"}} colorScheme={"teal"}>저장</Button>
                    <Button onClick={() => navigate(-1)} style={{width: "100px", marginLeft: "5px"}}>이전</Button>
                </div>
            </Box>
        </Stack>
    </Flex>

}

export default ReportPage;