import axios from "axios";
import axiosUtil from "@/api/axiosUtil";
import EditTaskPopup from "@/components/EditTaskPopup";
import React, {useState} from "react";

interface Task {
    id: string;
    taskName: string;
    description: string;
    dueDate: string;
    status: string;
}

interface TaskCardProps {
    list: Task[];
    deleteTask: (id: string | undefined) => void;
    onEditTask: (id: string, updatedTask: { dueDate: string; description: string; taskName: string; }) => void;
    onDragStart: (e: React.DragEvent<HTMLDivElement>, item: Task) => void;
}
const TaskCard: React.FC<TaskCardProps> = ({list, deleteTask, onEditTask, onDragStart}) => {

    console.log("list on TaskCard Props",list)


    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null)

    const togglePopup = () => setIsPopupOpen(prev => !prev)

    const editTask = (id: string) => {
        const task = list?.find(item => item.id === id)
        if (task) {
            setTaskToEdit(task)
            setIsPopupOpen(true)
        }
    }

    return (
        <>
            {
                list?.map((item, index) => {

                    const bgColor = (
                        {
                            pending : "bg-amber-200",
                            inProgress : "bg-purple-200",
                            completed : "bg-green-200",
                            cancelled : "bg-red-200"
                        }
                    )[item?.status] ?? "bg-gray-200"

                    return (
                        <div
                            className={`h-auto ${bgColor} rounded-md p-4 relative w-full my-4 cursor-grab`}
                            key={index}
                            draggable
                            onDragStart={(e) => onDragStart(e, item)}
                        >
                            <p className={'font-bold mb-2'}>{item.taskName}</p>
                            <p className={'text-xs mb-5 leading-loose'}>{item?.description}</p>
                            <div className={'flex items-center justify-end'}>
                                <p className={'text-xs'}>Due date: </p>
                                <p className={'text-xs font-bold'}>{item.dueDate}</p>
                            </div>
                            <div
                                className={'absolute top-[-10px] right-[30px] bg-amber-600 p-2 rounded-full cursor-pointer'}
                                onClick={() => editTask(item.id)}
                            >
                                <img
                                    src="/pencil.png"
                                    alt="edit button"
                                    width={15}
                                    className={'filter invert brightness-100"'}
                                />
                            </div>
                            <EditTaskPopup isOpen={isPopupOpen} onClose={togglePopup} taskToEdit={taskToEdit} onEditTask={onEditTask}/>
                            <div
                                className={'absolute top-[-10px] right-[-3px] bg-red-600 p-2 rounded-full cursor-pointer'}
                                onClick={() => {
                                    if (item.id) {
                                        deleteTask(item?.id)
                                    }
                                }}
                            >
                                <img
                                    src="/delete.png"
                                    alt="delete button"
                                    width={15}
                                    className={'filter invert brightness-100"'}
                                />
                            </div>

                        </div>
                    )

                })
            }
        </>
    )
}

export default TaskCard;