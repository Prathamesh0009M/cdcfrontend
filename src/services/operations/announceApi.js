import { apiConnector } from "../apiConnector"
import toast from "react-hot-toast";
import { announceApi, eventApi } from "../api"
import { auhApi, opportunityApi } from "../../services/api";
import { setLoading } from "../../slices/authSlice";

const {
    GET_SLIDE_DATA_API,
    MAKE_ANNOUNCE_API
} = announceApi;



// export const fetchSlidingData = async () => {
//     let result = [];
//     const toastId = toast.loading("Loading...");

//     try {
//         const response = await apiConnector("GET", GET_SLIDE_DATA_API, null);

//         if (!response?.data?.success) {
//             throw new Error("Could not fetch All slides");
//         }
//         console.log("respone is ", response);


//         // toast.success("Items fetched successfully");
//         result = response.data.data;
//     } catch (error) {
//         console.error("FETCH sliding data ERROR", error);
//         toast.error(error.message);
//     }

//     toast.dismiss(toastId);
//     return result;
// }


export const fetchAnnounce = async () => {
    let result = [];
    // const toastId = toast.loading("Loading...");
    setLoading(true);

    try {
        const response = await apiConnector("GET", opportunityApi.GET_ANNOUNCEMENT_DATA, null);
        // console.log(response)
        if (!response?.data) {
            throw new Error("Could not fetch All announcements");
        }
        console.log("respone is ", response);


        // toast.success("Items fetched successfully");
        result = response.data.data;
    } catch (error) {
        console.error("FETCH sliding data ERROR", error);
        toast.error(error.message);
    }

    // toast.dismiss(toastId);
    setLoading(false);

    return result;
}

export const fetchAllUser = async () => {
    let result = [];
    // const toastId = toast.loading("Loading...");
    setLoading(true);


    try {
        const response = await apiConnector("GET", auhApi.GET_ALL_USER, null);

        if (!response?.data?.success) {
            throw new Error("Could not fetch All slides");
        }
        console.log("respone is ", response);


        // toast.success("Items fetched successfully");
        result = response.data.data;
    } catch (error) {
        console.error("FETCH sliding data ERROR", error);
        toast.error(error.message);
    }

    // toast.dismiss(toastId);
    setLoading(false);

    return result;
}


export const createAnnounce= async (data, token) => {
    
    let result = null;
    const toastId = toast.loading("Loading...");
    // setLoading(true);


    try {
        const response = await apiConnector("POST", MAKE_ANNOUNCE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });

        if (!response?.data?.success) {
            throw new Error("Could not Update Course Details");
        }

        toast.success("Announcement created successfully..");
        result = response?.data;
    } catch (error) {
        console.log("EDIT COURSE API ERROR", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    setLoading(false);

    return result;
};

export const editAnnounce= async (data, token) => {
    
    let result = null;
    // const toastId = toast.loading("Loading...");
    setLoading(true);


    try {
        const response = await apiConnector("POST", announceApi.UPDATE_ANNOUNCE, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });

        if (!response?.data?.success) {
            throw new Error("Could not Update Course Details");
        }

        toast.success("Course Details Updated Successfully");
        result = response?.data;
    } catch (error) {
        console.log("EDIT COURSE API ERROR", error);
        toast.error(error.message);
    }

    // toast.dismiss(toastId);
    setLoading(false);

    return result;
};




export const fetchannounceById = async (data, token) => {
    let result = null;
    // const toastId = toast.loading("Loading...");
    setLoading(true);

    try {
        const response = await apiConnector("POST", announceApi.FETCH_BY_ID, data, {
            Authorization: `Bearer ${token}`,
        });
        // console.log("i AM HERE ");
        console.log("data is i am here  :- ",response)

        if (!response?.data?.success) {
            throw new Error("Could not make product");
        }
        // toast.success("Items viewed successfully");
        result = response.data;
    } catch (error) {
        console.error("product create successfully ERROR", error);
        toast.error(error.message);
    }
    // toast.dismiss(toastId);
    setLoading(false);
    
    return result;
}


export const deleteAnnouncement = async (data, token) => {

    let result = null;
    // const toastId = toast.loading("Loading...");
    setLoading(true);

    try {
        const response = await apiConnector("POST", announceApi.DELETE_ANNOUNCEMENT, data, {
            Authorization: `Bearer ${token}`,
        });

        // console.log("i AM HERE ");
        console.log("data is i am here  :- ",response)

        if (!response?.data?.success) {
            throw new Error("Could not make product");
        }

        toast.success("Announcement Deleted successfully ");
        result = response.data;
    } catch (error) {
        console.error("product create successfully ERROR", error);
        toast.error(error.message);
    }

    // toast.dismiss(toastId);
    setLoading(false);

    return result;
}



