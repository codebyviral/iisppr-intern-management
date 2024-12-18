import React, {useState} from "react";

function Task(){
    const[tasks, setTasks] =useState([
        {
            id: 1,
            title: "Website Redesign",
            description: "Redesign the company website to improve user experience.",
            deadline: "25th Oct",
            status: "In progress",
            isEditing: false,
        }, 
        {
            id: 2,
            title: "Social Media Campaign",
            description: "Launch a campaign for the new product line on social media platforms.",
            deadline: "30th Oct",
            status: "Pending",
            isEditing: false,
        }, 
        {
            id : 3,
            title: "Market Research",
            description: "Conduct market research to identify potential customers and competitors.",
            deadline: "15th Nov",
            status: "Completed",
            isEditing: false,
        }, 
    ]);

    const addNewTask = () =>{
        const newTask ={
            id: Date.now(),
            title :"New Task",
            description : "Describe your task here.",
            deadline : "TBD",
            status :"Pending",
            isEditing: true,
        };
        setTasks([...tasks, newTask]);
    };

    const toggleEdit = (id) => {
        setTasks(
            tasks.map((task) =>
            task.id ===id ? { ...task, isEditing: !task.isEditing} : task)
        );
    };

    const updateTask =(id, field, value) =>{
        setTasks (
            tasks.map((task) =>
            task.id === id ? {
                ...task, [field]: value } : task
            )
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Admin Task Management</h2>
                <div className="flex justify-end mb-4">
                    <button onClick={addNewTask} className="bg-blue-500 text-white px-4 py-2 rounded lg hover:bg-blue-600 transition">
                        Add New Task
                    </button>
                </div>
                {/* Task Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {tasks.map((task) =>(
                        <div key ={task.id}
                        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
                            {task.isEditing ? (<input type= "text" value={task.title} onChange={(e) => updateTask(task.id, "title", e.target.value)} 
                            className="text-lg font-semibold mb-2 border-b w-full focus:outline-none"/>
                            ):(
                                <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
                            )}
                            {task.isEditing ? (
                                <textarea value={task.description} onChange={(e)=> updateTask(task.id, "description", e.target.value)}
                                className="text-gray-700 mb-4 border w-full p-1 focus:outline-none"/>
                            ):(
                                <p className="text-gray-700 mb-4">{task.description}</p>
                            )}
                             {task.isEditing ? (
                                <input value={task.deadline} onChange={(e)=> updateTask(task.id, "deadline", e.target.value)}
                                className="text-sm text-gray-600 mb-2 border-b w-full p-1 focus:outline-none"/>
                            ):(
                                <p className="text-sm text-gray-600"><strong>Deadline:</strong> {task.deadline}</p>
                            )}
                            {task.isEditing ? (
                                <select value={task.status} onChange={(e)=> updateTask(task.id, "status", e.target.value)}
                                className="text-sm  mb-2 border focus:outline-none">
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                </select>
                            ):(
                                <p className={`text-sm font-semibold mt-2 ${task.status === "in Progress" ? "text-yellow-500" : task.status ==="Pending"
                                    ? "text-red-500" : "text-green-500"}`} >
                                        {task.status}
                                    </p>
                            )}

                            <div className="flex justify-between mt-4 text-blue-500 text-sm">
                                <button onClick={()=> toggleEdit(task.id)}>
                                {task.isEditing ? "Save" : "Edit"} 
                                </button>
                                <button>Attach</button>
                          
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
    }
export default Task;