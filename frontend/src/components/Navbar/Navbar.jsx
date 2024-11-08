import PropTypes from "prop-types";
import "./Navbar.css";
import obucLogo from "../../assets/obuc-logo.png";
import { GoGear } from "react-icons/go";
import { PiLayout } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { useState } from "react";
import { getUser } from "../../services/utils";
import { Link } from "react-router-dom";

export default function Navbar({ currentTab, setCurrentTab }) {
  const user = getUser();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navButtons = [
    { id: 1, label: "Board", icon: <PiLayout />, value: "board" },
    { id: 2, label: "Tags", icon: <GoGear />, value: "tags" },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <div className="navbar-wrapper">
      <img className="navbar-logo" src={obucLogo} alt="Obuc logo" />
      <div className="buttons-wrapper">
        {navButtons.map((button) => (
          <button
            key={button.id}
            className={`nav-button ${
              currentTab === button.value ? "active" : ""
            }`}
            onClick={() => {
              setCurrentTab(button.value);
            }}
          >
            {button.icon}
            {button.label}
          </button>
        ))}
      <div
          className="user-container nav-button"
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          <CiUser size={20} /> {user ? user.user : <Link to={'/login'} >Login</Link>}
          {showUserMenu && user && (
            <div className="user-menu">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Navbar.propTypes = {
  currentTab: PropTypes.string.isRequired,
  setCurrentTab: PropTypes.func.isRequired,
};
