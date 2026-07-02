import { FaTasks, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {

    localStorage.clear();

    navigate("/");

  };

  return (

    <nav className="navbar">

      <div className="logo">

        <FaTasks className="logo-icon"/>

        TaskFlow

      </div>

      <div className="nav-right">

        <div className="user-box">

          <div className="avatar">

            {user?.name?.charAt(0).toUpperCase()}

          </div>

          <span>

            {user?.name}

          </span>

        </div>

        <button
        className="logout-btn"
        onClick={logout}
        >

          <FaSignOutAlt/>

        </button>

      </div>

    </nav>

  );

}

export default Navbar;