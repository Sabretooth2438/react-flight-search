// Handle API errors.
const handleErrors = (error) => {
  if (error.response) {
    console.error("Error Response:", error.response.data);
    return error.response.data?.message || "Error processing your request.";
  } else if (error.request) {
    console.error("No Response:", error.request);
    return "No response from server. Check your internet connection.";
  } else {
    console.error("Error:", error.message);
    return error.message || "Unexpected error occurred.";
  }
};

export default handleErrors;
