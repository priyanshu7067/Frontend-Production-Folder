import { Axios } from "../../constants/mainContent";

export const userLogin = async (payload) => {
  try {
    const response = await Axios.post("/user/login", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const UserRegister = async (payload) => {
  try {
    const response = await Axios.post("/user/register", payload);
    return response.data;
  } catch (error) {
    console.log(error, "error in apis");

    return error.response.data;
  }
};

export const getProfile = async () => {
  try {
    const response = await Axios.get("/user/get-profile");
    return response.data;
  } catch (error) {
    console.log(error, "error in apis");

    return error.response.data;
  }
};

// ===================kyc======================?
export const addKyc = async (payload) => {
  try {
    const response = await Axios.post("/user/kyc", payload);
    return response.data;
  } catch (error) {
    console.log(error, "error in apis");
    return error.response.data;
  }
}
export const getKyc = async (payload) => {
  try {
    const response = await Axios.get("/user/kyc", payload);
    return response.data;
  } catch (error) {
    console.log(error, "error in apis");
    return error.response.data;
  }
}