import React, { useState } from 'react';

function List({ listData }) {
    return (
        <div className='grid place-items-center'>
            <div className='flex bg-pink-200 align-middle justify-center w-[500px] rounded-3xl'>
                <ul className='justify-center grid place-items-center'>
                    {listData.map((listItem, index) => {
                        return (
                            <div key={index} className='flex'>
                                <li id={index.toString()} className='bg-purple-300 m-5 p-2 rounded-xl w-[200px] text-center' key={index}>{listItem}</li>
                                <input id={'cb'+index.toString()} className='w-8' type='checkbox'/>
                            </div>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default function Todo() {

    let lStorageData = [];
    for (let a = 0; a < localStorage.length; a++) {
        lStorageData.push(localStorage.getItem(a));
    }
    const [data, setData] = useState(lStorageData);

    const checkboxes = document.querySelectorAll('[id^="cb"]');

    checkboxes.forEach((checkbox) => {checkbox.checked = false;});

    function updateLocalStorage(data) {
        localStorage.clear();
        for (let b = 0; b < data.length; b++) {
            localStorage.setItem(b, data[b]);
        }
    }


    function addItem(data) {
        const inputField = document.getElementById('text-input');
        let inputText = inputField.value;
        if (inputText !== '') {
            console.log('inputText', inputText);
            const newData = [...data, inputText];
            console.log(newData);
            inputField.value = '';
            setData(newData);
            updateLocalStorage(newData);
        }
    }
    function changeItem(data) {
        console.log('data is:', data);
        const inputField = document.getElementById('text-input');
        let inputText = inputField.value;
        if (inputText !== '') {
            let newData = data.slice();
            const checkboxes = document.querySelectorAll('[id^="cb"]');
            checkboxes.forEach((checkbox) => {
                if (checkbox.checked) {
                    const idString = checkbox.id;
                    const index = idString.substring(2);
                    const listItem = document.getElementById(index);
                    listItem.innerText = inputText;
                    newData[parseInt(index)] = listItem.innerText;
                }
            });
            inputField.value = '';
            setData(newData);
            updateLocalStorage(newData);
        }
    }
    function removeItem(data) {
            const checkboxes = document.querySelectorAll('[id^="cb"]');
            let checkedCheckboxes = 0;
            let indicesToKeep = [];
            for (let i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    checkedCheckboxes++;
                } else {
                    indicesToKeep.push(i);
                }
            }
            if (checkedCheckboxes > 0) {
                let finalData = [];
                indicesToKeep.forEach((index) => finalData.push(data[index]));
                setData(finalData);
                updateLocalStorage(finalData);
            }
        }
    return (
        <div className='bg-purple-400 p-[60px]'>
            <div className='flex justify-evenly'>
                <button onClick={() => addItem(data)} className='bg-green-500 p-3 rounded-xl w-[150px] hover:bg-green-300'>
                    <span className='text-blue-700 font-bold text-2xl'>
                        Add
                    </span>
                </button>
                <button onClick={() => changeItem(data)} className='bg-yellow-300 p-3 rounded-xl w-[150px] hover:bg-yellow-200'>
                    <span className='text-blue-700 font-bold text-2xl'>
                        Change
                    </span>
                </button>
                <button onClick={() => removeItem(data)} className='bg-red-500 p-3 rounded-xl w-[150px] hover:bg-red-400'>
                    <span className='text-blue-700 font-bold text-2xl'>
                        Delete
                    </span>
                </button>
            </div>
            <div className='flex justify-evenly'>
                <input id='text-input' type='text' placeholder='Input:' className='border border-zinc-700 p-3 m-20 rounded-3xl w-[250px] text-center'/>
            </div>
            <div>
                <List listData={data} />
            </div>
        </div>
    );
}