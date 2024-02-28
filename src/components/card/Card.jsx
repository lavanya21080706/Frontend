import { useState ,useEffect} from 'react';
import styles from './Card.module.css';
import dots from '../../assets/images/dots.png';
import down from '../../assets/images/down.png';
import up from '../../assets/images/up.png';
import DeletePopup from '../delete/DeletePopup';

function Card({ priority, title, checklistItems, dueDate, vp, isCollapsed,onMoveToBacklog, onMoveToInProgress, onMoveToDone, updateChecklist }) {
    const formattedDueDate = dueDate ? formatDate(dueDate) : null;
    const [showChecklist, setShowChecklist] = useState(false);
    const [arrowImage, setArrowImage] = useState(down);
    const [checkedCount, setCheckedCount] = useState(0); // State to keep track of checked checkboxes count
    const [manuallyChecked, setManuallyChecked] = useState(new Set());
    const [showOptions, setShowOptions] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [shareableLink, setShareableLink] = useState('');
    
    useEffect(() => {
        if (isCollapsed) {
            setShowChecklist(false);
            setArrowImage(down);
        }
    }, [isCollapsed]);

    useEffect(() => {
        let initialCheckedCount = 0;
        checklistItems.forEach(item => {
            if (vp.includes(item)) {
                initialCheckedCount++;
                  // Add to manuallyChecked set if it's not in vp array
                  if (!vp.includes(item)) {
                    setManuallyChecked(prev => new Set([...prev, item]));
                }
            }
        });
        setCheckedCount(initialCheckedCount);
    }, [checklistItems, vp]);

    useEffect(() => {
        generateShareableLink();
    }, []);

      // Function to generate the shareable link
      const generateShareableLink = () => {
        // Here, you can use any method to generate a unique link for this card
        const link = `https://protaskmanage.com/card/${Math.random().toString(36).substring(7)}`;
        setShareableLink(link);
    };

    const handleShare = () => {
        // Here, you can implement sharing logic such as copying link to clipboard or showing a share modal
        // For simplicity, let's just log the link to console
        console.log(shareableLink);
    };

    const toggleChecklist = () => {
        setShowChecklist(!showChecklist);
        setArrowImage(showChecklist ? down : up);
    };
    // const toggleChecklist = () => {
    //     setShowChecklist(prevShowChecklist => !prevShowChecklist);
    //     setArrowImage(prevArrowImage => prevShowChecklist ? down : up);
    // };


    
      const handleDelete = () => {
        // Perform delete operation here
        setShowDeletePopup(false); // Hide delete popup after deletion
      };
    
      const handleCancelDelete = () => {
        setShowDeletePopup(false); // Hide delete popup if cancelled
      };

    const handleOptionClick = (option) => {
        // Handle option click here
        console.log(option);
        if (option === 'Delete') {
            setShowOptions(false); 
            setShowDeletePopup(true); // Show delete popup when delete option is clicked
          }
    };
    
    
        const handleCheckboxChange = (item) => {
        const isChecked = vp.includes(item); // Check if the item is in the vp array
        if (!isChecked && !manuallyChecked.has(item)) {
            // Add to manuallyChecked set if it's not in vp array and not already manually checked
            setManuallyChecked(prev => new Set([...prev, item]));
            setCheckedCount(prev => prev + 1);
        } else if (isChecked && manuallyChecked.has(item)) {
            // Remove from manuallyChecked set if it's in vp array and manually checked
            setManuallyChecked(prev => {
                const newSet = new Set(prev);
                newSet.delete(item);
                return newSet;
            });
            setCheckedCount(prev => prev - 1);
        } else if (isChecked && !manuallyChecked.has(item)) {
            // If it's in vp array but not manually checked, do nothing
            return;
        } else {
            // If it's not in vp array and already manually checked, remove from manuallyChecked and update count
            setManuallyChecked(prev => {
                const newSet = new Set(prev);
                newSet.delete(item);
                return newSet;
            });
            setCheckedCount(prev => prev - 1);
        }
        updateChecklist(isChecked ? checkedCount : checkedCount + 1);
    };
    
    
    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };
  
    function formatDate(date) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const day = date.getDate();
        let daySuffix;

        if (day === 1 || day === 21 || day === 31) {
            daySuffix = 'st';
        } else if (day === 2 || day === 22) {
            daySuffix = 'nd';
        } else if (day === 3 || day === 23) {
            daySuffix = 'rd';
        } else {
            daySuffix = 'th';
        }

        return `${months[date.getMonth()]} ${day}${daySuffix}`;
    }

    let colorClass;
    switch (priority.toLowerCase()) {
        case 'high':
            colorClass = styles.highPriorityColor;
            break;
        case 'moderate':
            colorClass = styles.moderatePriorityColor;
            break;
        case 'low':
            colorClass = styles.lowPriorityColor;
            break;
        default:
            colorClass = '';
    }

    // Determine if the due date has passed
    const isDueDatePassed = dueDate ? dueDate < new Date() : false;

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
            {showOptions && (
                <div className={styles.optionsContainer}>
                    <div className={styles.options}>
                        <div onClick={() => handleOptionClick('Edit')} className={styles.edit}>Edit</div>
                        <div onClick={handleShare} className={styles.share}>Share</div>
                        <div onClick={() => handleOptionClick('Delete')} className={styles.delete}>Delete</div>
                    </div>
                    </div>
                )}
                <div className={`${styles.color} ${colorClass}`}></div>
                <span className={styles.priority}>{priority.toUpperCase()} PRIORITY</span>
                <img src={dots} alt='dots_icon' className={styles.dots} onClick={toggleOptions} />
               
            </div>
           
            <span className={styles.title}>{title}</span>
            <div className={styles.checklist}>
                <div className={styles.arrow}>
                    <p className={styles.checklistTitle}>Checklist ({checkedCount}/{checklistItems.length})</p>
                    <div>
                        <img src={arrowImage} alt='down_arrow_icon' className={styles.down} onClick={toggleChecklist} />
                    </div>
                </div>
                {showChecklist && (
                    <div className={styles.checklistItems}>
                        {checklistItems.map((item, index) => {
                            const isChecked = vp.includes(item);
                            return (
                                <div key={index} className={styles.inputfieldsBox}>
                                    <input
                                        type="checkbox"
                                        className={styles.checkBox}
                                        id={`checkbox-${index}`}
                                        onChange={() => handleCheckboxChange(item)}
                                        checked={isChecked || manuallyChecked.has(item)}
                                    />
                                    <input
                                        type='text'
                                        value={item}
                                        className={styles.input}
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <div className={styles.cardFooter}>
                {formattedDueDate && (
                    <button className={`${styles.dueDate} ${isDueDatePassed ? styles.dueDateRed : ''}`}>
                        {formattedDueDate}
                    </button>
                )}
                <div className={styles.sectionButtons}>
                    <button onClick={onMoveToBacklog} className={styles.backlog}>Backlog</button>
                    <button onClick={onMoveToInProgress} className={styles.inProgress}>Progress</button>
                    <button onClick={onMoveToDone} className={styles.done}>Done</button>
                </div>
            </div>

            {showDeletePopup && <DeletePopup onCancel={handleCancelDelete} onDelete={handleDelete}/>}

            {shareableLink && (
                    <>
                        <input type="text" value={shareableLink} readOnly />
                    </>
                )}
        </div>
    );
}

export default Card;
