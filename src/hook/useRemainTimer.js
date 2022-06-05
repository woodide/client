import {useEffect, useRef, useState} from "react";

function useRemainTimer(endDate, callback) {
    const [remain, setRemain] = useState({
        h: "00",
        m: "00",
        s: "00"
    });
    const timeRef = useRef(null);
    useEffect(() => {
        timeRef.current = setInterval(() => {
            const diffTime = Math.abs(endDate - new Date().getTime());

            const hour = Math.floor(Math.abs(diffTime / (1000 * 60 * 60)));
            const min = Math.floor(Math.abs(diffTime / (1000 * 60))) - hour * 60;
            const sec =
                Math.floor(Math.abs(diffTime / 1000)) - (hour * 3600 + min * 60);

            setRemain({
                h: `${hour >= 10 ? hour : "0" + hour}`,
                m: `${min >= 10 ? min : "0" + min}`,
                s: `${sec >= 10 ? sec : "0" + sec}`,
            });
            if (new Date() > new Date(endDate)) {
                callback();
                clearInterval(timeRef.current);
            }
        }, 1000);

        return () => {
            if (timeRef.current) {
                clearInterval(timeRef.current);
            }
        };
    }, []);
    return `${remain.h}:${remain.m}:${remain.s}`;
}

export default useRemainTimer;