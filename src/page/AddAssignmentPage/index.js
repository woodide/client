import React, {useEffect, useMemo} from "react";
import {Form, Alert} from "react-bootstrap";
import MDEditor from "@uiw/react-md-editor";
import IconOption from "../../component/IconOption";
import {GCC_VERSION, PYTHON_VERSION} from "../../data/version";
import CheckBox from "../../component/CheckBox";
import DatePicker from "react-datepicker";
import {toast} from "react-toastify";
import {FetchPost} from "../../model/Request";
import {useQuery} from "react-query";
import moment from "moment";
import {
    Box,
    Flex,
    FormControl,
    Button,
    FormLabel,
    Input,
    Stack,
    useColorModeValue,
    Menu,
    MenuButton, MenuList, MenuItem
} from "@chakra-ui/react";
import {BsChatLeftDots} from "react-icons/bs";

function AddAssignmentPage() {
    const [assignmentName, setAssignmentName] = React.useState("");
    const [description, setDescription] = React.useState("# PA2: Simulator");
    const [language, setLanguage] = React.useState("gcc");
    const [languageVersion, setLanguageVersion] = React.useState("");
    const [subject, setSubject] = React.useState({
        code: "",
        name: ""
    });
    const [isReport, setReport] = React.useState(false);
    const [dueDate, setDueDate] = React.useState(new Date());
    const [isPending, setPending] = React.useState(false);

    const {data: subjectList} = useQuery(["professor", "subject"]);

    useEffect(() => {
        if(subjectList?.length ?? 0 > 0) {
            setSubject(subjectList[0]);
        }
    }, [subjectList]);


    const versionList = useMemo(() => {
        if (language === "gcc")
            return GCC_VERSION.map((ver, i) => (
                <MenuItem
                    key={`gcc_ver_${i}`}
                    onClick={() => setLanguageVersion(ver)}
                >
                    {ver}
                </MenuItem>
            ));
        if (language === "python")
            return PYTHON_VERSION.map((ver, i) => (
                <MenuItem
                    key={`python_ver_${i}`}
                    onClick={() => setLanguageVersion(ver)}
                >
                    {ver}
                </MenuItem>
            ));
    }, [language]);

    useEffect(() => {
        if (language === "gcc") setLanguageVersion(GCC_VERSION[0]);
        else if (language === "python") setLanguageVersion(PYTHON_VERSION[0]);
    }, [language]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const testInput = e.target.testInput?.files[0];
        const testOutput = e.target.testOutput?.files[0];
        const multipartFile = e.target.multipartFile?.files[0];

        if (assignmentName === "") {
            toast.error("과제 이름을 입력해주세요.");
            return;
        } else if (description === "") {
            toast.error("과제 설명을 입력해주세요.");
            return;
        } else if (!multipartFile) {
            toast.error("스켈레톤 코드를 업로드해주세요.");
            return;
        } else if (!testInput) {
            toast.error("테스트케이스 인풋을 업로드해주세요.");
            return;
        } else if (!testOutput) {
            toast.error("테스트케이스 아웃풋을 업로드해주세요.");
            return;
        }
        const formData = new FormData();
        formData.append("assignmentName", assignmentName);
        formData.append("description", description);
        formData.append("language", language);
        formData.append("languageVersion", languageVersion);
        formData.append("subjectCode", subject.code);
        formData.append("dueDate", moment(dueDate).format("yyyy-MM-DD HH:mm:ss"));
        formData.append("multipartFile", multipartFile);
        formData.append("testInput", testInput);
        formData.append("testOutput", testOutput);


        const fetch = async () => {
            const response = await FetchPost({
                isProfessor: true,
                url: "/professor/subject/addAssignment",
                data: formData,
                config: {
                    headers: {"Content-Type": "multipart/form-data"},
                },
            });
            if (response.status !== 200)
                throw "Error";
            return true;
        }

        toast.promise(fetch, {
            pending: "🐳 도커 이미지를 빌드중입니다. 약 5분정도 소요됩니다.",
            success: "🐳 도커 이미지 생성 완료 !",
            error: "🐳 도커 이미지 생성 실패",
        });
    };

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'} p={5}>
            <Stack width={1000}>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack as="form" onSubmit={handleSubmit} spacing={4}>
                        <FormLabel>과목 선택</FormLabel>
                        <FormControl>
                            <Menu>
                                <MenuButton as={Button}>
                                    {subject.name}
                                </MenuButton>
                                <MenuList >
                                    {subjectList?.map((v, i) => (
                                        <MenuItem key={`python_v123er_${i}`}
                                                       onClick={() => setSubject({...v})}>{v.name}</MenuItem>
                                    ))}
                                </MenuList>
                            </Menu>
                        </FormControl>
                        <FormControl>
                            <FormLabel>과제 이름</FormLabel>
                            <Input type="text" value={assignmentName}
                                   onChange={(e) => setAssignmentName(e.target.value)}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>과제 설명</FormLabel>
                            <div data-color-mode="light">
                                <MDEditor
                                    value={description}
                                    onChange={setDescription}
                                    color="#fff"
                                    height={400}
                                />
                            </div>
                        </FormControl>
                        <div
                            style={{display: "flex", justifyContent: "center"}}
                        >
                            <FormControl width={350}>
                                <FormLabel>언어 선택</FormLabel>
                                <div>
                                    <IconOption
                                        type={"gcc"}
                                        style={{marginRight: "10px"}}
                                        select={language === "gcc" ? true : false}
                                        onClick={() => setLanguage("gcc")}
                                    />
                                    <IconOption
                                        type={"python"}
                                        select={language === "python" ? true : false}
                                        onClick={() => setLanguage("python")}
                                    />
                                </div>
                            </FormControl>
                            <FormControl>
                                <FormLabel>버전 이미지 선택</FormLabel>
                                <Menu>
                                    <MenuButton as={Button}>
                                        {languageVersion}
                                    </MenuButton>
                                    <MenuList overflow={"auto"} maxHeight={300}>
                                        {versionList}
                                    </MenuList>
                                </Menu>
                            </FormControl>
                        </div>
                        <div>
                            <Alert key={"warning"} variant={"warning"}>
                                스켈레톤 코드는 ZIP 파일만 업로드 가능하며, 테스트케이스 코드는
                                텍스트 형식 파일만 업로드 가능합니다.
                            </Alert>
                            <FormControl className={"mb-3"}>
                                <FormLabel>스켈레톤 코드 업로드</FormLabel>
                                <Form.Control
                                    type="file"
                                    name={"multipartFile"}
                                    accept="zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
                                />
                            </FormControl>
                            <FormControl className={"mb-3"}>
                                <FormLabel>테스트케이스 인풋 업로드</FormLabel>
                                <Form.Control type="file"
                                              name={"testInput"}/>
                            </FormControl>
                            <FormControl className={"mb-3"}>
                                <FormLabel>테스트케이스 아웃풋 업로드</FormLabel>
                                <Form.Control type="file" name={"testOutput"}/>
                            </FormControl>
                        </div>
                        <div style={{marginBottom: "20px"}}>
                            <CheckBox
                                label={"보고서 제출 여부"}
                                checked={isReport}
                                onChecked={() => setReport(!isReport)}
                            />
                        </div>
                        <div style={{marginBottom: "20px"}}>
                            <FormLabel>과제 만기일 설정</FormLabel>
                            <DatePicker
                                customInput={<Input />}
                                dateFormat="yyyy-MM-dd HH:mm:ss"
                                selected={dueDate}
                                showTimeSelect
                                onChange={(date) => setDueDate(date)}
                            />
                        </div>
                        <Stack spacing={3}>
                            <Stack
                                direction={{base: 'column', sm: 'row'}}
                                align={'start'}
                                justify={'space-between'}>
                            </Stack>
                            <Button
                                type={"submit"}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                disabled={isPending}
                            >
                                과제 출제
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}

export default AddAssignmentPage;
