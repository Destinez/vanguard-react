import React, {useState, useEffect, createContext } from "react";

export const UserContext = createContext(null)

// export const UserContext = ({ children }) => {

//     const UserContext = createContext({ name: '', auth: false });
//     // User is the name of the "data" that gets stored in context
//     const [user, setUser] = useState({ name: '', auth: true });
  
//     // Login updates the user data with a name parameter
//     const login = (name) => {
//       setUser((user) => ({
//         name: name,
//         auth: true,
//       }));
//     };
  
//     // Logout updates the user data to default
//     const logout = () => {
//       setUser((user) => ({
//         name: '',
//         auth: false,
//       }));
//     };
  
//     return (
//       <UserContext.Provider value={{ user, login, logout }}>
//         {children}
//       </UserContext.Provider>
//     );
//   }