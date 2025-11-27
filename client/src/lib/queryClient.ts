import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          return false;
        }

        return failureCount < 3;
      },
    },
  },
});

export default queryClient;
