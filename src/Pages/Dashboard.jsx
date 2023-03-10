import React, {  useMemo, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import giftDash from "../Assets/giftDash.png";
import cup from "../Assets/cup.png";
import archive from "../Assets/archive.png";
import message from "../Assets/message.png";
import searchNormal from "../Assets/search-normal.png";
import ReactPaginate from "react-paginate";
import discover from "../Assets/discover.png";
import { excerpt } from "../Utility";
import vector from "../Assets/Vector.png";
import { useSignUpContext } from "../ContextsManagers/SignUpContext";
import Loading from "../Loading/Loading"
import { usePostsContext } from "../ContextsManagers/PostContext";
import { Helmet } from "react-helmet-async";
import { Divide as Hamburger } from "hamburger-react";
import { motion } from "framer-motion";

const Dashboard = () => {
  // FIRST AND LAST NAME IMPORTED AFTER USER IS SIGNED UP
  const { firstName, lastName } = useSignUpContext();
  const { posts, loading } = usePostsContext();



  const navigate = useNavigate();

  const [isOpen, setOpen] = useState(false); // For Phone Size Hamburger
  const [pageNumber, setPageNumber] = useState(0); // Pagination state
  const postsPerPage = 12; // posts to be displayed per page
  const pagesVisited = pageNumber * postsPerPage;
  const [search, setSearch] = useState("")

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => post.body.toLowerCase().includes(search.toLowerCase()))
  },[posts, search])

  const sortedPosts = useMemo(() => 
  [...filteredPosts].sort((a,b) => b.id - a.id)
  ,[filteredPosts])
  




  const pageCount = Math.ceil(posts.length / postsPerPage);

  function changePage({ selected }) {
    setPageNumber(selected);
  }
  return (
    // PAGE IN AND OUT MOTION ANIMATION
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      {/* REACT HELMET FOR SEO */}
      <Helmet>
        <title>Dashboard - Mvend</title>
        <meta
          name="description"
          content="This is Mvend Dashboard"
        />
        <link rel="canonical" href="/dashboard" />
      </Helmet>
      <main className="main .bg-primary	">
        <div className="main-flex">
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
            <Link to="/dashboard" className="Link profile">
              <span className="profile-nub">
                {firstName[0]} {lastName[0]}
              </span>
              <span className="none-active-nav">
                {/* EXCERPT HERE IS USED TO SHOW ONLY THE FIRST 10 CHARACTERS OF THE USER'S NAME */}
                {excerpt(firstName + " " + lastName, 10)}
              </span>
              <img src={vector} alt="archive" className="icon" />
            </Link>
          </div>

          <div className="home">
            <div>
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
                    <a href="/dashboard" className="phone-nav">
                      {" "}
                      <span className="profile-nub">
                        {firstName[0]} {lastName[0]}
                      </span>
                      {excerpt(firstName + " " + lastName, 10)}
                    </a>
                  </div>
                </div>

                {/* END OF PHONE HAMBURGER */}

                <p className="top-create-wishlist">All Posts</p>
                <div className="dashboard-search">
                  <img src={searchNormal} alt="search symbol" />
                  <input type="text" placeholder="Find Posts" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <button
                  className="dashboard-top-nav-btn top-create-wishlist"
                  onClick={(e) => navigate("/dashboard/createpost")}
                  style={{ color: "white", fontWeight: "bolder", backgroundColor: "#0d3c5c" }}
                >
                  <span>Create Post</span>
                </button>
              </section>

              {/* OUTLET TO HANDLE USERNAME,CREATE POST AND INTEREST POPUP */}
              <div className="popup-outlet">
                <div className="outlet">
                  <Outlet />
                </div>
              </div>

              <section className="wishlist-center-wrapper">
                <div className="postList">
                {loading
            ? sortedPosts
                .slice(pagesVisited, pagesVisited + postsPerPage)
                .map((post) => {
                  return (
                    <Link to={`/posts/${post.id}`} key={post.id} className="post-links">
                    <div  className="each-post">
                      
                        <h2>{excerpt(post.title, 20)}</h2>
                        
                        <p>{excerpt(post.body, 92)}</p>
                      
                    </div>
                    </Link>
                  );
                })
            : <Loading />
            }
            </div>


                
                
              </section>
              <section className="pagination">{
          loading ? <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        /> : ''
        }
          
        </section>
              
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default Dashboard;
