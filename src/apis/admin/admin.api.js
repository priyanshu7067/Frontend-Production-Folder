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