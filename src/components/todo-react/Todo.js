import React, { useState, useEffect } from 'react';
import './style.css';

const getLocalStorage = () => {
    const lists = localStorage.getItem("mytodolist");  // getItem() is used to get the data from the local Storage
    if(lists){
        return JSON.parse(lists);   // JSON.parse is used to convert the data obtained into array.
    }else{
        return [];
    }
}


function Todo() {
    const [inputdata, setInputData] = useState("");
    const [items, setItems] = useState(getLocalStorage());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);
  
   // Adding an Items to the list
    const addItems = () => {
        if (!inputdata) {
            alert('please fill the list');
        }
        else if(inputdata && toggleButton){
            setItems(
                items.map((currEle) => {
                   if(currEle.id === isEditItem){   // bcz in the isEditItem, we have id of item which is being edit.
                        return {...currEle, name: inputdata};    // only change the name of the edited item and the rest are the same
                   }        
                   return currEle;   // If the id is not same (means it is a new element), simply return the list.
                })
            ) 
            setInputData([]);           // It resets the input element.
            // setIsEditItem(null);        // It removes the edit item from the input
            setToggleButton(false);     // It removes the edit button from the input
        }   

        else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputdata
            }
            setItems([...items, myNewInputData]);
            setInputData("");
        }
        
    };
    
    // SET THE LOCAL STORAGE DATA.
    useEffect(() => {                                                // JSON.stringify() is used to convert the data into string.
       localStorage.setItem("mytodolist", JSON.stringify(items));   // localStorage helps in storing objects even after page refreshes
    }, [items])                                                      // It only accepts key-value(string) pair. // use only setItem() function
    

    // Deleting an item from the list
    const deleteItems = (index) => {
        const updatedItems = items.filter((currEle) =>{
            return currEle.id != index
        }) ;
        setItems(updatedItems);
    }
    
    // Edit the list items
    const editItem = (index) => {
       const item_todo_edited = items.find((currEle) => {
           return currEle.id === index
       })
       setInputData(item_todo_edited.name);
       setIsEditItem(index);            // To pass the id of the matched element.
       setToggleButton(true);           // To change the icon from addition to edit.
    }
    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="todologo" />
                        <figcaption>Add Your List Here ✌</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder='✍ Add Items' className='form-control' value={inputdata} onChange={(e) => setInputData(e.target.value)} />

                        {/* If toggleButton is on => then edit button will shown,  Otherwise add button is shown*/}
                        {toggleButton? <i className="fa fa-solid fa-edit add-btn" onClick={addItems}></i> : <i className="fa fa-solid fa-plus add-btn" onClick={addItems}></i> }
                    </div>

                    <div className="showItems">
                        {
                            items.map((currEle) => {
                                return (
                                    <div className="eachItem" key={currEle.id}>
                                        <h3>{currEle.name}</h3>
                                        <div className="todo-btn">
                                            <i className="far fa-solid fa-edit add-btn" onClick={() => editItem(currEle.id)}></i>
                                            <i className="far fa-solid fa-trash-alt add-btn" onClick={() => deleteItems(currEle.id)}></i>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="showItems">
                        <button className='btn effect04' data-sm-link-text="Remove All" onClick={() => setItems([])}>
                            <span>CheckList</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo