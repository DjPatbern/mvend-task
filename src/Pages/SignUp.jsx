import React, { useState } from "react";
import eye from "../Assets/eye.png";
import { useNavigate } from "react-router-dom";
import { useSignUpContext } from "../ContextsManagers/SignUpContext";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Header from "./Header";
import { GiCancel } from "react-icons/gi";

const SignUp = () => {
  // LOGICS IMPORTED FROM SIGNUP CONTEXT
  const {
    handleSetUser,
    handleSignUp,
    firstName,
    lastName,
    email,
    UserId,
    password,
    confirmPassword,
  } = useSignUpContext();

  // STATE TO SHOW AND HIDE PASSWORD
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      {/* REACT HELMET FOR SEO */}
      <Helmet>
        <title>Sign Up - Mvend</title>
        <meta
          name="description"
          content="Sign Up to Mvend , a platform where you can get the Read articles, 
          and post your own articles"
        />
        <link rel="canonical" href="/signup" />
      </Helmet>

      {/* PAGE IN AND OUT MOTION ANIMATION */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
      >
        <Header />
        <div className="signup-container">
          <div className="signup-wrapper">
            <GiCancel
              className="wislist-cancel"
              onClick={(e) => navigate("/")}
            />
            <section>
              <h2>Sign up Here</h2>
            </section>

            <section>
              <div className="first-last-div">
                <div className="signupInput-div firstname">
                  <p>First name</p>
                  <input
                    type="text"
                    placeholder="First name"
                    name="firstName"
                    value={firstName}
                    onChange={handleSetUser}
                  />
                </div>

                <div className="signupInput-div lastname">
                  <p>Last name</p>
                  <input
                    type="text"
                    placeholder="Last name"
                    name="lastName"
                    value={lastName}
                    onChange={handleSetUser}
                  />
                </div>
              </div>
              <div className="signupInput-div email">
                <p>Email Address</p>
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={handleSetUser}
                />
              </div>

              <div className="signupInput-div email">
                <p>UserId</p>
                <input
                  type="number"
                  placeholder="Your Id"
                  name="UserId"
                  value={UserId}
                  onChange={handleSetUser}
                />
              </div>

              <div className="signupInput-div password">
                <p>Password</p>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleSetUser}
                  />
                  <span>
                    <img
                      src={eye}
                      alt="show password"
                      onClick={(e) => setShowPassword(!showPassword)}
                    />
                  </span>
                </div>
              </div>

              <p style={{ textAlign: "left" }}>
                Your password must contain at least 8 characters.
              </p>

              <div className="signupInput-div password">
                <p>Confirm password</p>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleSetUser}
                  />
                  <span>
                    <img
                      src={eye}
                      alt="show password"
                      onClick={(e) => setShowPassword(!showPassword)}
                    />
                  </span>
                </div>
              </div>

              <button
                className={
                  confirmPassword.length > 0
                    ? "signUp-btn able"
                    : "signUp-btn disable"
                }
                onClick={handleSignUp}
                style={{color: "black"}}
              >
                Sign up
              </button>
              <p>
                Aleardy have an account? <strong >Sign in</strong>
              </p>
            </section>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SignUp;
