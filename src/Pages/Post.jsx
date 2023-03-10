import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSignUpContext } from "../ContextsManagers/SignUpContext";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Loading from "../Loading/Loading";
import { Navi, Sidebar } from "../Components/DashboardTemplate";

const Post = () => {
  const { UserId } = useSignUpContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); //for Loading state while awaiting api call
  const params = useParams(); //Params for nested Post
  const [post, setPost] = useState({}); // state to hold the datas of each post
  const [title, setTitle] = useState(""); // state to hold the title of a particular post for editing and deleting
  const [body, setBody] = useState(""); // state to hold the body of a post for editing and deleting
  const [comments, setComments] = useState([]); // state to hold the comments of a post
  const [newComment, setNewComment] = useState({
    name: "",
    email: "",
    body: "",
  }); // state to set a new comment

  //LOGIC TO FETCH THE API OF A SINGLE POST

  useEffect(() => {
    const postLinkUrl = `https://jsonplaceholder.typicode.com/posts/${params.postId}`;

    axios
      .get(postLinkUrl)
      .then((response) => {
        setLoading(true);
        setPost(response.data);
        setTitle(response.data.title);
        setBody(response.data.body);
      })
      .catch(function (error) {
        if (error.response.status === 404) {
          return <Loading />;
        }
      });
  }, [params]);

  //LOGIC FOR EDITING AND DELETING A POST
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

  //LOGIC FOR SETING AND POSTING NEW COMMENT
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
                            <div className="edit-body">
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
                            <div className="comment-name">
                              <div style={{ marginRight: "10px" }}>
                                {/* <label>Name:</label> */}
                                <input
                                  type="text"
                                  name="name"
                                  value={newComment.name}
                                  onChange={handleCommentChange}
                                  placeholder="Name"
                                />
                              </div>
                              <div className="email-input">
                                {/* <label>Email:</label> */}
                                <input
                                  type="email"
                                  name="email"
                                  value={newComment.email}
                                  onChange={handleCommentChange}
                                  placeholder="Email"
                                />
                              </div>
                              <div>
                                {/* <label className="comment-text">Comment:</label> */}
                                <input
                                  name="body"
                                  value={newComment.body}
                                  onChange={handleCommentChange}
                                  placeholder="Comment"
                                  className="textarea"
                                />
                              </div>
                              <button type="submit">Submit</button>
                            </div>
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
