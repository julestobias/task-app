"use client"
import TaskCard from "@/components/TaskCard";
import React, {useEffect, useState} from "react";
import axiosUtil from "@/api/axiosUtil";

interface Task {
    id: string;
    taskName: string;
    description: string;
    dueDate: string;
    status: string;
}
interface StatusCardProps {
    taskList: Task[];
    deleteTask: (id: string | undefined) => void;
    onEditTask: (id: string, updatedTask: { dueDate: string; description: string; taskName: string; }) => void;
}

const StatusCard: React.FC<StatusCardProps> = ({taskList, deleteTask, onEditTask}) => {

    // console.log(taskList)

    // const [tasks, setTasks] = useState<Task[]>(taskList)

    // console.log(tasks)

    const statusList = [
        {
            status: "pending",
            description: "Pending",
            bgColor: "bg-amber-300",
        },
        {
            status: "inProgress",
            description: "In Progress",
            bgColor: "bg-purple-300",
        },
        {
            status: "completed",
            description: "Completed",
            bgColor: "bg-green-300",
        },
        {
            status: "cancelled",
            description: "Cancelled",
            bgColor: "bg-red-300",
        },
    ]

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, task: Task) => {
        e?.dataTransfer.setData("task", JSON.stringify(task));
        e?.dataTransfer.setData("fromStatus", task?.status as string);
    }

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>, status: string) => {
        e.preventDefault();
        const task = JSON.parse(e?.dataTransfer.getData("task"))
        // const fromStatus = e?.dataTransfer.getData("fromStatus")

        if (task.status !== status) {
            const updatedTask = {...task, status};
            onEditTask(task?.id, updatedTask)
        }
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

    // useEffect(() => {
    //     console.log('Tasks:', tasks);
    // }, [tasks]);

    return (
        <div className={'grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'}>
            {
                statusList.map((item, index) => {

                    // console.log(tasks)
                    const filteredTasks: Task[] = (taskList || []).filter(item2 => item2?.status === item?.status)
                    console.log(`Filtering tasks for status ${item.status}:`, filteredTasks);

                    return (
                        <div
                        className={`w-fit flex flex-col ${item?.bgColor} p-5 rounded-lg w-full`}
                        key={index}
                        onDrop={(e) => handleDrop(e, item.status)}
                        onDragOver={handleDragOver}
                        >
                            <p className={'font-bold mb-3'}>{item?.description} Tasks</p>

                            {
                                filteredTasks?.length > 0
                                    ? <TaskCard list={filteredTasks} deleteTask={deleteTask} onEditTask={onEditTask} onDragStart={handleDragStart}/>
                                    :
                                    <div className={'flex items-center justify-center h-full'}>
                                        <p className={'text-center'}>There are
                                            no {item?.description} Tasks</p>
                                    </div>
                            }


                        </div>
                    )
                })
}
</div>

)
}

export default StatusCard;