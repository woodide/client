import React, {useMemo} from "react";
import {useQuery} from "react-query";
import {SideBar, Main} from "../../component/SideBar";
import {Route, Routes, useParams} from "react-router-dom";
import {ChattingMain} from "../../component/Chatting";
import {GrFormPreviousLink, GrPrevious} from "react-icons/gr";
function Chat() {
    const {code} = useParams();
    const {data: assignmentList,isSuccess} = useQuery(["professor", "subject", "assignment", code]);

    console.log(assignmentList);
    if(!isSuccess) {
        return <div>Loading ...</div>
    }

    return <div style={{boxShadow:"rgb(0 0 0 / 30%) 0px 12px 60px 5px", borderRadius:"15px",height:"100%"}}>
        <ChattingMain professor title={assignmentList[0].assignmentName} imageName={assignmentList[0].imageName} appBarIcon={<GrFormPreviousLink onClick={() => console.log("ASD")} />}/>
    </div>
}


function ProfessorChatPage() {
    const {data: subjectList} = useQuery(["professor", "subject"]);

    const subjects = useMemo(() => subjectList?.map(({name, code}) => ({
        name,
        link: `/professor/chat/${code}`
    })) ?? [], [subjectList]);

    return (
        <div style={{width: "100%"}}>
            <SideBar
                title="진행중인 수업"
                subjects={subjects}
            />
            <Main>
                <Routes>
                    <Route path=":code" element={<Chat/>}/>
                </Routes>
            </Main>
        </div>
    );
}

export default ProfessorChatPage;