import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import styles from './Popup.module.css';
import MyCalendar from '../calendar/MyCalender';
// import Card from '../../card/Card';


function PopUp({ onClose , onSave}) { 
    const [valueinput, setValueInput] = useState(null);
    // let valueinput;
    const [checkedCount, setCheckedCount] = useState(0);
    const [inputFields, setInputFields] = useState([]);
    const [selectedDueDate, setSelectedDueDate] = useState(null); // State to store the selected due date
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedPriority, setSelectedPriority] = useState(null);
    
       // Function to handle showing the calendar
       const handleShowCalendar = () => {
        setShowCalendar(true);
    };

    // Function to handle selecting priority
const handleSelectPriority = (priority) => {
    setSelectedPriority(priority);
};


const handleSavePopup = () => {
    // Gather data entered by the user
    const taskTitle = inputFields[0].value; 
    const priority = selectedPriority;
    const checkedInputFields = inputFields.filter(field => field.checked); // Filter out checked input fields
    const checklist = checkedInputFields.map(field => field.value); 
    const checklistItems = inputFields.map(field => field.value);
    const dueDate = selectedDueDate;
    const vp = checklist;

    // Create an object with the collected data
    const newData = {
        title: taskTitle, 
        priority,
        checklistItems,
        dueDate,
        vp
    };
    // Call the onSave function with the collected data
    onSave(newData);

    // Close the Popup
    onClose();
};


    const handleSelectDueDate = (date) => {
        setSelectedDueDate(date); // Update the selected due date
        setShowCalendar(false); // Hide the calendar after selecting the due date
    };

    // Function to handle adding input fields
    const addInputField = () => {
        const newInputFields = [
            ...inputFields,
            { id: inputFields.length + 1, value: '', checked: false },
        ];
        setInputFields(newInputFields);
    };

    // Function to handle changing input field value
    const handleChange = (id, event) => {
        const newInputFields = inputFields.map(field => {
            if (field.id === id) {
                return { ...field, value: event.target.value };
            }
            return field;
        });
        setInputFields(newInputFields);
    };

    // Function to handle checkbox change
  // Function to handle checkbox change
const handleCheckboxChange = (id, checked) => {
    const newInputFields = inputFields.map(field => {
        if (field.id === id) {
            return { ...field, checked };
        }
        return field;
    });
    setInputFields(newInputFields);
    setCheckedCount(newInputFields.filter(field => field.checked).length);
    if (checked) {
        const inputValue = getInputFieldValueById(id); // Retrieve value of the input field with the given ID
        setValueInput(inputValue);
    }
};


    function getInputFieldValueById(id){
        const inputField = inputFields.find(field => field.id === id);
        if (inputField) {
            return inputField.value;
        }
        return null; // Return null if input field with given ID is not found
    };


    // Function to handle deleting input field
    const handleDelete = id => {
        const newInputFields = inputFields.filter(field => field.id !== id);
        setInputFields(newInputFields);
        setCheckedCount(newInputFields.filter(field => field.checked).length);
    };

    // Function to handle closing the popup
    const handleClosePopup = () => {
        onClose(); // Call onClose function passed as prop
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.popup_container}>
                <span className={styles.title}>Title<span className={styles.asterisk}>*</span></span>
                <input type='text' placeholder='Enter Task Title' className={styles.taskTitle} />
                <div className={styles.priorityBox}>
                    <span className={styles.priority}>Select Priority<span className={styles.asterisk}>*</span></span>
                    <div className={`${styles.prior} ${selectedPriority === 'high' && styles.selectedPrior}`} onClick={() => handleSelectPriority('high')}>
                        <span className={styles.highPriority}></span>
                        <span className={styles.hp}>HIGH PRIORITY</span>
                    </div>
                    <div className={`${styles.prior} ${selectedPriority === 'moderate' && styles.selectedPrior}`} onClick={() => handleSelectPriority('moderate')}>
                        <span className={styles.mp}></span>
                        <span className={styles.hp}>MODERATE PRIORITY</span>
                    </div>
                    <div className={`${styles.prior} ${selectedPriority === 'low' && styles.selectedPrior}`} onClick={() => handleSelectPriority('low')}>
                        <span className={styles.lp}></span>
                        <span className={styles.hp}>LOW PRIORITY</span>
                    </div>
                </div>     
                <div className={styles.checklist}>Checklist ({checkedCount}/{inputFields.length})<span className={styles.asterisk}>*</span></div>
                <div className={styles.inputContainer}>
                    {inputFields.length > 3 ? (
                        <div className={styles.inputContainerScroll}>
                            {inputFields.map(field => (
                                <div key={field.id} className={styles.inputfieldsBox}>
                                    <input
                                        type="checkbox"
                                        checked={field.checked}
                                        onChange={e => handleCheckboxChange(field.id, e.target.checked)}
                                        className={styles.checkBox}
                                    />
                                    <input
                                        type='text'
                                        placeholder='Add a task'
                                        value={field.value}
                                        onChange={e => handleChange(field.id, e)}
                                        className={styles.input}
                                    />
                                    <FaTrash onClick={() => handleDelete(field.id)} className={styles.dltIcon} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        inputFields.map(field => (
                            <div key={field.id} className={styles.inputfieldsBox}>
                                <input
                                    type="checkbox"
                                    checked={field.checked}
                                    onChange={e => handleCheckboxChange(field.id, e.target.checked)}
                                    className={styles.checkBox}
                                />
                                <input
                                    type='text'
                                    placeholder='Add a task'
                                    value={field.value}
                                    onChange={e => handleChange(field.id, e)}
                                    className={styles.input}
                                />
                                <FaTrash onClick={() => handleDelete(field.id)} className={styles.dltIcon} />
                            </div>
                        ))
                    )}
                </div>
                <span onClick={addInputField} className={styles.add}>+ Add New</span>
                <div className={styles.buttons}>
                    {/* <button className={styles.date} onClick={handleShowCalendar}>Select Due Date</button> */}
                    <button className={styles.date} onClick={() => setShowCalendar(true)}>
                        {selectedDueDate ? selectedDueDate.toLocaleDateString('en-US') : "Select Due Date"}
                    </button>
                    <div>
                        <button className={styles.cancel} onClick={handleClosePopup}>Cancel</button>
                        <button className={styles.save} onClick={handleSavePopup}>Save</button>
                    </div>
                </div>
                {showCalendar && (
                    <div className={styles.calendar_container}>
                        <div className={styles.calendar_wrapper}>
                            <MyCalendar onSelectDueDate={handleSelectDueDate} selectedDate={selectedDueDate} />
                        </div>
                    </div>
                )}
                </div>
        </div>
    );
}

export default PopUp;

