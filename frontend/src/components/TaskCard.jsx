import {
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaRegClock,
} from "react-icons/fa";

function TaskCard({
  task,
  onDelete,
  onEdit,
  onToggle,
}) {
  const createdDate = new Date(
    task.createdAt
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="task-card">

      <div className="card-top">

        <span
          className={
            task.completed
              ? "status completed"
              : "status pending"
          }
        >
          {task.completed ? (
            <>
              <FaCheckCircle /> Completed
            </>
          ) : (
            <>
              <FaRegClock /> Pending
            </>
          )}
        </span>

      </div>

      <h3 className="task-title">
        {task.title}
      </h3>

      <p className="task-description">
        {task.description}
      </p>

      <div className="task-footer">

        <small>
          📅 {createdDate}
        </small>

      </div>

      <div className="task-buttons">

        <button
          className="edit-btn"
          onClick={() => onEdit(task)}
        >
          <FaEdit />
          Edit
        </button>

        <button
          className="complete-btn"
          onClick={() => onToggle(task)}
        >
          {task.completed
            ? "Pending"
            : "Complete"}
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(task._id)}
        >
          <FaTrash />
          Delete
        </button>

      </div>

    </div>
  );
}

export default TaskCard;