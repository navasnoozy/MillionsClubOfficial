import axios from "axios";

const handleApiError = (error: unknown, setError: (errors: any[]) => void) => {
  if (axios.isAxiosError(error)) {
    const errors = error.response?.data?.error || [
      { message: "An unexpected error occurred", field: "general" },
    ];
    setError(errors);
  } else {
    setError([{ message: "Network error", field: "general" }]);
  }
};

export default handleApiError
