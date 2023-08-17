function TaskList({tasks}) {
    return (
        <div className="grid grid-cols-3 gap-4">
            {tasks.map(task => (
                <div key={task._id} className="bg-zinc-950 p-4 hover:cursor-pointer hover:bg-gray-600">
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                </div>
            ))}
        </div>
    );
}

export default TaskList;
