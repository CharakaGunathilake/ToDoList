import PropsType from "prop-types";
import styles from "./ticket.module.css";

function Ticket({
  index,
  task,
  taskList,
  handleDeleteTask,
  handleStartTask,
  handleCompleteTask,
  handleMoveTaskUp,
  handleMoveTaskDown,
}) {
  const todoTicket = (
    <div className={styles.ticket}>
      <span>
        {task.name}: {task.description}
      </span>
      <div className={styles.hiddenButton}>
        <button
          className={styles.hiddenButton}
          type="button"
          title="Start Task"
          onClick={() => handleStartTask(index, "up")}
        >
          📈
        </button>
        <button
          className={styles.hiddenButton}
          type="button"
          title="Complete Task"
          onClick={() => handleCompleteTask(index)}
        >
          ✅
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
      </div>
    </div>
  );

  const onGoingTicket = (
    <div className={styles.ticket}>
      <span>{task.name} </span>
      <div className={styles.hiddenButton}>
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
      </div>
    </div>
  );

  const doneTicket = (
    <div className={styles.ticket}>
      <span>{task.name} </span>
    </div>
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
  task: PropsType.object,
  taskList: PropsType.array,
  handleDeleteTask: PropsType.func,
  handleStartTask: PropsType.func,
  handleCompleteTask: PropsType.func,
  handleMoveTaskUp: PropsType.func,
  handleMoveTaskDown: PropsType.func,
};
export default Ticket;
