import { QueryClient } from "react-query";
import { FetchGet } from "../model/Request";

const queryClient = new QueryClient();

queryClient.setQueryDefaults(["professor", "all_student"], {
  queryFn: () =>
    FetchGet({
      isProfessor: true,
      url: "/list/student",
    }),
  select: (response) => {
    return (
      response?.data.map(({ email, username, studentNumber }) => ({
        email,
        username,
        studentNumber,
      })) ?? []
    );
  },
});

queryClient.setQueryDefaults(["professor", "subject", "student"], {
  queryFn: ({ queryKey }) => {
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
      url: "/subject/list",
    }),
  select: (response) => {
    return response?.data;
  },
});

export default queryClient;
