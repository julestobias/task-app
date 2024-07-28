"use client"
import axiosUtil from "@/api/axiosUtil";
import React, {useEffect, useState} from "react";
import { v4 as uuid} from 'uuid';
import AddTaskPopup from "@/components/AddTaskPopup";

interface Task {
    id: string;
    taskName: string;
    description: string;
    dueDate: string;
    status: string;
}

interface HeaderProps {
    onAddTask: (newTask: Task) => Promise<void>;
}

const Header: React.FC<HeaderProps> = ({onAddTask}) => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => setIsPopupOpen(prev => !prev)


    return(
        <div className={'w-full flex items-center justify-between my-5'}>
            <div>
                <p className={'font-extrabold text-2xl'}>My Tasks</p>
                <p className={'text-sm'}>Drag and Drop the tasks to update its status</p>
            </div>
            <button
                className={'bg-green-500 py-1 px-3 font-semibold rounded-md text-md text-sm text-white'}
                onClick={togglePopup}
            >+ Add Task</button>
            <AddTaskPopup isOpen={isPopupOpen} onClose={togglePopup} onAddTask={onAddTask}/>
        </div>
    )
}

export default Header;