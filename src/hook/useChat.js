import React, {useCallback, useEffect, useRef, useState} from "react";
import * as SockJS from "sockjs-client";
import {Client} from "@stomp/stompjs";
import {SERVER_URL} from "../config";

function useChat({isProfessor, roomId}) {
    const stompRef = useRef(null);
    const [chatList, setChatList] = useState([]);


    const send = useCallback(({from, text}) => {
        if (!stompRef.current.connected) {
            return;
        }
        stompRef.current.publish({
            destination: `/assignment/send/${roomId}`,
            body: JSON.stringify({from, text, isProfessor}),
        });

    }, [stompRef]);


    useEffect(() => {
        stompRef.current = new Client({
            webSocketFactory: () => new SockJS(`${SERVER_URL}/assignment/chat`), // proxy를 통한 접속
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                stompRef.current.subscribe(`/assignment/${roomId}`, ({body}) => {
                    setChatList((_chatMessages) => [..._chatMessages, JSON.parse(body)]);
                });
            },
            onStompError: (frame) => {
                console.error(frame);
            },
        });
        stompRef.current.activate();

        return () => {
            stompRef.current?.deactivate();
        }
    }, []);

    return {chatList, send};
}

export default useChat;