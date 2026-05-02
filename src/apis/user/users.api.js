import { Axios } from "../../constants/maincontant";

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