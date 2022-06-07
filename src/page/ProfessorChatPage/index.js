import React, {useMemo} from "react";
import {useQuery} from "react-query";
import {SideBar, Main} from "../../component/SideBar";
import {Route, Routes, useParams} from "react-router-dom";
import {ChattingMain} from "../../component/Chatting";
import {GrFormPreviousLink, GrPrevious} from "react-icons/gr";
import {
    Flex,
    Tab,
    Tabs,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
    TabList,
    TabPanel,
    TabPanels, Text
} from "@chakra-ui/react";

function Chat({assignmentName, imageName}) {
    return <div style={{boxShadow: "rgb(0 0 0 / 30%) 0px 12px 60px 5px", borderRadius: "15px", height: "100%"}}>
        <ChattingMain professor title={assignmentName} imageName={imageName}/>
    </div>
}


function ProfessorChatPage() {
    const {code} = useParams();
    const {data: assignmentList, isLoading} = useQuery(["professor", "subject", "assignment", code]);


    const tabList = useMemo(() => assignmentList?.map(({assignmentName}, idx) => <Tab
        key={`tab-${idx}`}>{assignmentName} 채팅방</Tab>)  ?? [],[assignmentList]);
    const tabPanelList = useMemo(() => assignmentList?.map(({assignmentName, imageName}, idx) => <TabPanel
        key={`tab-${idx}`} height={"100%"}><Chat assignmentName={assignmentName} imageName={imageName}/></TabPanel>) ?? [],[assignmentList]);

    if (isLoading) {
        return <div>Loading ...</div>
    }
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}>
            <Stack width={1200} height={800} py={12} px={6}>
                {tabList.length === 0 ? <Text textAlign={"center"}>출제된 과제가 없습니다.</Text> : <Tabs height={"100%"}>
                    <TabList>
                        {tabList}
                    </TabList>
                    <TabPanels height={"100%"}>
                        {tabPanelList}
                    </TabPanels>
                </Tabs>}

            </Stack>
        </Flex>
    );
}

export default ProfessorChatPage;