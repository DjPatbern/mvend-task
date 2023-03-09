import React, { useState } from "react";
// import { useSignUpContext } from "../ContextsManagers/SignUpContext";
import { usePostsContext } from "../ContextsManagers/PostContext";
import { useNavigate } from "react-router-dom";

function CreatePost() {
    // const { userId } = useSignUpContext();
  const {posts, setPosts} = usePostsContext();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        body: body,
        userId: 10,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(data => {
        setPosts([...posts, data]);
        setTitle('');
        setBody('');
        navigate('/dashboard');
      })
      .catch(error => console.log(error));
  }

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
                title.length > 0
                  ? "nextStep-btn able"
                  : "nextStep-btn disable"
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




