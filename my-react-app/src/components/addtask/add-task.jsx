import PropTypes from "prop-types";
import styles from "./add-task.module.css";

function AddTask({
  task,
  handleAddTask,
  handleTaskOnChange,
  handleDescriptionOnchange,
}) {
  return (
    <div>
      <h1 className={styles.title}>TO DO LIST</h1>
      <div className={styles.addTask}>
        <input
          className={styles.input}
          type="text"
          value={task.name}
          placeholder="Enter a task"
          onChange={(e) => handleTaskOnChange(e)}
        />
        <button disabled={task.name === ""} onClick={handleAddTask}>
          Add Task
        </button>
      </div>
      <br />
      <textarea
        className={styles.textarea}
        value={task.description}
        placeholder="Add a description"
        onChange={(e) => handleDescriptionOnchange(e)}
        hidden={task.name === ""}
      />
    </div>
  );
}

AddTask.propTypes = {
  task: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  handleAddTask: PropTypes.func.isRequired,
  handleDescriptionOnchange: PropTypes.func.isRequired,
  handleTaskOnChange: PropTypes.func.isRequired,
};

export default AddTask;
