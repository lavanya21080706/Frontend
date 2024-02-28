import React from 'react'
import Art from '../../assets/images/Art.png'
import styles from './LeftContainer.module.css'

function LeftContainer(){
    return(
    <div className={styles.leftContainer}>
    <div className={styles.back}></div>
    <img src={Art} alt='art_image' className={styles.art} />
    <p className={styles.welcomeText}>Welcome aboard my friend</p>
    <p className={styles.text}>just a couple of clicks and we start</p>
  </div>
  )
}

export default LeftContainer;