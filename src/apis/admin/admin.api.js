import { Axios } from "../../constants/mainContent";


export const AdminLoginApi = async (payload) => {
  try {
    const response = await Axios.post("/admin/login", payload);
    return response.data;
  } catch (error) {
    console.log(error, "error in login api");
    return error.response.data;
  }
};

export async function getAllKycRequests() {
    try {
        const response = await Axios.get("/admin/get-pending-kyc");
        return response.data;
    } catch (error) {
        console.log(error, "error in kyc api");
        return error.response.data;
    }

}

export async function verifyKycApi(id, payload) {
    try {
        const response = await Axios.put(`/admin/verify-kyc/${id}`, payload);
        return response.data;
    } catch (error) {
        console.log(error, "error in kyc api");
        return error.response.data;
    }

}

export async function getAllApprovedKyc() {
    try {
        const response = await Axios.get("/admin/get-approved-kyc");
        return response.data;
    } catch (error) {
        console.log(error, "error in kyc api");
        return error.response.data;
    }

}

export async function getAllRejectedKyc() {
    try {
        const response = await Axios.get("/admin/get-rejected-kyc");
        return response.data;
    } catch (error) {
        console.log(error, "error in kyc api");
        return error.response.data;
    }

}

export const getAllUsers = async () => {
  try {
    const response = await Axios.get("/admin/get-all-users");
    return response.data;
  } catch (error) {
    console.log(error, "error in login api");
    return error.response.data;
  }
};

export const editUserApi = async (id, payload) => {
  try {
    const response = await Axios.patch(`/admin/edit-user/${id}`, payload);
    return response.data;
  } catch (error) {
    console.log(error, "error in login api");
    return error.response.data;
  }
}

export const toggleUserStatus = async (id) => {
  try {
    const response = await Axios.patch(`/admin/update-status/${id}`);
    return response.data;
  } catch (error) {
    console.log(error, "error in login api");
    return error.response.data;
  }
}

export const toggleUserWithdrawalStatus = async (id) => {
  try {
    const response = await Axios.patch(`/admin/update-withdrawal-status/${id}`);
    return response.data;
  } catch (error) {
    console.log(error, "error in login api");
    return error.response.data;
  }
}

export const approveWithdrawal = async (payload) => {
  try {
    const response = await Axios.post("/admin/update-withdrawal-status", payload);
    return response.data;
  } catch (error) {
    console.log(error, "error in login api");
    return error.response.data;
  }
}

export const getAdminDashboardData = async () => {
  try {
    const response = await Axios.get("/admin/dashboard");
    return response.data;
  } catch (error) {
    console.log(error, "error in login api");
    return error.response.data;
  }
}

export const sendSignalApi = async (payload) => {
  try {
    const response = await Axios.post("/admin/create-signal", payload);
    return response.data;
  } catch (error) {
    console.log(error, "error in login api");
    return error.response.data;
  }
}

export const getSignalHistory = async () => {
  try {
    const response = await Axios.get("/admin/get-signal-history");
    return response.data;
  } catch (error) {
    console.log(error, "error in login api");
    return error.response.data;
  }
}

export const topupUserApi = async (payload) => {
  try {
    const response = await Axios.post("/admin/topup-user", payload);
    return response.data;
  } catch (error) {
    console.log(error, "error in topup api");
    return error.response.data;
  }
}