import React, { useState } from 'react';
import styles from './Settings.module.css';
import Eyeicon from '../../../assets/images/view.png';
import { passwordUpdation } from '../../../apis/Auth';


function Setting() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [data, setData] = useState({
    name: '',
    oldPassword: '',
    newPassword: '',
  });
  const [errors, setErrors] = useState({
    name: "",
    oldPassword: "",
    newPassword: "",
  });

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handlechange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const updatefunction = async (e) => {
    e.preventDefault();

    // Validate each field
    const newErrors = {};
    let hasErrors = false;

    if (!data.name) {
      newErrors.name = "Name is required";
      hasErrors = true;
    }

    if (!data.oldPassword) {
      newErrors.oldPassword = "Old Password is required";
      hasErrors = true;
    }

    if (!data.newPassword) {
      newErrors.newPassword = "New Password is required";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }
    const result = await passwordUpdation({ ...data })
    if (result) {
      console.log(result);

    }
  };


  return (
    <div>
      <div className={styles.container}>
        <p id={styles.sectionname}>Settings</p>
        <div className={styles.formcontainer}>
          <form>
            <div className={styles.inputContainer}>
              <input
                type="name"
                placeholder="Name"
                name="name"
                className={styles.name}
                onChange={handlechange}
                value={data.name}
              />
            </div>
            <p className={styles.error}>{errors.name}</p>
            <div className={styles.inputContainer}>
              <input
                type={showOldPassword ? 'text' : 'password'}
                placeholder="OldPassword"
                name="oldPassword"
                className={styles.Oldpassword}
                value={data.oldPassword}
                onChange={handlechange}
              />
              <img
                src={Eyeicon}
                alt="Toggle OldPassword Visibility"
                className={styles.eyeIcon}
                onClick={toggleOldPasswordVisibility}
              />
            </div>
            <p className={styles.error}>{errors.oldPassword}</p>
            <div className={styles.inputContainer}>
              <input
                type={showNewPassword ? 'text' : 'password'}
                placeholder="NewPassword"
                name="newPassword"
                className={styles.Newpassword}
                value={data.newPassword}
                onChange={handlechange}
              />
              <img
                src={Eyeicon}
                alt="Toggle NewPassword Visibility"
                className={styles.eyeIcon}
                onClick={toggleNewPasswordVisibility}
              />
            </div>
            <p className={styles.error}>{errors.newPassword}</p>
          </form>
          <button className={styles.updatebutton} onClick={updatefunction}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default Setting;