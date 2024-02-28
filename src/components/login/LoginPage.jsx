import React, { useState } from 'react'
import styles from "./LoginPage.module.css"
import mailIcon from '../../assets/images/mailIcon.png'
import lock from '../../assets/images/lock.png'
import view from '../../assets/images/view.png'
import LeftContainer from '../leftContainer/LeftContainer'

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  }

  const handleLogin = () => {
    if (email.trim() === '') {
      setEmailError('Email is required');
    }
    if (password.trim() === '') {
      setPasswordError('Password is required');
    }
    // Additional logic for authentication...
  }

  return (
    <div className={styles.container}>
      <LeftContainer/>
      <div className={styles.rightContainer}>
        <p className={styles.loginText}>Login</p>
        <div className={styles.em}>
        <div className={styles.emailContainer}>
          <input 
            type='text' 
            placeholder='Email' 
            className={styles.email} 
            value={email} 
            onChange={handleEmailChange} 
          />
          <img src={mailIcon} alt='mail_icon' className={styles.mailIcon} />
        </div>
        {emailError && <p className={styles.error1}>{emailError}</p>}
        </div>
        <div className={styles.ps}>
        <div className={styles.passwordContainer}>
          <img src={lock}  alt="lock_icon" className={styles.lockIcon}/>
          <input 
            type="password" 
            placeholder="Password" 
            className={styles.password} 
            value={password} 
            onChange={handlePasswordChange} 
          />
          <img src={view} alt="view_icon" className={styles.viewIcon}  />
        </div>
        {passwordError && <p className={styles.error2}>{passwordError}</p>}
        </div>
        <button className={styles.loginButton} onClick={handleLogin}>Log in</button>
        <p className={styles.noAccount}>Have no account yet?</p>
        <button className={styles.registerButton}>Register</button>
      </div>
    </div>
  )
}

export default LoginPage;
