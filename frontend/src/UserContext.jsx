// src/UserContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // ✅ Fix here

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { userId, role }

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token); // ✅ updated function name
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token); // ✅ updated function name
        setUser(decoded);
      } catch (err) {
        console.error("Invalid token");
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);












// import React, { createContext, useEffect, useState } from "react";
// import { jwtDecode } from "jwt-decode";

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         setUser({ ...decoded, token });
//       } catch (err) {
//         console.error("Invalid token");
//         localStorage.removeItem("token");
//       }
//     }
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
