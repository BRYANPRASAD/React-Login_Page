import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./SignInUpForm.css";
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
import XIcon from '@mui/icons-material/X';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { InputAdornment, IconButton, TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignInUpForm = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  
  // New state to track if the password field has text
  const [signUpPasswordInput, setSignUpPasswordInput] = useState('');
  const [signInPasswordInput, setSignInPasswordInput] = useState('');

  

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  const signUpValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  });

  const signInValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  });

  return (
    <>
      <div className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}>
        <div className="form-container sign-up-container">
          <Formik
            initialValues={{ name: '', email: '', password: '' }}
            validationSchema={signUpValidationSchema}
            onSubmit={async (actions,values) => {
              toast.success("Sign Up Successful!");
              await new Promise((resolve)=>{
                return setTimeout(resolve,1000);
               

              });
              actions.resetForm();
              console.log("Sign Up Values:", values);
            }}
          >
            {({ handleChange, handleBlur }) => (
              <Form>
                <h1>Create Account</h1>
                <div className="social-container">
                  <a href="https://www.instagram.com" className="social-icon icon-instagram">
                    <InstagramIcon />
                  </a>
                  <a href="https://www.google.com" className="social-icon icon-google">
                    <GoogleIcon />
                  </a>
                  <a href="https://x.com" className="social-icon icon-x">
                    <XIcon />
                  </a>
                </div>
                <span>or use your email for registration</span>
                
                <TextField 
                  type="text" 
                  name="name" 
                  placeholder="Name" 
                  onChange={handleChange} 
                  onBlur={handleBlur} 
                  fullWidth
                  margin="normal"
                  size="small"
                  InputProps={{
                    style: {
                      border: 'none',
                      borderBottom: '1px solid #ccc',
                      borderRadius: '0',
                    },
                  }}
                />
                <ErrorMessage name="name" component="div" className="error" />
                
                <TextField 
                  type="email" 
                  name="email" 
                  placeholder="Email" 
                  onChange={handleChange} 
                  onBlur={handleBlur} 
                  fullWidth
                  margin="normal"
                  size="small"
                  InputProps={{
                    style: {
                      border: 'none',
                      borderBottom: '1px solid #ccc',
                      borderRadius: '0',
                    },
                  }}
                />
                <ErrorMessage name="email" component="div" className="error" />
 <TextField 
                  name="password" 
                  placeholder="Password" 
                  type={showSignUpPassword ? 'text' : 'password'}
                  onChange={(e) => {
                    handleChange(e);
                    setSignUpPasswordInput(e.target.value); // Update state with input value
                  }} 
                  onBlur={handleBlur} 
                  fullWidth
                  margin="normal"
                  size="small"
                  InputProps={{
                    style: {
                      border: 'none',
                      borderBottom: '1px solid #ccc',
                      borderRadius: '0',
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                          onMouseDown={(event) => event.preventDefault()}
                        >
                          {signUpPasswordInput ? (showSignUpPassword ? <VisibilityOffIcon /> : <VisibilityIcon />) : null}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <ErrorMessage name="password" component="div" className="error" />
                <button type="submit">Sign Up</button>
              </Form>
            )}
          </Formik>
        </div>

        <div className="form-container sign-in-container">
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={signInValidationSchema}
            onSubmit={async(actions,values) => {
              toast.success("Log In Successful!");
              console.log("Sign In Values:", values);
              await new Promise((resolve)=>{
                return setTimeout(resolve,1000);
                

              });
              actions.resetForm();
            }}
          >
            {({ handleChange, handleBlur }) => (
              <Form>
                <h1>Log in</h1>
                <div className="social-container">
                  <a href="https://www.instagram.com" className="social-icon icon-instagram">
                    <InstagramIcon />
                  </a>
                  <a href="https://www.google.com" className="social-icon icon-google">
                    <GoogleIcon />
                  </a>
                  <a href="https://x.com" className="social-icon icon-x">
                    <XIcon />
                  </a>
                </div>
                <span>or use your account</span>
                
                <TextField 
                  type="email" 
                  name="email" 
                  placeholder="Email" 
                  onChange={handleChange} 
                  onBlur={handleBlur} 
                  fullWidth
                  margin="normal"
                  size="small"
                  InputProps={{
                    style: {
                      border: 'none',
                      borderBottom: '1px solid #ccc',
                      borderRadius: '0',
                    },
                  }}
                />
                <ErrorMessage name="email" component="div" className="error" />
                
                <TextField 
                  name="password" 
                  placeholder="Password" 
                  type={showSignInPassword ? 'text' : 'password'}
                  onChange={(e) => {
                    handleChange(e);
                    setSignInPasswordInput(e.target.value); // Update state with input value
                  }} 
                  onBlur={handleBlur} 
                  fullWidth
                  margin="normal"
                  size="small"
                  InputProps={{
                    style: {
                      border: 'none',
                      borderBottom: '1px solid #ccc',
                      borderRadius: '0',
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowSignInPassword(!showSignInPassword)}
                          onMouseDown={(event) => event.preventDefault()}
                        >
                          {signInPasswordInput ? (showSignInPassword ? <VisibilityOffIcon /> : <VisibilityIcon />) : null}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <ErrorMessage name="password" component="div" className="error" />
                <a href="#">Forgot your password?</a>
                <button type="submit">Log in</button>
              </Form>
            )}
          </Formik>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" onClick={handleSignInClick}>
                Log in
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button className="ghost" onClick={handleSignUpClick}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
        
        <ToastContainer />

      </div>
    </>
  );
};

export default SignInUpForm;