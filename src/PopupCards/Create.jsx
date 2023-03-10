import React from "react";
// import { useSignUpContext } from "../ContextsManagers/SignUpContext";
import { usePostsContext } from "../ContextsManagers/PostContext";

function CreatePost() {
  const { handleSubmit, title, setTitle, body, setBody } = usePostsContext();

  return (
    <div className="userName-card-container">
      <div className="userName-card-wrapper">
        <form onSubmit={handleSubmit}>
          <div>
            <img src="https://mvendgroup.com/images/logo-sm.svg" alt="logo" />
            <h2>Create a Post</h2>
          </div>
          <div className="usernameInput">
            {title.length > 0 && <p>Title</p>}
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="usernameInput">
            {body.length > 0 && <p>Body</p>}
            <input
              type="text"
              placeholder="Body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>

          <button
            className={
              title.length > 0 ? "nextStep-btn able" : "nextStep-btn disable"
            }
            type="submit"
          >
            Publish
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
