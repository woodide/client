import { QueryClient } from "react-query";
import { FetchGet } from "../model/Request";

const queryClient = new QueryClient();

queryClient.setQueryDefaults("student", {
  queryFn: () =>
    FetchGet({
      isProfessor: true,
      url: "/student",
    }),
  select: (response) => {
    return response.data.map(({ email, username, studentNumber }) => ({
      email,
      username,
      studentNumber,
    }));
  },
});

export default queryClient;
