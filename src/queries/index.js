import {QueryClient} from "react-query";
import {FetchGet, FetchPost} from "../model/Request";

const queryClient = new QueryClient();

queryClient.setQueryDefaults(["professor", "all_student"], {
    queryFn: () =>
        FetchGet({
            isProfessor: true,
            url: "/list/student",
        }),
    select: (response) => {
        return (
            response?.data.map(({email, username, studentNumber}) => ({
                email,
                username,
                studentNumber,
            })) ?? []
        );
    },
});

queryClient.setQueryDefaults(["professor", "subject", "student"], {
    queryFn: ({queryKey}) => {
        const code = queryKey[3];
        return FetchGet({
            isProfessor: true,
            url: "/professor/subject/student",
            config: {
                params: {
                    code,
                },
            },
        });
    },
    select: (response) => {
        return response?.data;
    },
});


queryClient.setQueryDefaults(["professor", "subject", "assignment"], {
    queryFn: ({queryKey}) => {
        const code = queryKey[3];
        return FetchGet({
            isProfessor: true,
            url: "/professor/subject/assignment",
            config: {
                params: {
                    code,
                },
            },
        });
    },
    select: (response) => {
        return response?.data;
    },
});

queryClient.setQueryDefaults(["professor", "subject"], {
    queryFn: () =>
        FetchGet({
            isProfessor: true,
            url: "/professor/subject",
        }),
    select: (response) => {
        return response?.data;
    },
});


queryClient.setQueryDefaults(["student", "subject"], {
    queryFn: () =>
        FetchGet({
            isProfessor: false,
            url: "/student/subject",
        }),
    select: (response) => {
        return response?.data;
    },
});

queryClient.setQueryDefaults(["student", "assignment"], {
    queryFn: ({queryKey}) => {
        const code = queryKey[2];
        return FetchGet({
            isProfessor: false,
            url: "/student/subject/assignment",
            config: {
                params: {
                    code,
                },
            },
        });
    },
    select: (response) => {
        return response?.data;
    },
});


queryClient.setQueryDefaults(["student", "report"], {
    queryFn: ({queryKey}) => {
        const containerName = queryKey[2];
        if (!containerName) return null;
        return FetchGet({
            isProfessor: false,
            url: "/student/subject/assignment/report",
            config: {
                params: {
                    containerName,
                },
            },
        });
    },
    select: (response) => {
        return response?.data;
    },
});

queryClient.setQueryDefaults(["container"], {
    queryFn: ({queryKey}) => {
        const imageName = queryKey[1];
        if (!imageName) return null;
        return FetchPost({
            isProfessor: false,
            url: `/container`,
            data: {
                imageName,
            },
        });
    },
    select: (response) => {
        return response?.data;
    },
    staleTime: Infinity,
});


queryClient.setQueryDefaults(["chat"], {
    queryFn: ({queryKey}) => {
        const imageName = queryKey[1];
        if (!imageName) return null;
        return FetchGet({
            isProfessor: false,
            url: `/chat/${imageName}`,
        });
    },
    select: (response) => {
        return response?.data?.map((chat) => ({
            from: chat.sender,
            text: chat.text,
            time: chat.send_time,
            isProfessor: chat.professor
        })) ?? [];
    },
    staleTime: Infinity,
});


export default queryClient;
