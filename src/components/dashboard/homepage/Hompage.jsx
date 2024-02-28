import { useState } from 'react'
import styles from './Homepage.module.css'
import proManageIcon from '../../../assets/images/proManageIcon.png'
import boardIcon from '../../../assets/images/boardIcon.png'
import analyticsIcon from '../../../assets/images/analyticsIcon.png'
import settingsIcon from '../../../assets/images/settingsIcon.png'
import logoutIcon from '../../../assets/images/logoutIcon.png'
import Board from '../board/Board'
import Analytics from '../analytics/Analytics'
import Settings from '../settings/Settings'

function Homepage() {
    const [selectedComponent, setSelectedComponent] = useState('Board')

    const handleComponentChange = (componentName) => {
        setSelectedComponent(componentName);
    };

    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <div className={styles.promanage}>
                    <img src={proManageIcon} alt='promanage_icon' className={styles.promanageIcon} />
                    <p className={styles.promanage_text}>Pro Manage</p>
                </div>
                <div className={`${styles.board} ${selectedComponent === 'Board' ? styles.selected : ''}`} onClick={() => handleComponentChange('Board')}>
                    <img src={boardIcon} alt='board_icon' className={styles.board_icon} />
                    <p className={`${styles.board_text} ${selectedComponent === 'Board' ? styles.selectedText : ''}`}>Board</p>
                </div>
                <div className={`${styles.analytics} ${selectedComponent === 'Analytics' ? styles.selected : ''}`} onClick={() => handleComponentChange('Analytics')}>
                    <img src={analyticsIcon} alt='analytics_icon' className={styles.analyticsIcon} />
                    <p className={`${styles.analytics_text} ${selectedComponent === 'Analytics' ? styles.selectedText : ''}`}>Analytics</p>
                </div>
                <div className={`${styles.settings} ${selectedComponent === 'Settings' ? styles.selected : ''}`} onClick={() => handleComponentChange('Settings')}>
                    <img src={settingsIcon} alt='settings_icon' className={styles.settingsIcon} />
                    <p className={`${styles.settings_text} ${selectedComponent === 'Settings' ? styles.selectedText : ''}`}>Settings</p>
                </div>
                <div className={styles.logout}>
                    <img src={logoutIcon} alt='Logout_Icon' className={styles.logoutIcon} />
                    <p className={styles.logout_text}>Logout</p>
                </div>
            </div>
            <div className={styles.rightContainer}>
                {selectedComponent === 'Board' && <Board />}
                {selectedComponent === 'Analytics' && <Analytics />}
                {selectedComponent === 'Settings' && <Settings/>}
            </div>
        </div>
    )
}

export default Homepage;
