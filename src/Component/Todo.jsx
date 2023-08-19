import React, { useEffect, useState } from 'react'
import axios from 'axios'


const Todo = () => {
    // const [tasks, setTasks] = useState([]);
    // const [newTask, setNewTask] = useState("");
    // const [completed, setCompleted] = useState(false);
    // const [filter, setFilter] = useState('all')
    // const [taskStatus, setTaskStatus] = useState('ongoing')



    // const fetchTasks = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:3001/api/tasks');
    //         setTasks(response.data);
    //     } catch (error) {
    //         console.error("Error fetching tasks:", error);
    //     }
    // };

    // const addTask = () => {
    //     if (newTask.trim() !== '') {
    //       setTasks([...tasks, { description: newTask, completed: taskStatus === 'completed' }]);
    //       setNewTask('');
    //     }
    //   };

    // const deleteTask = async (taskId) => {
    //     try {
    //         await axios.delete('http://localhost:3001/api/tasks');
    //         fetchTasks();
    //     } catch (error) {
    //         console.error('Error deleting task:', error);
    //     }
    // };

    // const toggleTaskCompletion = (index) => {
    //     const updatedTasks = [...tasks];
    //     updatedTasks[index].completed = !updatedTasks[index].completed;
    //     setTasks(updatedTasks);
    // }

    // const filteredTasks = tasks.filter((task) => {
    //     if (filter === 'all') return true;
    //     if (filter === 'completed') return task.completed;
    //     if (filter === 'incomplete') return !task.completed;
    //     return true;
    // })

    // useEffect(() => {
    //     fetchTasks();
    // }, []);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [filter, setFilter] = useState('all');
    const [taskStatus, setTaskStatus] = useState('ongoing');

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const addTask = async () => {
        if (newTask.trim() !== '') {
            try {
                const response = await axios.post('http://localhost:3001/api/tasks', {
                    description: newTask,
                    completed: taskStatus === 'completed',
                });
                const newTaskData = response.data;
                setTasks([...tasks, newTaskData]);
                setNewTask('');
            } catch (error) {
                console.error('Error adding task:', error);
            }
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`http://localhost:3001/api/tasks/${taskId}`);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const toggleTaskCompletion = async (taskId) => {
        try {
            await axios.put(`http://localhost:3001/api/tasks/${taskId}`, {
                completed: !tasks.find((task) => task._id === taskId).completed,
            });
            fetchTasks();
        } catch (error) {
            console.error('Error toggling task completion:', error);
        }
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'all') return true;
        if (filter === 'completed') return task.completed;
        if (filter === 'incomplete') return !task.completed;
        return true;
    });

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <h1>Todo List</h1>
            <div>
                <input
                    type="text"
                    placeholder="Task description"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button onClick={addTask}>Add Task</button>
            </div>
            <div>
                Filter:
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('completed')}>Completed</button>
                <button onClick={() => setFilter('incomplete')}>Incomplete</button>
            </div>
            <ul>
                {filteredTasks.map((task) => (
                    <li key={task._id}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTaskCompletion(task._id_)}
                        />
                        {task.completed ?
                            <del>{task.description}</del>
                            :
                            task.description
                        }
                        <button onClick={() => deleteTask(task._id)}>Delete</button>
                    </li>


                ))}

            </ul>
        </div>
    );
}

export default Todo