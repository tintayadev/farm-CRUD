import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios'

function TaskForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const params = useParams()
    const navigate = useNavigate()
    
    // Using vanilla
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
        
    //     const res = await fetch('http://localhost:8000/api/tasks',{
    //     method: 'POST',
    //     body: JSON.stringify({
    //         title,
    //         description
    //     }),
    //     headers: {
    //         'Content-type': 'application/json'
    //     }
    // })
    // const data = await res.json()

    // Using axios
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!params.id){
                // crea el task
                const res = await axios.post("http://localhost:8000/api/tasks", {
                    title,
                    description
                });
                console.log(res);
            }else {
                // actualiza el task
                const res = await axios.put(
                    `http://localhost:8000/api/tasks/${params.id}`,
                    {
                        title,
                        description
                    }
                );
                console.log(res)
            }
            navigate("/");
        } catch (error) {
            console.log(error)
        }
        e.target.reset();
    };

    useEffect(() => {
        if(params.id){
            fetchTask()
        }

        async function fetchTask() {
            const res = await axios.get(`http://localhost:8000/api/tasks/${params.id}`)
            setTitle(res.data.title)
            setDescription(res.data.description)
        }
    }, [])


    return (
        <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
            <div>
            <form className="bg-zinc-950 p-10" onSubmit={handleSubmit}>
                <h1
                    className="text-3xl font-bold my-4"
                    >
                        {params.id ? "Update Task": "Create Task"}
                    </h1>
                <input
                    type="text"
                    placeholder="title"
                    className="block py-2 px-3 mb-4 w-full text-black"
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                    value={title}
                />
                <textarea
                    placeholder="description"
                    className="block py-2 px-3 mb-4 w-full text-black"
                    rows={3}
                    onChange={(e) => setDescription(e.target.value)}
                    value = {description}
                ></textarea>
                <button
                    className="bg-white hover:bg-slate-800 hover:text-white text-slate-800 py-2 px-4 rounded"
                >
                    {params.id ? "Update Task" : "Create Task"}
                </button>
            </form>

            {params.id && (
                <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded mt-5"
                onClick={async () => {
                    try {
                        const res = await axios.delete(
                            `http://localhost:8000/api/tasks/${params.id}`
                        );
                        console.log(res);
                        navigate("/");
                    } catch (error) {
                        console.log(error);
                    }
                }}
                >
                    Delete
                </button>
            )}

            </div>
        </div>
    );
}

export default TaskForm;
