import { apiConnector } from "../apiConnector"
import toast from "react-hot-toast";
import { opportunityApi } from "../../services/api";
import { useNavigate } from "react-router-dom";



export const fetchOpportunity = async () => {
    let result = [];
    // const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("GET", opportunityApi.GET_OPPORTUNITY_DATA, null);

        if (!response?.data?.success) {
            throw new Error("Could not fetch All slides");
        }
        console.log("respone is ", response);


        // toast.success("Items fetched successfully");
        result = response.data.data;
    } catch (error) {
        console.error("fetch opportunity error :- ", error);
        toast.error(error.message);
    }

    // toast.dismiss(toastId);
    return result;
}


export const AddJob = async (data, token) => {

    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", opportunityApi.MAKE_JOB_FORM, data, {
            Authorization: `Bearer ${token}`,
        });

        // console.log("i AM HERE ");
        console.log("data is :- ", response)

        if (!response?.data?.success) {
            throw new Error("Could not Add Job form");
        }

        toast.success("Job form created successully !");
        result = response.data;
    } catch (error) {
        console.error("Job form creation ERROR", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
}

export const fetchJbById = async (data, token, navigate) => {
    let result = null;
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("POST", opportunityApi.FETCH_JOB_BYID, data, {
            Authorization: `Bearer ${token}`,
        });

        if (!response?.data?.success) {
            throw new Error("Error fetching job details.");
        }

        result = response.data.data;
    } catch (error) {
        console.error("JOB FETCH ERROR", error);

        if (error.response?.status === 401) {
            toast.error("Session expired. Redirecting to login...");
            navigate("/login"); // Redirect to login page
        } else {
            toast.error(error.message || "An error occurred while fetching the job details.");
        }
    }

    toast.dismiss(toastId);
    return result;
};

export const updateJob = async (data, token, navigate) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    
    try {
        const response = await apiConnector("POST", opportunityApi.UPDATE_JOB, data, {
            Authorization: `Bearer ${token}`,
        });

        if (!response?.data?.success) {
            throw new Error("Could not update job post");
        }

        toast.success("Job Updated successfully");
        result = response;
    } catch (error) {
        console.error("JOB UPDATE ERROR", error);

        if (error.response?.status === 401) {
            toast.error("Session expired. Redirecting to login...");
            navigate("/login"); // Redirect to login page
        } else {
            toast.error(error.message || "An error occurred while updating the job post.");
        }
    }

    toast.dismiss(toastId);
    return result;
};

export const deletedJobs = async (data, token) => {

    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", opportunityApi.DELETE, data, {
            Authorization: `Bearer ${token}`,
        });

        // console.log("i AM HERE ");
        // console.log("data is :- ",response)

        if (!response?.data?.success) {
            throw new Error("Could not make product");
        }
        console.log("deleted response is ", response)
        toast.success("Job deleted successfully");
        result = response;
    } catch (error) {
        console.error("JOB DELETION ERROR", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
}
