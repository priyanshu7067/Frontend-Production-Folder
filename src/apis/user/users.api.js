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

export const getProfile = async (role) => {
  try {
    const response = await Axios.get(`/${role}/get-profile`);
    return response.data;
  } catch (error) {
    console.log(error, "error in apis");

    return error.response.data;
  }
};

export const getUserInfo = async (Wallet) => {
  try {
    const response = await Axios.get(`/user/get-user-info/${Wallet}`);
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
export const topupApi = async (payload) => {
  try {
    const res = await Axios.post("/user/investment", payload);
    return res.data;
  } catch (error) {
    console.error(error, "error in topup api");
    return error.response.data;
  }
};

export const buySellAiTradingBot = async (payload) => {
  try {
    const response = await Axios.put("/user/buy-bot", payload);
    return response.data;
  } catch (error) {
    console.log(error, "error in apis");
    return error.response.data;
  }
}
export const allincomeCards = async () => {
  try {
    const response = await Axios.get("/user/all-income-cards");
    return response.data;
  } catch (error) {
    console.log(error, "error in apis");
    return error.response.data;
  }
}
// =================histories==============
export const getLevelncomeHistory = async () => {
  try {
    const response = await Axios.get("/user/level-history");
    return response.data;
  } catch (error) {
    console.log(error, "error in apis");
    return error.response.data;
  }
}
export const getTradIngHistory = async () => {
  try {
    const response = await Axios.get("/user/trade-history");
    return response.data;
  } catch (error) {
    console.log(error, "error in apis");
    return error.response.data;
  }
}
export const getRankRoyalityHistory = async () => {
  try {
    const response = await Axios.get("/user/rank-history");
    return response.data;
  } catch (error) {
    console.log(error, "error in apis");
    return error.response.data;
  }
}
export const getPromotionHistory = async () => {
  try {
    const response = await Axios.get("/user/trade-history");
    return response.data;
  } catch (error) {
    console.log(error, "error in apis");
    return error.response.data;
  }
}
export const getReferralHistory = async () => {
  try {
    const response = await Axios.get("/user/trade-history");
    return response.data;
  } catch (error) {
    console.log(error, "error in apis");
    return error.response.data;
  }
}

// ===================teams-------------------

export const getMyTeams = async () => {
  try {
    const response = await Axios.get("/user/get-myteams");
    return response.data;
  } catch (error) {
    console.log(error, "error in apis");
    return error.response.data;
  }
}

export const getMyDirectTeams = async () => {
  try {
    const response = await Axios.get("/user/get-partners");
    return response.data;
  } catch (error) {
    console.log(error, "error in apis");
    return error.response.data;
  }
}