import { Axios } from "../../constants/maincontant";

export const AdminLoginApi = async (payload) => {
  try {
    const response = await Axios.post("/admin/login", payload);
    return response.data;
  } catch (error) {
    console.log(error, "error in login api");
    return error.response.data;
  }
};