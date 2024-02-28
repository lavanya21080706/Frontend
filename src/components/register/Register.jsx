import React from 'react'
import style from './Register.module.css'
import mailIcon from '../../assets/images/mailIcon.png'
import lock from '../../assets/images/lock.png'
import view from '../../assets/images/view.png'
import profile from '../../assets/images/profile.png'
import LeftContainer from '../leftContainer/LeftContainer'

function Register() {
  return (
    <div className={style.container}>
      <LeftContainer/>
      <div className={style.rightContainer}>
        <p className={style.register}>Register</p>
        <div className={style.nameContainer}>
          <input type='text' placeholder='Name' className={style.name} />
          <img src={profile} alt='profile_icon' className={style.profileIcon} />
        </div>
        <div className={style.emailContainer}>
          <input type='text' placeholder='Email' className={style.email} />
          <img src={mailIcon} alt='mail_icon' className={style.mailIcon} />
        </div>
        <div className={style.confirmPasswordContainer}>
          <img src={lock}  alt="lock_icon" className={style.lockIcon}/>
          <input type="text" placeholder="Confirm Password" className={style.confirmPassword} />
          <img src={view} alt="view_icon" className={style.viewIcon}  />
        </div>
        <div className={style.passwordContainer}>
          <img src={lock}  alt="lock_icon" className={style.lockIcon}/>
          <input type="text" placeholder="Password" className={style.password} />
          <img src={view} alt="view_icon" className={style.viewIcon}  />
        </div>
        
        <button className={style.registerButton}>Register</button>
        <p className={style.account}>Have an account ?</p>
        <button className={style.loginButton}>Log in</button>
      </div>
    </div>
  )
}

export default Register;