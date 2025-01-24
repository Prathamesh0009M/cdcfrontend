import { apiConnector } from "../apiConnector"
import toast from "react-hot-toast";
import { successApi } from "../api";
import { setLoading } from "../../slices/authSlice";

export const fetchSuccessStory = async () => {
    let result = [];
    // const toastId = toast.loading("Loading...");
    setLoading(true);


    try {
        const response = await apiConnector("GET", successApi.FETCH_SUCCESS_STORY, null);

        if (!response?.data) {
            throw new Error("Could not fetch all events");
        }
        // console.log("respone of all success story is ", response);


        // toast.success("Items fetched successfully");
        result = response.data.data;
    } catch (error) {
        console.error("FETCH SuccessStory data ERROR", error);
        toast.error(error.message);
    }

    // toast.dismiss(toastId);
    setLoading(false);

    return result;
}

export const addSuccessStory = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", successApi.ADD_SUCCESS_STORY, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });

        if (!response?.data?.success) {
            throw new Error("Could not add story ");
        }

        // console.log("result of the updated event is ", response);
        toast.success("Successstory added successfully");
        result = response?.data;
    } catch (error) {
        console.log("ADD SUCCESS_STORY API ERROR", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
};


export const updateSuccessStory = async (data, token, navigate) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    
    try {
        const response = await apiConnector("POST", successApi.UPDATE_SUCCESSTORY_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });

        console.log("Response data:", response);

        if (!response?.data?.success) {
            throw new Error("Could not update Successstory Details");
        }

        toast.success("Successstory updated successfully");
        result = response?.data;
    } catch (error) {
        console.log("EDIT SUCCESS_STORY API ERROR", error);

        // Handle Unauthorized (401) error by redirecting to login page
        if (error.response?.status === 401) {
            toast.error("Session expired. Redirecting to login...");
            navigate("/login"); // Redirect to login page
        } else {
            toast.error(error.message || "An error occurred while updating the success story.");
        }
    }

    toast.dismiss(toastId);
    return result;
};

export const fetchSuccessById = async (data, token, navigate) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    
    try {
        const response = await apiConnector("POST", successApi.FETCH_SUCCESS_BY_ID, data, {
            Authorization: `Bearer ${token}`,
        });

        console.log("Data is:", response);

        if (!response?.data?.success) {
            throw new Error("Could not fetch data");
        }

        result = response.data;
    } catch (error) {
        console.error("FETCH SUCCESS STORY ERROR", error);

        if (error.response?.status === 401) {
            toast.error("Session expired. Redirecting to login...");
            navigate("/login"); // Redirect to login page
        } else {
            toast.error(error.message || "An error occurred while fetching the success story.");
        }
    }

    toast.dismiss(toastId);
    return result;
};


export const deleteStory = async (data, token) => {

    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", successApi.DELETE_STORY_API, data, {
            Authorization: `Bearer ${token}`,
        });

        // console.log("i AM HERE ");
        // console.log("data is i am here  :- ",response)

        if (!response?.data?.success) {
            throw new Error("Could not delete ");
        }

        toast.success("Story deleted Succesfully ");
        result = response.data;
    } catch (error) {
        console.error("DELETE SUCCESS POST ERROR", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
}


