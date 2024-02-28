import { useState } from 'react';
import React from 'react';
import styles from './Board.module.css';
import collapseIcon from '../../../assets/images/collapseIcon.png'
import plus from '../../../assets/images/plus.png'
import Popup from '../popup/Popup'
import Card from '../../card/Card'

function Board() {
    const [selectedOption, setSelectedOption] = useState('This Week');
    const [popup, setPopup] = useState(false);
    const [cards, setCards] = useState([]);
    const [todoCollapsed, setTodoCollapsed] = useState(false);
    const [backlogCollapsed, setBacklogCollapsed] = useState(false); 
    const [progressCollapse, setProgressCollapse] = useState(false); 
    const [doneCollapse, setDoneCollapse] = useState(false); 




    const getFormattedDate = () => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = months[currentDate.getMonth()];
        const year = currentDate.getFullYear();

        // Function to add ordinal suffix to the day
        const getOrdinalSuffix = (day) => {
            if (day >= 11 && day <= 13) {
                return 'th';
            }
            switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };

        const ordinalSuffix = getOrdinalSuffix(day);
        return `${day}${ordinalSuffix} ${month}, ${year}`;
    };

    const handleSavePopup = (data) => {
        setCards([...cards, data]);
        setPopup(false);
    };

    const handleClose = () => {
        setPopup(false);
    };

    const handleClick = () => {
        setPopup(true);
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const toggleCollapseAll = () => {
        setTodoCollapsed(!todoCollapsed);
    };

    const toggleBacklogCollapse = () => {
        setBacklogCollapsed(!backlogCollapsed);
    };

    const toggleProgressCollapse = () => {
        setProgressCollapse(!progressCollapse);
    };

    const toggleDoneCollapse = () => {
        setDoneCollapse(!doneCollapse);
    };
    return (
        <div className={styles.boardContainer}>
            <p className={styles.welcome}>Welcome! Kumar</p>
            <div className={styles.dateContainer}>
                <p className={styles.date}>{getFormattedDate()}</p>
            </div>
            <div className={styles.optionsContainer}>
                <span className={styles.head}>Board</span>
                <div className={styles.options}>
                    <select value={selectedOption} onChange={handleOptionChange}>
                        <option value="Today">Today</option>
                        <option value="This Week">This Week</option>
                        <option value="This Month">This Month</option>
                    </select>
                </div>
            </div>
            <div className={styles.sectionContainer}>
                <div className={styles.backlog}>
                    <div className={styles.headingSection}>
                        <p className={styles.heading}>Backlog</p>
                        <img src={collapseIcon} alt='collapse_icon' className={styles.collapse} onClick={toggleBacklogCollapse} />
                    </div>
                    <div className={styles.cardContainer}>
                        {cards.map((card, index) => (
                            <Card
                                key={index}
                                priority={card.priority}
                                title={card.title}
                                checklistItems={card.checklistItems}
                                dueDate={card.dueDate}
                                vp={card.vp}
                                isCollapsed={backlogCollapsed}
                                onMoveToBacklog={() => console.log('Move to backlog')}
                                onMoveToInProgress={() => console.log('Move to in progress')}
                                onMoveToDone={() => console.log('Move to done')}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.todo}>
                    <div className={styles.headingSection}>
                        <p className={styles.heading}>To do</p>
                        <img src={plus} alt='plus_icon' className={styles.plus} onClick={handleClick} />
                        <img src={collapseIcon} alt='collapse_icon' className={styles.collapse} onClick={toggleCollapseAll} />
                    </div>
                    <div className={styles.cardContainer}>
                        {cards.map((card, index) => (
                            <Card
                                key={index}
                                priority={card.priority}
                                title={card.title}
                                checklistItems={card.checklistItems}
                                dueDate={card.dueDate}
                                vp={card.vp}
                                isCollapsed={todoCollapsed}
                                onMoveToBacklog={() => console.log('Move to backlog')}
                                onMoveToInProgress={() => console.log('Move to in progress')}
                                onMoveToDone={() => console.log('Move to done')}
                            />
                        ))}
                    </div>

                </div>
                <div className={styles.inProgress}>
                    <div className={styles.headingSection}>
                        <p className={styles.heading}>In progress</p>
                        <img src={collapseIcon} alt='collapse_icon' className={styles.collapse} onClick={toggleProgressCollapse}/>
                    </div>
                    <div className={styles.cardContainer}>
                        {cards.map((card, index) => (
                            <Card
                                key={index}
                                priority={card.priority}
                                title={card.title}
                                checklistItems={card.checklistItems}
                                dueDate={card.dueDate}
                                vp={card.vp}
                                isCollapsed={progressCollapse}
                                onMoveToBacklog={() => console.log('Move to backlog')}
                                onMoveToInProgress={() => console.log('Move to in progress')}
                                onMoveToDone={() => console.log('Move to done')}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.done}>
                    <div className={styles.headingSection}>
                        <p className={styles.heading}>Done</p>
                        <img src={collapseIcon} alt='collapse_icon' className={styles.collapse} onClick={toggleDoneCollapse} />
                    </div>
                    <div className={styles.cardContainer}>
                        {cards.map((card, index) => (
                            <Card
                                key={index}
                                priority={card.priority}
                                title={card.title}
                                checklistItems={card.checklistItems}
                                dueDate={card.dueDate}
                                vp={card.vp}
                                isCollapsed={doneCollapse}
                                onMoveToBacklog={() => console.log('Move to backlog')}
                                onMoveToInProgress={() => console.log('Move to in progress')}
                                onMoveToDone={() => console.log('Move to done')}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {popup && <Popup onClose={handleClose} onSave={handleSavePopup} />}
        </div>
    );
}

export default Board;
