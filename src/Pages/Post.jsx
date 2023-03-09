import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import giftDash from "../Assets/giftDash.png";
import cup from "../Assets/cup.png";
import archive from "../Assets/archive.png";
import message from "../Assets/message.png";
import searchNormal from "../Assets/search-normal.png";
import discover from "../Assets/discover.png";
import axios from "axios";
import { excerpt } from "../Utility";
import vector from "../Assets/Vector.png";
import { useSignUpContext } from "../ContextsManagers/SignUpContext";
import { Helmet } from "react-helmet-async";
import { Divide as Hamburger } from "hamburger-react";
import { motion } from "framer-motion";
import Loading from "../Loading/Loading";

const Post = () => {
  const { firstName, lastName, UserId } = useSignUpContext();

  const navigate = useNavigate();

  const [isOpen, setOpen] = useState(false); // For Phone Size Hamburger
  const params = useParams(); //Params for nested repositories
  const [post, setPost] = useState({}); // state to hold the datas of each repository
  const [loading, setLoading] = useState(false); //Loading state to await api call
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    name: "",
    email: "",
    body: "",
  });

  useEffect(() => {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts/${params.postId}/comments`
      )
      .then((res) => setComments(res.data))
      .catch((err) => console.log(err));
  }, [params]);

  const handleCommentChange = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://jsonplaceholder.typicode.com/comments", newComment)
      .then((res) => {
        setComments([...comments, res.data]);
        setNewComment({ params, name: "", email: "", body: "" });
      })
      .catch((err) => console.log(err));
  };

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleBodyChange = (e) => setBody(e.target.value);

  const handleUpdate = () => {
    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${params.postId}`, {
        title,
        body,
      })
      .then((response) => setPost(response.data));
  };

  const handleDelete = () => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${params.postId}`)
      .then(() => {
        setPost({});
      });
  };

  useEffect(() => {
    const repoLinkUrl = `https://jsonplaceholder.typicode.com/posts/${params.postId}`;

    axios
      .get(repoLinkUrl)
      .then((response) => {
        setLoading(true);
        setPost(response.data);
        setTitle(response.data.title);
        setBody(response.data.body);
      })
      .catch(function (error) {
        if (error.response.status === 404) {
          return setLoading(true);
        }
      });
  }, [params]);

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
                      Trending{" "}
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

                <p className="top-create-wishlist">Post</p>
                <div className="dashboard-search">
                  <img src={searchNormal} alt="search symbol" />
                  <input type="text" placeholder="Find friends" />
                </div>
                <button
                  className="dashboard-top-nav-btn top-create-wishlist"
                  onClick={(e) => navigate("/")}
                  style={{
                    color: "white",
                    fontWeight: "bolder",
                    backgroundColor: "#0d3c5c",
                  }}
                >
                  <span>Create Post</span>
                </button>
              </section>

              {/* OUTLET TO HANDLE USERNAME AND INTEREST POPUP */}
              <div className="popup-outlet">
                <div className="outlet">
                  <Outlet />
                </div>
              </div>

              <section className="wishlist-center-wrapper">
                <div>
                  <div className="postList">
                    {loading ? (
                      <>
                        <div className="each-post-container">
                          {" "}
                          <h2
                            onClick={() => navigate("/dashboard")}
                            style={{ cursor: "pointer" }}
                          >
                            ←
                          </h2>{" "}
                          <h2>{post.title}</h2> <p>{post.body}</p>{" "}
                        </div>
                        {post.userId === UserId ? (
                          <div className="edit-container">
                            <h1>Edit Post</h1>
                            <div style={{ marginBottom: "10px" }}>
                              <label>Title:</label>
                              <input
                                type="text"
                                value={title}
                                onChange={handleTitleChange}
                                className="edit-input"
                              />
                            </div>
                            <div>
                              <label>Body:</label>
                              <textarea
                                value={body}
                                onChange={handleBodyChange}
                                className="edit-input"
                              />
                            </div>
                            <div className="edit-btns">
                              <button onClick={handleUpdate}>Update</button>
                              <button onClick={handleDelete}>Delete</button>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      <Loading />
                    )}
                  </div>
                  <div>
                    {post.id && (
                      <div className="comments-div">
                        <h3 style={{ color: "aqua" }}>Comments</h3>
                        <ul>
                          {comments.map((comment) => (
                            <li key={comment.id} className="comment">
                              <h4>{comment.name}</h4>
                              <p>{comment.body}</p>
                              <p>{comment.email}</p>
                            </li>
                          ))}
                        </ul>

                        <form onSubmit={handleSubmit} className="comment-form">
                          <div>
                            <h3>Add Comment</h3>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginBottom: "10px",
                              }}
                            >
                              <div style={{ marginRight: "10px" }}>
                                <label>Name:</label>
                                <input
                                  type="text"
                                  name="name"
                                  value={newComment.name}
                                  onChange={handleCommentChange}
                                />
                              </div>
                              <div>
                                <label>Email:</label>
                                <input
                                  type="email"
                                  name="email"
                                  value={newComment.email}
                                  onChange={handleCommentChange}
                                />
                              </div>
                            </div>
                            <div>
                              <label>Comment:</label>
                              <textarea
                                name="body"
                                value={newComment.body}
                                onChange={handleCommentChange}
                              />
                            </div>
                            <button type="submit">Submit</button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default Post;
