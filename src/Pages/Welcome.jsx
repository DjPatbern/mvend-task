import React, { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { useSignUpContext } from "../ContextsManagers/SignUpContext";
import { motion } from "framer-motion";
import Header from "./Header";

const WelcomeRedirectPage = () => {
  const navigate = useNavigate();

  // IMPORTING FIRST NAME FROM SIGNUP CONTEXT TO DISPLAY ON OUR WELCOME PAGE
  const { firstName } = useSignUpContext();

  // A LOGIC TO REDIRECT USER TO SETUSERNAME PAGE
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/dashboard/setusername");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <motion.div
      className="welcome-redirect-container"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <Header />
      <div className="welcome-redirect-wrapper">
        <div>
          <div className="welcome-text-btn-wrapper">
            <div>
              <h2>Hello {firstName}, Welcome to Mvend 🎉</h2>
              <p>
                To continue using Mvend, head over to your inbox and click on{" "}
                <br></br> the verification link we just sent you.
              </p>
              <section>
                <p className="resend-mail">Resend email</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeRedirectPage;
