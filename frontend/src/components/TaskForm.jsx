import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

function TaskForm({
  onSubmit,
  editingTask,
  search,
  setSearch,
  filter,
  setFilter,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    onSubmit({
      title,
      description,
    });

    if (!editingTask) {
      setTitle("");
      setDescription("");
    }
  };

  return (
    <>
      {/* Search & Filter */}
      <div className="toolbar">

        <input
          className="search-input"
          type="text"
          placeholder="🔍 Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="filter-buttons">

          <button
            className={filter === "all" ? "active-filter" : ""}
            onClick={() => setFilter("all")}
            type="button"
          >
            All
          </button>

          <button
            className={filter === "completed" ? "active-filter" : ""}
            onClick={() => setFilter("completed")}
            type="button"
          >
            Completed
          </button>

          <button
            className={filter === "pending" ? "active-filter" : ""}
            onClick={() => setFilter("pending")}
            type="button"
          >
            Pending
          </button>

        </div>

      </div>

      {/* Form */}
      <form className="task-form" onSubmit={handleSubmit}>

        <h2 className="form-title">
          {editingTask ? "Edit Task" : "Create New Task"}
        </h2>

        <input
          type="text"
          placeholder="Enter task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          rows="4"
          placeholder="Enter task description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="add-btn">
          <FaPlus />
          {editingTask ? " Update Task" : " Add Task"}
        </button>

      </form>
    </>
  );
}

export default TaskForm;