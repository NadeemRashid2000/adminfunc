import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext.jsx"; // Assuming this is the path

const Header = () => {
  const { user, setUser } = useContext(UserContext); // Access user and setUser from context
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/"); // Redirect to homepage after logout
  };

  return (
    <header className="bg-violet-500 text-white p-5 flex items-center justify-between">
      <Link to="/" className="text-xl font-semibold">
        My Blog
      </Link>

      <nav className="space-x-4">
        <Link
          className="px-4 py-2 bg-blue-600 rounded-full hover:bg-gray-700"
          to="/about"
        >
          About
        </Link>
        {user ? (
          user.role === "admin" ? (
            <>
              <Link
                className="px-4 py-2 bg-green-600 rounded-full hover:bg-gray-700"
                to="/create"
              >
                Create Blog
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 rounded-full hover:bg-gray-700"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 rounded-full hover:bg-gray-700"
            >
              Logout
            </button>
          )
        ) : (
          <Link
            className="px-4 py-2 bg-indigo-600 rounded-full hover:bg-gray-700"
            to="/login"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;

// import React from "react";
// import { Link } from "react-router-dom";

// const Header = () => {
//   return (
//     <header className="bg-violet-500 text-white p-5 flex items-center justify-between">
//       <Link to="/" className="text-xl font-semibold">
//         My Blog
//       </Link>

//       <nav className="space-x-4">
//         <Link
//           className="px-4 py-2 bg-blue-600 rounded-full hover:bg-gray-700"
//           to="/about"
//         >
//           About
//         </Link>
//       </nav>
//     </header>
//   );
// };

// export default Header;
