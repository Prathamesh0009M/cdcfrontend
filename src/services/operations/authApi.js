import { apiConnector } from "../apiConnector";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { auhApi } from "../../services/api";
import setSignupData from "../../slices/authSlice.js";
// import {setloading} from "../../slices/authSlice.js";
import { setToken } from "../../slices/profileSlice.js";
import { setLoading } from "../../slices/authSlice.js";
// import { resetCart } from "../../slices/cartSlice";
import { setUsers } from "../../slices/profileSlice";
// import { endpoint } from "../api";
// import {login} from  "../../services/operations/"

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESSPASSTOKEN_API,
    RESETPASSWORD_API,
    CONTACT_US,
    GET_ALL_USER
} = auhApi;


export function sendOtp(email, navigate) {
    return async (dispatch) => {

        const toastId = toast.loading("Loading...");
        // setLoading(true);


        try {
            const response = await apiConnector("POST", SENDOTP_API, {
                email,
                checkUserPresent: true,
            });


            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Kindly Check Your Email");
            navigate("/verify-email");
        } catch (e) {
            console.log("send otp error............!", e);
            toast.error("Could not send OTP");
        }
        // dispatch(setloading(false));
        toast.dismiss(toastId);
        // setLoading(false);

    };
}

export function signup(
    accountType, firstName, lastName, email, password, confirmPassword, YearAndBranch, otp, collegeId, navigate
) {
    return async (dispatch) => {
        // const toastId = toast.loading("Loading...");
        setLoading(true);

        // dispatch(setloading(true));
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                collegeId,
                YearAndBranch,
                otp,
            });


            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Sign up successfully");
            navigate("/login");
        } catch (e) {
            console.log("sign up api error............!", e);
            toast.error("Sign up failed");
        }
        // dispatch(setloading(false));
        // toast.dismiss(toastId);
        setLoading(false);

    };
}
export function login(email, password, navigate) {
    return async (dispatch) => {
        // const toastId = toast.loading("Loading...");
        setLoading(true);

        // dispatch(setloading(true));
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password,
            });


            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            // console.log("token is : -", response);

            toast.success("Login successfully");
            dispatch(setToken(response.data.token));
            const userImage = response.data?.user?.image
                ? response.data.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

            // console.log("response.............", response);

            // dispatch(setUsers({ ...response.data.user, image: userImage }));
            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("user", JSON.stringify(response.data.user));

            // Reload the page before navigating
            navigate("/dashboard/my-profile");


            // *****************after it remove this *********************************
            window.location.reload();  // Forces the page to reload completely


        } catch (e) {
            console.log("login error............!", e);
            toast.error("Login failed Try Again");
        }
        // dispatch(setloading(false));
        // toast.dismiss(toastId);
        setLoading(false);

    };
}

// STATE OF setShowDropdown 
// import { toast } from 'react-toastify'; // Make sure to import toast if you're using it

export function logout(navigate) {
    return (dispatch) => {
        setLoading(true);


        // Perform logout operations
        // dispatch(setToken(null));
        // dispatch(setUsers(null));
        // Optional: dispatch(resetCart());

        localStorage.removeItem("token");
        localStorage.removeItem("users");
        toast.success("Logged Out");

        // Navigate after logout
        setLoading(false);

        navigate("/");

    };
}

export function getPasswordResetToken(email, setEmailSent) {
    return async (dispatch) => {
        // Optionally, you can dispatch a loading state here.
        try {
            // Call the API to send the reset password email
            // const toastId = toast.loading("Hold on..")
            setLoading(true);

            const response = await apiConnector("POST", RESSPASSTOKEN_API, { email });


            // Check if the response was successful
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            // toast.dismiss(toastId);
            // Display a success toast message for the user
            toast.success("Reset email sent successfully! Please check your inbox.");

            // Set the email sent state to true to show any UI feedback
            setEmailSent(true);
            setLoading(false);

        } catch (error) {

            // Show an error toast if the email couldn't be sent
            toast.error("Failed to send reset password email. Please try again.");
        }
        // Optionally, you can dispatch to end the loading state here.
    };
}

export function resetPassword(password, confirmPassword, token) {
    return async (dispatch) => {
        // dispatch(setloading(true));

        try {
            const response = await apiConnector("POST", RESETPASSWORD_API,
                { password, confirmPassword, token }
            );

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Password has been reset succesfully");

        } catch (e) {
            console.log("reset password error............!", e);
            toast.error("Reset password failed!");

        }
        // dispatch(setloading(false));
    }
}

export async function contactus(data) {
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("POST", CONTACT_US, data
        );

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        console.log(response);

        toast.success("form submitted");


    } catch (e) {
        console.log("Submit feedback error ............!", e);
        toast.error("Could not submitted!");
    }

    toast.dismiss(toastId);
    return;

}


export async function updateProfileInfo(data, token) {
    let result = null;

    const toastId = toast.loading("Loading...");


    try {
        const response = await apiConnector("POST", auhApi.CHANGE_PROFILE_API, data, {
            "Authorization": `Bearer ${token}`,
        });

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("Profile information updated successfully");
        console.log("response", response);
        const updatedUser = {
            ...JSON.parse(localStorage.getItem("user")),
            ...response.data.data // Ensure this matches the structure of the response
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        result = response?.data?.data;
    } catch (e) {
        console.log("Error updating profile information:", e.message);
        toast.error("Could not update profile information");
    }
    toast.dismiss(toastId);
    return result;
}


// export function getPasswordResetToken(email, setEmailSent) {
//     return async (dispatch) => {
//         // Optionally, you can dispatch a loading state here.
//         try {
//             // Call the API to send the reset password email
//             const toastId = toast.loading("Hold on..")
//             const response = await apiConnector("POST", RESSPASSTOKEN_API, { email });


//             // Check if the response was successful
//             if (!response.data.success) {
//                 throw new Error(response.data.message);
//             }
//             toast.dismiss(toastId);
//             // Display a success toast message for the user
//             toast.success("Reset email sent successfully! Please check your inbox.");

//             // Set the email sent state to true to show any UI feedback
//             setEmailSent(true);
//         } catch (error) {

//             // Show an error toast if the email couldn't be sent
//             toast.error("Failed to send reset password email. Please try again.");
//         }
//         // Optionally, you can dispatch to end the loading state here.
//     };
// }


export function update_Dp(thumbnailImage, token) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");

        const formData = new FormData();
        formData.append('thumbnailImage', thumbnailImage); // Ensure the key matches what the backend expects

        try {
            const response = await apiConnector("POST", auhApi.CHANGE_PROFILE_PICT, formData, {
                "Authorization": `Bearer ${token}`,
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Profile picture updated successfully");
            const updatedUser = {
                ...JSON.parse(localStorage.getItem("user")),
                image: response.data.data, // Ensure this matches the structure of the response
            };

            localStorage.setItem("user", JSON.stringify(updatedUser));


        } catch (e) {
            console.log("profile picture update............!", e);
            toast.error("Could not update profile picture");
        }
        toast.dismiss(toastId);
    };
}

export async function deleteAccount(token, navigate) {
    try {
        // console.log("reachedddddddddddddddddddddd");
        const response = await apiConnector("POST", auhApi.DELETE_ACCOUNT, null, {
            "Authorization": `Bearer ${token}`,
        });

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        localStorage.removeItem("token");
        localStorage.removeItem("users");
        navigate("/");
        toast.success("Account Deleted!");


    } catch (e) {
        console.log("Delete Account............!", e);
        toast.error("Could not delete Account");

    }

}

