import React from "react";
import { useInterestContext } from "../ContextsManagers/InterestContext";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const UsernameCard = () => {
  // LOGICS AND STATE IMPORTED FROM USEINTERESTCONTEXT TO HANDLE USERNAME
  const { userName, setUserName, handleUserName } = useInterestContext();

  return (
    <>
      {/* REACT HELMET FOR SEO */}
      <Helmet>
        <title>Set Username - Mvend</title>
        <meta
          name="description"
          content="Set your Mvend Username, a platform where you can get the Read articles, 
          and post your own articles"
        />
        <link rel="canonical" href="/dashboard/setusername" />
      </Helmet>

      {/* PAGE IN AND OUT MOTION ANIMATION */}
      <motion.div
        className="userName-card-container"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
      >
        <div className="userName-card-wrapper">
          <section>
            <img src="https://mvendgroup.com/images/logo-sm.svg" alt="logo" />
            <h2>Create a username</h2>
            <p>Create a unique username personalized for yourself on Mvend.</p>
            <div className="usernameInput">
              {userName.length > 0 && <p>Username</p>}
              <input
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <section>
              <button
                className={
                  userName.length > 0
                    ? "nextStep-btn able"
                    : "nextStep-btn disable"
                }
                onClick={handleUserName}
              >
                Next step
              </button>
            </section>
          </section>
        </div>
      </motion.div>
    </>
  );
};

export default UsernameCard;
