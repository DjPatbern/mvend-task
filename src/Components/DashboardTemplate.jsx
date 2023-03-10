import React, { useState } from "react";
import giftDash from "../Assets/giftDash.png";
import cup from "../Assets/cup.png";
import archive from "../Assets/archive.png";
import message from "../Assets/message.png";
import searchNormal from "../Assets/search-normal.png";
import discover from "../Assets/discover.png";
import vector from "../Assets/Vector.png";
import { Divide as Hamburger } from "hamburger-react";
import { HiOutlineLogout } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpContext } from "../ContextsManagers/SignUpContext";
import { usePostsContext } from "../ContextsManagers/PostContext";
import { excerpt } from "../Utility";

export const Sidebar = () => {
  const { firstName, lastName, handleLogout } = useSignUpContext();
  const navigate = useNavigate();

  return (
    <>
      {/* SIDEBAR */}
      <div className="sidebar">
        <img
          src="https://mvendgroup.com/images/logo-sm.svg"
          style={{ width: "80px" }}
          alt="giftly logo"
          className="dashboard-logo"
          onClick={() => navigate("/dashboard")}
        />
        <Link to="/dashboard" className="Link">
          <img src={giftDash} alt="gift" className="icon" />
          <span className="active-nav">Posts</span>
        </Link>
        <Link to="/dashboard" className="Link">
          <img src={cup} alt="cup" className="icon" />
          <span className="none-active-nav">Trending</span>
        </Link>
        <Link to="/dashboard/createpost" className="Link">
          <img src={discover} alt="discover" className="icon" />
          <span className="none-active-nav">+Post</span>
          <span className="dash-new">new</span>
        </Link>
        <Link to="/dashboard" className="Link">
          <img src={archive} alt="archive" className="icon" />
          <span className="none-active-nav">Saved</span>
        </Link>
        <Link to="/dashboard" className="Link">
          <img src={message} alt="message" className="icon" />
          <span className="none-active-nav">Support</span>
        </Link>

        {/* USERNAME DISPLAY */}
        <Link to="/" className="Link profile">
          <span className="profile-nub">
            {firstName[0]} {lastName[0]}
          </span>
          <span className="none-active-nav">
            {/* EXCERPT HERE IS USED TO SHOW ONLY THE FIRST 10 CHARACTERS OF THE USER'S NAME */}
            {excerpt(firstName + " " + lastName, 10)}
          </span>
          <img src={vector} alt="archive" className="icon" />
        </Link>
        <Link to="/" className="Link" onClick={() => handleLogout()}>
          <HiOutlineLogout style={{ marginTop: "4px", paddingRight: "2px" }} />{" "}
          Logout
        </Link>
      </div>
    </>
  );
};

export const Navi = () => {
  const { firstName, lastName, handleLogout } = useSignUpContext();
  const [isOpen, setOpen] = useState(false); // For Phone Size Hamburger
  const { search, setSearch } = usePostsContext();
  const navigate = useNavigate();

  return (
    <>
      {/* TOP NAV */}
      <section className="dashboard-top-nav">
        {/* HAMBUGER FOR PHONE NAVIGATION */}
        <div className="dropdown">
          <Hamburger
            toggle={() => setOpen((prevOpen) => !prevOpen)}
            rounded
            toggled={isOpen}
          />
          <div className={isOpen ? "dropdown-content" : "setOpen"}>
            <a href="/dashboard" className="phone-nav">
              Home
            </a>
            <a href="/dashboard" className="phone-nav">
              Posts{" "}
            </a>
            <a href="/dashboard/createpost" className="phone-nav">
              +Post <span className="dash-new">new</span>
            </a>
            <a href="/dashboard" className="phone-nav">
              Saved
            </a>
            <a href="/dashboard" className="phone-nav">
              Support
            </a>
            <a href="/" className="phone-nav">
              {" "}
              <span className="profile-nub">
                {firstName[0]} {lastName[0]}
              </span>
              {excerpt(firstName + " " + lastName, 10)}
            </a>
            <a href="/" onClick={handleLogout}>
              Logout
            </a>
          </div>
        </div>

        {/* END OF PHONE HAMBURGER */}

        <p className="top-create-wishlist">All Posts</p>
        <div className="dashboard-search">
          <img src={searchNormal} alt="search symbol" />
          <input
            type="text"
            placeholder="Find Posts"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          className="dashboard-top-nav-btn top-create-wishlist"
          onClick={(e) => navigate("/dashboard/createpost")}
          style={{
            color: "white",
            fontWeight: "bolder",
            backgroundColor: "#0d3c5c",
          }}
        >
          <span>Create Post</span>
        </button>
      </section>
    </>
  );
};
