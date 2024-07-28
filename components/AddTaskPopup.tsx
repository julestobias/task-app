import React, {useState} from "react";
import {v4 as uuid} from "uuid";
import axiosUtil from "@/api/axiosUtil";

interface AddTaskPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onAddTask: (newTask: {
        id: string;
        taskName: string;
        description: string;
        dueDate: string;
        status: string;
    }) => void;
}


const AddTaskPopup: React.FC<AddTaskPopupProps>  = ({isOpen, onClose, onAddTask}) => {

    const [dueDate, setDueDate] = useState("")
    const [description, setDescription] = useState("")
    const [taskName, setTaskName] = useState("")


   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newTask = {
            id: uuid(),
            taskName,
            description,
            dueDate,
            status: "pending"
        };
        onAddTask(newTask);
        onClose();
        setDueDate("");
        setDescription("");
        setTaskName("");
   }

    if (!isOpen) return null;

    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-lg relative max-w-md w-full transition-transform duration-300 transform ${isVisible ? 'scale-100' : 'scale-90'}"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
                    onClick={onClose}
                >
                    X
                </button>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="taskName" className="block text-gray-700 font-bold mb-2">Task Name</label>
                            <input
                                id="taskName"
                                type="text"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                                className="border rounded-lg w-full py-2 px-3 text-gray-700"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description"
                                   className="block text-gray-700 font-bold mb-2">Description</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="border rounded-lg w-full py-2 px-3 text-gray-700"
                                rows={4}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="dueDate" className="block text-gray-700 font-bold mb-2">Due Date</label>
                            <input
                                id="dueDate"
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="border rounded-lg w-full py-2 px-3 text-gray-700"
                                required
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            >
                                Add Task
                            </button>
                        </div>
                    </form>
            </div>
        </div>
    )
}

export default AddTaskPopup;