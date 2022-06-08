import React, {useState, useMemo} from "react";
import ModalButton from "./ModalButton";
import {useMutation, useQuery} from "react-query";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Text
} from "@chakra-ui/react";
import moment from "moment";
import {FetchPost} from "../model/Request";
import Modal from "./Modal";

export function SubmitModal({containerName, value, marginLeft}) {
    const [isOpen, setOpen] = useState(false);

    const {mutate, isLoading, data : result} = useMutation((containerName) => FetchPost({
        isProfessor: false,
        url: "/student/subject/assignment/submit",
        data: {
            containerName
        }
    }), {
        onSuccess: () => {
            setOpen(true);
        }
    });

    return (
        <>
            <Button bg={'blue.400'}
                    color={'white'}
                    _hover={{
                        bg: 'blue.500',
                    }} isLoading={isLoading} marginLeft={marginLeft} onClick={() =>
                mutate(containerName)
            }>
                {value}
            </Button>
            <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
                <div style={{width: "50vw"}}>
                    <Text  fontSize={"1.5rem"} fontWeight={"bold"} color={result?.data?.score == 100 ? "MediumSeaGreen" : "crimson"}>
                        {result?.data?.score == 100 ? "Success" : "Fail"}
                    </Text>
                    <Text fontSize={"1.25rem"} fontWeight={"bold"}>점수 : ({result?.data?.score} / 100)</Text>

                    <br/>
                    <Text fontSize={"1.25rem"}>출력 결과</Text>
                    <pre className={"bg-gray-300 rounded p-1"}>{result?.data?.executionResult ? result?.data?.executionResult : "출력결과 없음"}</pre>
                </div>
            </Modal>
        </>
    );
}


function SubmitListModal({containerName, value}) {
    const {data} = useQuery(["student", "result", containerName]);

    const resultList = useMemo(() => data?.result?.map((res, idx) => <AccordionItem key={`submit-${idx}`}>
        <h2>
            <AccordionButton>
                <Box flex='1' textAlign='left' width={500}>
                    <div>
                        <Text as={"span"} width={200}>
                            {idx + 1}번째 제출내역 ({res.score} / 100)
                        </Text>
                        <Text as={"span"} marginLeft={3} color={res.score == 100 ? "MediumSeaGreen" : "crimson"}>
                            {res.score == 100 ? "Success" : "Fail"}
                        </Text>
                    </div>
                </Box>
                <AccordionIcon/>
            </AccordionButton>
        </h2>
        <AccordionPanel pb={4} >
            <Text fontSize={"0.8rem"} color={"#939393"}>제출일자
                : {moment(new Date(res.submitTime)).format("yyyy-MM-DD HH:mm:ss")}</Text>
            <Text fontSize={"1.25rem"}>점수 : ({res.score} / 100)</Text>
            <br/>
            <Text fontSize={"1.25rem"}>출력 결과</Text>
            <pre className={"bg-gray-300 rounded p-1"}>{res.executionResult ? res.executionResult : "출력결과 없음"}</pre>
        </AccordionPanel>
    </AccordionItem>).reverse() ?? [], [data]);


    return (
        <ModalButton bg={'blue.400'}
                     color={'white'}
                     _hover={{
                         bg: 'blue.500',
                     }} value={value}>
            {!containerName && <div>과제를 시작해주세요.</div>}
            {containerName && (
                <div style={{height: "80%"}}>
                    <Accordion>
                        {resultList}
                    </Accordion>
                </div>
            )}
        </ModalButton>
    );
}

export default SubmitListModal;