import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  withCredentials: true, // sends httpOnly cookies on every request
  headers: {
    "Content-Type": "application/json",
  },
});

// No request interceptor needed — cookies are sent automatically

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
      
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/auth/refresh`,
          {},
          { withCredentials: true }
        );
        return api(originalRequest);

      } catch (refreshError) {
        // Refresh failed — session is truly expired
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;









// if cookie doesn't work in future production period i will uncomment below code:


// import axios from "axios";

// const api = axios.create({
//   baseURL: process.env.REACT_BASE_URL || "http://localhost:8080",
//   withCredentials: true,
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       (error.response && error.response.status === 401) ||
//       (error.response.status === 403 && !originalRequest._retry)
//     ) {
//       originalRequest._retry = true;

//       console.log("Token expired, refreshing...", error.response);

//       const refreshURL = "http://localhost:8080/api/auth/refresh";
//       const refreshToken = localStorage.getItem("refreshToken");

//       if (!refreshToken) {
//         window.location.href = "/login";
//         return Promise.reject(error);
//       }

//       try {
//         const response = await axios.post(refreshURL, null, {
//           params: {
//             refreshToken: refreshToken,
//           },
//           withCredentials: true,
//         });

//         const { accessToken, refreshToken: newRefreshToken } = response.data;

//         // Store in localStorage
//         localStorage.setItem("accessToken", accessToken);
//         localStorage.setItem("refreshToken", newRefreshToken);

//         originalRequest.headers.Authorization = `Bearer ${accessToken}`;

//         return axios(originalRequest);
//       } catch (refreshError) {
//         console.error("Refresh failed:", refreshError);
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");

//         window.location.href = "/login";

//         return await Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   },
// );


// export default api;