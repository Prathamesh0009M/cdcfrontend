// fetchAnnounceMent
import { apiConnector } from "../apiConnector"
import toast from "react-hot-toast";
import { eventApi } from "../api"
import { useNavigate } from "react-router-dom";



export const fetchEvents = async () => {
    let result = [];
    // const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("GET", eventApi.GET_ALL_EVENT, null);

        if (!response?.data) {
            throw new Error("Could not fetch all events");
        }
        // console.log("respone of all event is ", response.data);


        // toast.success("Items fetched successfully");
        result = response.data.data;
    } catch (error) {
        console.error("FETCH sliding data ERROR", error);
        toast.error(error.message);
    }

    // toast.dismiss(toastId);
    return result;
}



export const createEvents= async (data, token) => {
    
    let result = null;
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("POST", eventApi.MAKE_EVENT, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });

        if (!response?.data?.success) {
            throw new Error("Events could not created");
        }
        // console.log("result of the create event is ", response);
        toast.success("event created successfully.");
        result = response?.data;
    } catch (error) {
        console.log("Event creation API ERROR", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
};

export const updateEventById = async (data, token, navigate) => {
    let result = null;
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("POST", eventApi.UPDATE_EVENT, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });

        if (!response?.data?.success) {
            throw new Error("Could not update Events");
        }

        console.log("Result of the updated event is", response);
        toast.success("Event Updated.");
        result = response?.data;
    } catch (error) {
        console.log("EDIT Event API ERROR", error);

        if (error.response?.status === 401) {
            toast.error("Session expired. Redirecting to login...");
            navigate("/login"); // Redirect to login page
        } else {
            toast.error(error.message || "An error occurred");
        }
    }

    toast.dismiss(toastId);
    return result;
};

export const fetchEventById = async (data, token, navigate) => {
    let result = null;
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("POST", eventApi.GET_EVENT_BY_ID, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });

        if (!response?.data?.success) {
            throw new Error("Could not fetch Event");
        }

        result = response?.data;
    } catch (error) {
        console.log("Event API ERROR", error);

        if (error.response?.status === 401) {
            toast.error("Session expired. Redirecting to login...");
            navigate("/login"); // Redirect to login page
        } else {
            toast.error(error.message || "An error occurred");
        }
    }

    toast.dismiss(toastId);
    return result;
};


export const deleteEvent = async (data, token) => {

    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", eventApi.DELETE_EVENT, data, {
            Authorization: `Bearer ${token}`,
        });

        // console.log("i AM HERE ");
        // console.log("data is i am here  :- ",response)

        if (!response?.data?.success) {
            throw new Error("Could not delete Event");
        }

        toast.success("Event Deleted successfully ");
        result = response.data;
    } catch (error) {
        console.error("Event deletion  ERROR", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
}
