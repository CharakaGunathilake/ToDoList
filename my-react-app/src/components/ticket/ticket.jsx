import PropsType from "prop-types";

function Ticket({
  index,
  editable,
  task,
  taskList,
  handleTaskRename,
  handleDeleteTask,
  handleEditTask,
  handleStartTask,
  handleCompleteTask,
  handleMoveTaskUp,
  handleMoveTaskDown,
}) {
  const inputField = (
    <input
      type="text"
      value={task.name}
      onChange={(e) => {
        handleTaskRename(e, index);
      }}
      autoFocus
    />
  );

  const todoTicket = (
    <>
      <span>{!editable ? task.name : inputField} </span>
      <button
        type="button"
        title="Start Task"
        onClick={() => handleStartTask(index, "up")}
      >
        📈
      </button>
      <button
        type="button"
        title="Complete Task"
        onClick={() => handleCompleteTask(index)}
      >
        ✅
      </button>
      <button type="button" title="Edit" onClick={handleEditTask}>
        ✍️
      </button>
      {index > 0 && (
        <button
          type="button"
          title="Move Up"
          onClick={() => handleMoveTaskUp(index)}
        >
          ☝️
        </button>
      )}
      {index < taskList.length - 1 && (
        <button
          type="button"
          title="Move Down"
          onClick={() => handleMoveTaskDown(index)}
        >
          👇
        </button>
      )}
      <button
        type="button"
        title="Delete"
        onClick={() => handleDeleteTask(index)}
      >
        ❌
      </button>
    </>
  );

  const onGoingTicket = (
    <>
      <span>{task.name} </span>
      <button
        type="button"
        title="Start Task"
        onClick={() => handleStartTask(index, "down")}
      >
        📉
      </button>
      <button
        type="button"
        title="Complete Task"
        onClick={() => handleCompleteTask(index)}
      >
        ✅
      </button>
    </>
  );

  const doneTicket = (
    <>
      <span>{task.name} </span>
    </>
  );

  if (task.status === "todo") {
    return todoTicket;
  }
  if (task.status === "ongoing") {
    return onGoingTicket;
  }
  if (task.status === "done") {
    return doneTicket;
  }
}
Ticket.propTypes = {
  index: PropsType.number,
  editable: PropsType.bool,
  task: PropsType.object,
  taskList: PropsType.array,
  handleTaskRename: PropsType.func,
  handleDeleteTask: PropsType.func,
  handleEditTask: PropsType.func,
  handleStartTask: PropsType.func,
  handleCompleteTask: PropsType.func,
  handleMoveTaskUp: PropsType.func,
  handleMoveTaskDown: PropsType.func,
};
export default Ticket;
