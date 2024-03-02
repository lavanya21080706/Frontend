import React from 'react';
import styles from './DeletePopup.module.css'
import {deleteData} from '../../../apis/Board'

function DeletePopup({ onCancel, onDelete, _id }) {
  console.log({ _id })
  const onDeleted = async () => {
    const response = await deleteData({ _id });
    console.log(response.data)

    onDelete()
    handleRefreshClick();

  }
  const handleRefreshClick = () => {
    setTimeout(() => {
      // Call the refresh function after the update
      window.location.reload();
    }, 500); // 1000 milliseconds = 1 second

  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup_container}>
        <p className={styles.message}>Are you sure you want to delete?</p>
        <button onClick={onDeleted} className={styles.delete} >Yes, Delete</button>
        <button onClick={onCancel} className={styles.cancel}>Cancel</button>
      </div>
    </div>
  );
}

export default DeletePopup;
