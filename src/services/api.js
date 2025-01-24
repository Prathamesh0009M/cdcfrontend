const BASE_URL = process.env.REACT_APP_BASE_URL



export const announceApi = {
    GET_SLIDE_DATA_API: BASE_URL + "/ajes/fetchAllSlidingData",
    MAKE_ANNOUNCE_API: BASE_URL + "/ajes/makeAnnouncement",
    FETCH_BY_ID: BASE_URL + "/ajes/fetchById",
    UPDATE_ANNOUNCE: BASE_URL + "/ajes/updateAnnouncement",
    DELETE_ANNOUNCEMENT: BASE_URL + "/ajes/deleteAnnouncement",

}
export const successApi = {
    ADD_SUCCESS_STORY: BASE_URL + "/ajes/postSuccessStory",
    FETCH_SUCCESS_STORY: BASE_URL + "/ajes/fetchAllSuccessStory",
    FETCH_SUCCESS_BY_ID: BASE_URL + "/ajes/fetchSuccessById",
    UPDATE_SUCCESSTORY_API: BASE_URL + "/ajes/updateSuccessStory",
    DELETE_STORY_API: BASE_URL + "/ajes/deleteSuccessStory",

    
}

export const eventApi = {
    GET_ALL_EVENT:BASE_URL+"/ajes/fetchEvent",
    MAKE_EVENT:BASE_URL+"/ajes/makeEvent",
    DELETE_EVENT:BASE_URL+"/ajes/deleteEventById",
    GET_EVENT_BY_ID:BASE_URL+"/ajes/getEventById",
    UPDATE_EVENT:BASE_URL+"/ajes/updateEvents",
}
export const opportunityApi = {
    GET_OPPORTUNITY_DATA: BASE_URL + "/ajes/fetchAllJob",
    GET_ANNOUNCEMENT_DATA: BASE_URL + "/ajes/fetchAnnounceMent",
    MAKE_JOB_FORM: BASE_URL + "/ajes/createJob",
    FETCH_JOB_BYID: BASE_URL + "/ajes/jobFetchByID",
    UPDATE_JOB: BASE_URL + "/ajes/updateJob",
    DELETE: BASE_URL + "/ajes/deleteJob",
}

export const auhApi = {
    GET_ALL_USER: BASE_URL + "/auth/fetchAllUser",
    LOGIN_API: BASE_URL + "/auth/login",
    CHANGE_PROFILE_API: BASE_URL + "/auth/changeProfile",
    CHANGE_PROFILE_PICT: BASE_URL + "/auth/updateDP",
    SENDOTP_API: BASE_URL + "/auth/sendOTP",
    RESSPASSTOKEN_API: BASE_URL + "/auth/resetPasswordToken",
    RESETPASSWORD_API: BASE_URL + "/auth/resetPassword",
    SIGNUP_API: BASE_URL + "/auth/signUp",
    CONTACT_US: BASE_URL + "/auth/contactus",
    DELETE_ACCOUNT: BASE_URL + "/auth/deleteAccount",

}
