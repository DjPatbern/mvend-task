import React from "react";
import { Link, Outlet } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { excerpt } from "../Utility";
import Loading from "../Loading/Loading";
import { usePostsContext } from "../ContextsManagers/PostContext";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Navi, Sidebar } from "../Components/DashboardTemplate";

const Dashboard = () => {
  // DATA IMPORTED FROM POST API
  const {
    sortedPosts,
    pageCount,
    changePage,
    loading,
    postsPerPage,
    pagesVisited,
  } = usePostsContext();


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
        <meta name="description" content="This is Mvend Dashboard" />
        <link rel="canonical" href="/dashboard" />
      </Helmet>
      <main className="main .bg-primary	">
        <div className="main-flex">
          <Sidebar />

          <div className="home">
            <div>
              <Navi />

              {/* OUTLET TO HANDLE USERNAME,CREATE POST AND INTEREST POPUP */}
              <div className="popup-outlet">
                <div className="outlet">
                  <Outlet />
                </div>
              </div>

              <section className="wishlist-center-wrapper">
                <div className="postList">
                  {loading ? (
                    sortedPosts
                      .slice(pagesVisited, pagesVisited + postsPerPage)
                      .map((post) => {
                        return (
                          <Link
                            to={`/posts/${post.id}`}
                            key={post.id}
                            className="post-links"
                          >
                            <div className="each-post">
                              <h2>{excerpt(post.title, 20)}</h2>

                              <p>{excerpt(post.body, 92)}</p>
                            </div>
                          </Link>
                        );
                      })
                  ) : (
                    <Loading />
                  )}
                </div>
              </section>
              <section className="pagination">
                {loading ? (
                  <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                  />
                ) : (
                  ""
                )}
              </section>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default Dashboard;
