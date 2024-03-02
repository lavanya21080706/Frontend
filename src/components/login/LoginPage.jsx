import React, { useState } from 'react'
import styles from "./LoginPage.module.css"
import Eyeicon from '../../assets/images/view.png'
import LeftContainer from '../leftContainer/LeftContainer'
import { userLogin } from '../../apis/Auth'
import {useNavigate } from "react-router-dom";



function LoginPage() {
  const navigate=useNavigate()
   
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email:'',
    password:'',

  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handlechange = (e) => {
    setData({ ...data, [e.target.name]:e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate each field
    const newErrors = {};
    let hasErrors = false;

    if (!data.email) {
        newErrors.email = "Email is required";
        hasErrors = true;
    }

    if (!data.password) {
        newErrors.password = "Password is required";
        hasErrors = true;
    }

    if (hasErrors) {
        setErrors(newErrors);
        return;
    }

    try {
        const response = await userLogin({ ...data });
        console.log("Login API response:", response);

        if (response && response.success) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('username', response.name);
            navigate('/');
        } else {
            // Handle unsuccessful login (optional)
            console.log("Login unsuccessful:", response ? response.errorMessage : "Response is undefined");
        }
    } catch (error) {
        console.error("Error in login API:", error);
    }
};
const naviagtefunction =()=>{
  navigate('/register')
}
 


  return (
    <div className={styles.container}>
      <LeftContainer/>
       <div className={styles.rightContainer}>
        <p id={styles.login}>Login</p>
        <div className={styles.form}>
          <form>
            <div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className={styles.email}
                value={data.email}
                onChange={handlechange}
              />
              <p className={styles.error}>{errors.email}</p>
            </div>
            <div className={`${styles.inputContainer} ${styles.passwordContainer}`}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={styles.password}
                name="password"
                value={data.password}
                onChange={handlechange}
              />
              <img
                src={Eyeicon}
                alt="Toggle Password Visibility"
                className={`${styles.eyeIcon} ${styles.inputIcon}`}
                onClick={togglePasswordVisibility}
              />
              <p className={styles.error}>{errors.password}</p>
            </div>
           
            <button className={styles.button} onClick={(e) => handleSubmit(e)}>
            Log in
            </button>
          </form>
          <p className={styles.existaccount}>  Have no account yet?</p>
          <button className={styles.registerButton} onClick={naviagtefunction}>   Register</button>
        </div>
    </div>
    </div>
  )
}

export default LoginPage;
