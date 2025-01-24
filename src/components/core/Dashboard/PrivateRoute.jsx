import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { token, loading } = useSelector((state) => state.profile); // Assuming there's a loading state in the Redux store
  
  // Wait for authentication state to resolve
  if (loading) {
    return <div>Loading...</div>; // Show a loader while waiting
  }

  // Check if the token exists
  if (token) {
    return children; // Render the protected content
  }

  // Redirect to login if token is not present
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;

// import React from 'react'
// import { useSelector } from 'react-redux'
// import { Navigate } from 'react-router-dom'

// // for only logged in people
// // can be problem with child
// const PrivateRoute = ({ children }) => {
//   const { token } = useSelector((state) => state.profile)
//   console.log("the token is ", token);

//   if (token !== null) {
//     return children
//   } else {
//     return <Navigate to="/login" />
//   }
// }

// export default PrivateRoute


// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setToken, setUsers } from "../../../slices/profileSlice"; // Adjust path as needed

// const PrivateRoute = ({ children }) => {
//   const { token, user } = useSelector((state) => state.profile);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // Check if token exists and is valid
//     const storedToken = JSON.parse(localStorage.getItem("token"));
//     const storedUser = JSON.parse(localStorage.getItem("user"));

//     if (storedToken && storedUser) {
//       // Decode token to check expiration
//       const { exp } = JSON.parse(atob(storedToken.split('.')[1])); // Decode to get expiration time
//       const isExpired = Date.now() >= exp * 1000; // Token expiration time in milliseconds

//       if (isExpired) {
//         // If expired, remove the token and user from localStorage, and update Redux state
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         dispatch(setToken(null));
//         dispatch(setUsers(null));
//       } else {
//         // If not expired, store the token and user in Redux
//         dispatch(setToken(storedToken));
//         dispatch(setUsers(storedUser));
//       }
//     } else {
//       dispatch(setToken(null));
//       dispatch(setUsers(null));
//     }
//   }, [dispatch]);

//   // If there's no token, redirect to login page
//   if (!token || !user) {
//     return <Navigate to="/login" replace />;
//   }

//   // Render protected content if the token is valid
//   return children;
// };

// export default PrivateRoute;
