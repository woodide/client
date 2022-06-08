import {useEffect, useRef, useState} from "react";

function useRemainTimer(endDate) {
    const [remain, setRemain] = useState({
        h: "00",
        m: "00",
        s: "00"
    });
    const [isDue,setDue] = useState(false);
    useEffect(() => {
        if(!endDate) return;
        const timer = setInterval(() => {
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
            if (new Date() >= new Date(endDate)) {
                setDue(true);
                console.log("END");
                setRemain({
                    h: "00",
                    m: "00",
                    s: "00"
                })
                clearInterval(timer);
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [endDate]);
    return {
        time: `${remain.h}:${remain.m}:${remain.s}`,
        isDue,
    };
}

export default useRemainTimer;