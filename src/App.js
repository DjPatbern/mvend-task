import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UseSignUp } from "./ContextsManagers/SignUpContext";
import SignUp from "./Pages/SignUp";
import WelcomeRedirectPage from "./Pages/Welcome";
import { UseInterest } from "./ContextsManagers/InterestContext";
import Dashboard from "./Pages/Dashboard";
import UsernameCard from "./Pages/UsernameCard";
import UserInterestCard from "./Pages/UserInterestCard";
import NotFound from "./Pages/NotFound";
import Post from "./Pages/Post";
import Create from "./Pages/Create";
import { UsePosts } from "./ContextsManagers/PostContext";

function App() {
  return (
    <div className="App">
      <UseSignUp>
        <UseInterest>
          <UsePosts>
            <main className="App-main">
              <ToastContainer position="top-center" />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                  path="/welcomeredirect"
                  element={<WelcomeRedirectPage />}
                />
                <Route path="*" element={<NotFound />} />
                <Route path="posts/:postId" element={<Post />} />

                <Route path="/dashboard" element={<Dashboard />}>
                  <Route path="setusername" element={<UsernameCard />} />
                  <Route path="interest" element={<UserInterestCard />} />
                  <Route path="createpost" element={<Create />} />
                </Route>
              </Routes>
            </main>
          </UsePosts>
        </UseInterest>
      </UseSignUp>
    </div>
  );
}

export default App;
