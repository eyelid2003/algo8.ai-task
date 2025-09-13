import axios from "axios";
import { AUTH_API_URL } from "./config";


const extractErrorMessage = (errorResponse) => {
  if (!errorResponse) return "An error occurred";

  if (errorResponse.errors && Array.isArray(errorResponse.errors)) {
    return errorResponse.errors.map((err) => err.msg).join(", ");
  }

  return (
    errorResponse.message ||
    errorResponse.error ||
    JSON.stringify(errorResponse)
  );
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${AUTH_API_URL}/auth/login`,
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    if (response.data?.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(extractErrorMessage(error.response.data));
    } else if (error.request) {
      throw new Error(
        "No response received from the server. Please check your network connection."
      );
    } else {
      throw new Error(error.message || "An unexpected error occurred. Please try again.");
    }
  }
};


export const signup = async (name, email, password) => {
  try {
    const response = await axios.post(
      `${AUTH_API_URL}/auth/signup`,
      { name, email, password },
      { headers: { "Content-Type": "application/json" } }
    );
    

    if (response.data?.token) {
      localStorage.setItem("token", response.data.token);
    }
    
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(extractErrorMessage(error.response.data));
    } else if (error.request) {
      throw new Error(
        "No response received from the server. Please check your network connection."
      );
    } else {
      throw new Error(error.message || "An unexpected error occurred. Please try again.");
    }
  }
};