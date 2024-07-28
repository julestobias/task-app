"use client"
import StatusCard from "@/components/StatusCard";
import Header from "@/components/Header";
import {useEffect, useState} from "react";
import axiosUtil from "@/api/axiosUtil";

interface Task {
    id: string;
    taskName: string;
    description: string;
    dueDate: string;
    status: string;
}


const Home = () => {

    const [taskList, setTaskList] = useState<Task[]>([]);


    const getTaskList = async () => {
        try {
            const res = await axiosUtil.get('/taskList');
            console.log(res.data);
            setTaskList(res?.data)
        } catch (e) {
            console.error(e)
        }
    }

    const addTask = async (newTask: Task) => {
        try {
            await axiosUtil.post('/taskList', newTask);
            await getTaskList();
        } catch (e) {
            console.error(e)
        }
    }

    const deleteTask = async (id: string | undefined) => {
        try {
            await axiosUtil.delete(`/taskList/${id}`);
            await getTaskList();
        } catch (e) {
            console.error(e)
        }
    }

    const editTask = async (id: string, updatedTask: { dueDate: string; description: string; taskName: string; }) => {
        try {
            await axiosUtil.put(`/taskList/${id}`, updatedTask);
            await getTaskList();
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getTaskList();
    }, []);

  return (
      <div className={'mx-10 h-screen'}>
        <Header onAddTask={addTask}/>
        <StatusCard taskList={taskList} deleteTask={deleteTask} onEditTask={editTask}/>
      </div>
  )
}

export default Home;