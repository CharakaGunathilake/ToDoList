/* eslint-disable no-unused-vars */
import { useState, useRef } from "react";
import Ticket from "../components/ticket/ticket";
import AddTask from "../components/addtask/add-task";

export default function ToDoList() {
  const columnRef = useRef(["todo", "ongoing", "done"]);
  const descriptionRef = useRef("");
  const [editable, setEditable] = useState(false);
  const [task, setTask] = useState({
    name: "",
    description: "",
    status: "",
  });

  const [taskList, setTaskList] = useState([
    { name: "eat", description: "eat", status: "todo" },
    { name: "sleep", description: "sleep", status: "todo" },
  ]);

  const handleTaskOnChange = (e) => {
    setTask((task) => {
      return {
        ...task,
        name: e.target.value,
        description: descriptionRef.current,
        status: "todo",
      };
    });
  };

  const handleDescriptionOnChange = (e) => {
    const value = e.target.value;
    if (value.length > 40) {
      console.error("Description must be 40 characters or fewer.");
      return;
    }
    setTask((task) => {
      return {
        ...task,
        description: value,
      };
    });
  };

  const handleAddTask = () => {
    setTaskList((taskList) => {
      const updatedTaskList = [...taskList, task];
      setTask({ name: "", description: "", status: "todo" });
      return updatedTaskList;
    });
  };

  const handleTaskRename = (e, index) => {
    setTaskList((prev) => {
      const updatedTaskList = [...prev];
      updatedTaskList[index].name = e.target.value;
      return updatedTaskList;
    });
  };
  const handleCompleteTask = (index) => {
    setTaskList((prevTaskList) => {
      const updatedTaskList = [...prevTaskList];
      updatedTaskList[index].status = "done";
      return updatedTaskList;
    });
  };
  const handleStartTask = (index, progress) => {
    setTaskList((prevTaskList) => {
      const updatedTaskList = [...prevTaskList]; // Create a copy of the task list
      const task = updatedTaskList[index]; // Get the task at the specified index
      if (progress === "up") {
        task.status = "ongoing"; // Change status to "ongoing"
      } else if (progress === "down") {
        task.status = "todo"; // Change status to "todo"
      }

      return updatedTaskList; // Return the updated task list
    });
  };

  const handleDeleteTask = (index) => {
    setTaskList((taskList) => taskList.filter((_, id) => id !== index));
  };
  const handleEditTask = () => {
    setEditable((prev) => !prev);
  };
  const handleMoveTaskUp = (index) => {
    if (index > 0) {
      const updatedTaskList = [...taskList];
      const [movedTask] = updatedTaskList.splice(index, 1);
      updatedTaskList.splice(index - 1, 0, movedTask);
      setTaskList(updatedTaskList);
    }
  };
  const handleMoveTaskDown = (index) => {
    if (index < taskList.length - 1) {
      const updatedTaskList = [...taskList];
      const [movedTask] = updatedTaskList.splice(index, 1);
      updatedTaskList.splice(index + 1, 0, movedTask);
      setTaskList(updatedTaskList);
    }
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const index = e.dataTransfer.getData("index");
    handleMoveTaskUp(index);
  };

  const handleDragStartDown = (e, index) => {
    e.dataTransfer.setData("index", index);
  };
  const handleDragOverDown = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <AddTask
        task={task}
        handleDescriptionOnchange={(e) => handleDescriptionOnChange(e)}
        handleAddTask={handleAddTask}
        handleTaskOnChange={handleTaskOnChange}
      />
      <p>
        You have {taskList.filter((task) => task.status === "todo").length} of{" "}
        {taskList.length} Tasks to do
      </p>
      <p>
        You have {taskList.filter((task) => task.status === "ongoing").length}{" "}
        of {taskList.length} Tasks in progress
      </p>
      <p>
        You have {taskList.filter((task) => task.status === "done").length} of{" "}
        {taskList.length} completed Tasks
      </p>
      <div>
        <table id="taskTable" border="1">
          <thead>
            <tr>
              <th>To-Do</th>
              <th>On Going</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>
            {taskList.map((task, index) => {
              return (
                <tr
                  key={index}
                  onDrag={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  draggable
                >
                  {columnRef.current.map((column, colIndex) => {
                    return (
                      <td key={colIndex} onDragOver={handleDragOver} draggable>
                        {task.status === column && (
                          <Ticket
                            index={index}
                            editable={editable}
                            task={task}
                            taskList={taskList}
                            handleTaskRename={handleTaskRename}
                            handleEditTask={handleEditTask}
                            handleStartTask={handleStartTask}
                            handleCompleteTask={handleCompleteTask}
                            handleDeleteTask={handleDeleteTask}
                            handleMoveTaskUp={handleMoveTaskUp}
                            handleMoveTaskDown={handleMoveTaskDown}
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
