import { useEffect, useState } from "react"
import axios from "axios";

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
        <>
            <h1 className='text-3xl font-bold'>HomePage</h1>

            {
                tasks.map(task => (
                    <div>
                        <h2>
                            {task.title}
                        </h2>
                        <p>{task.description}</p>
                    </div>
                ))
            }
        </>
        
    )
}

export default Homepage;