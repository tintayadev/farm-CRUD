import { useEffect, useState } from "react";
import axios from "axios";
import TaskList from "../components/TaskList";

function Homepage() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function fetchTasks() {
            const res = await axios.get('http://localhost:8000/api/tasks')
            setTasks(res.data);
        }
        fetchTasks();

    }, []);

    return (
        
            <TaskList tasks={tasks}/>
        
        
    )
}

export default Homepage;