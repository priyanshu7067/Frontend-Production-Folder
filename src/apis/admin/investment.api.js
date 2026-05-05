import { Axios } from "../../constants/mainContent";

export const getAllInvestmentHistory = async () => {
  try {
    const response = await Axios.get("/admin/get-investment-history");
    return response.data;
  } catch (error) {
    console.log(error, "error in investment history api");
    return error.response.data;
  }
};

export const getAllDirectIncome = async () => {
  try {
    const response = await Axios.get("/admin/get-direct-income");
    return response.data;
  } catch (error) {
    console.log(error, "error in direct income api");
    return error.response.data;
  }
};

export const getAllLevelIncome = async () => {
  try {
    const response = await Axios.get("/admin/get-level-income");
    return response.data;
  } catch (error) {
    console.log(error, "error in level income api");
    return error.response.data;
  }
};
