import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../UserContext";

const Header = () => {
  const { user, logout } = useUser();
  const isAdmin = user?.role === "admin";

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

        {!user && (
          <Link
            className="px-4 py-2 bg-green-600 rounded-full hover:bg-gray-700"
            to="/login"
          >
            Admin Login
          </Link>
        )}

        {isAdmin && (
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 rounded-full hover:bg-red-700"
          >
            Logout
          </button>
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
