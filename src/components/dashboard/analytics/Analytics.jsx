import React, { useEffect, useState } from 'react';
import { getAnalytics } from '../../../apis/Board';
import styles from './Analytics.module.css';

function Analytics() {
    const [data, setData] = useState({
        highPriority: '',
        lowPriority: '',
        moderatePriority: '',
        IncompleteDuetasks: '',
        Todo: '',
        Backlog: '',
        Done: '',
        Inprogress: '',
      });

    useEffect(() => {
        fetchJobDetails();
    },[]);

    const fetchJobDetails = async () => {
        try {
            const response = await getAnalytics();
            if (response) {
                console.log('Response:', response);
                setData(response);
            } 
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
        <p className={styles.sectionName}>Analytics</p>
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <div className={styles.circle}>
                    <span className={styles.status}></span>
                    <span className={styles.task}>Backlog Tasks</span>
                    <span className={styles.taskCount}>{data.Backlog}</span>
                </div>
                <div className={styles.circle}>
                <span className={styles.status}></span>
                    <span className={styles.task}>To-do Tasks</span>
                    <span className={styles.taskCount}>{data.Todo}</span>
                </div>
                <div className={styles.circle}>
                <span className={styles.status}></span>
                    <span className={styles.task}>In-Progress Tasks</span>
                    <span className={styles.taskCount}>{data.Inprogress}</span>
                </div>
                <div className={styles.circle}>
                <span className={styles.status}></span>
                    <span className={styles.task}>Completed Tasks</span>
                    <span className={styles.taskCount}>{data.Done}</span>
                </div>
            </div>
            <div className={styles.rightContainer}>
            <div className={styles.circle}>
                <span className={styles.priorityBox}></span>
                    <span className={styles.priority}>Low Priority</span>
                    <span className={styles.priorityCount}>{data.lowPriority}</span>
                </div>
                <div className={styles.circle}>
                <span className={styles.priorityBox}></span>
                    <span className={styles.priority}>Moderate Priority</span>
                    <span className={styles.priorityCount}>{data.moderatePriority}</span>
                </div>
                <div className={styles.circle}>
                <span className={styles.priorityBox}></span>
                    <span className={styles.priority}>High Priority</span>
                    <span className={styles.priorityCount}>{data.highPriority}</span>
                </div>
                <div className={styles.circle}>
                <span className={styles.priorityBox}></span>
                    <span className={styles.priority}>Due Date Tasks</span>
                    <span className={styles.priorityCount}>{data.IncompleteDuetasks}</span>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Analytics;