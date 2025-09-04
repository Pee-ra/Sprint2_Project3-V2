// import { createContext, useContext, useState } from "react";
// import axios from "axios";
// import { set } from "date-fns/set";

// const AuthContext = createContext();

// export function UserProvider({ children }) {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const API_URL = "http://localhost:5001";

//     const login = async (email, password) => {
//         try {
//             setLoading(true);
//             setError(null);
//             const response = await axios.post(`${API_URL}/login`, { email, password });
//             setUser(response.data.user);
//         } catch (error) {
//             setError(error.response.data.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const logout = async () => {
//         try {
//             await axios.post(`${API_URL}/logout`);
//             setUser(null);
//         } finally {
//             setLoading(false);
//         }
//     }

//     const value = {
//         user,
//         loading,
//         error,
//         login,
//         logout,
//     };

//     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export function useAuth() {
//     return useContext(AuthContext);
// }