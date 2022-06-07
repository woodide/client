import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import styled from "styled-components";
import Chatting from "../../component/Chatting";
import {useNavigate, useParams} from "react-router-dom";
import {HOST_URL} from "../../config";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {assignmentState, professorState, studentState} from "../../atom/user";
import {FetchPost, isContainerConnect} from "../../model/Request";
import {toast} from "react-toastify";
import {useMutation, useQuery} from "react-query";

const IDEFrame = styled.iframe`
  width: 100%;
  height: 100%;
`;

/**
 *
 * queryClient.setQueryDefaults(["container"], {
 *     queryFn: ({queryKey}) => {
 *         const imageName = queryKey[1];
 *         return FetchPost({
 *             isProfessor: false,
 *             url: "/container",
 *             data: {
 *                 imageName,
 *             },
 *         });
 *     },
 *     select: (response) => {
 *         return response?.data;
 *     },
 * });
 *
 * @returns {JSX.Element}
 * @constructor
 */
function IDEPage() {
    const {imageName} = useParams();
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
    }), {
        onSuccess: (response) => {
            const { assignmentName, dueDate, description} = response.data;
            setAssignment({
                assignmentName: assignmentName,
                dueDate: new Date(dueDate),
                description: description,
            });
        }
    });

    const setAssignment = useSetRecoilState(assignmentState);
    const student = useRecoilValue(studentState);
    const navigate = useNavigate();
    if (student === null) {
        navigate("/login");
    }

    useEffect(() => {
        mutate(imageName);
    }, [imageName]);
    console.log(isLoading, isSuccess,container);
    if (isLoading || !isSuccess) {
        return <div>Loading ...</div>
    }
    const {portNum, assignmentName, dueDate, description} = container.data;
    return <div style={{width: "100%"}}>
        <IDEFrame src={`${HOST_URL}:${portNum}/?folder=/config/workspace`} frameBorder={0}/>
        <Chatting imageName={imageName} title={assignmentName}/>
    </div>;
}

export default React.memo(IDEPage);
