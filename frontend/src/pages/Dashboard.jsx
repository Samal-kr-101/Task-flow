import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../services/api";

import Navbar from "../components/Navbar";
import Greeting from "../components/Greeting";
import Stats from "../components/Stats";
import TaskChart from "../components/TaskChart";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // =========================
  // Load Tasks
  // =========================

  const loadTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data.tasks);
    } catch (error) {
      toast.error("Unable to load tasks");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // =========================
  // Add Task
  // =========================

  const addTask = async (task) => {
    try {
      const res = await api.post("/tasks", task);

      setTasks((prev) => [res.data.task, ...prev]);

      toast.success("Task Added");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Task Creation Failed"
      );
    }
  };

  // =========================
  // Delete Task
  // =========================

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);

      setTasks((prev) =>
        prev.filter((task) => task._id !== id)
      );

      toast.success("Task Deleted");
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  // =========================
  // Update Task
  // =========================

  const updateTask = async (updatedTask) => {
    try {
      const res = await api.put(
        `/tasks/${editingTask._id}`,
        updatedTask
      );

      setTasks((prev) =>
        prev.map((task) =>
          task._id === editingTask._id
            ? res.data.task
            : task
        )
      );

      toast.success("Task Updated");

      setEditingTask(null);
    } catch (error) {
      toast.error("Update Failed");
    }
  };

  // =========================
  // Toggle Task
  // =========================

  const toggleTask = async (task) => {
    try {
      const res = await api.put(`/tasks/${task._id}`, {
        title: task.title,
        description: task.description,
        completed: !task.completed,
      });

      setTasks((prev) =>
        prev.map((t) =>
          t._id === task._id
            ? res.data.task
            : t
        )
      );

      toast.success("Task Updated");
    } catch (error) {
      toast.error("Unable to update task");
    }
  };

  // =========================
  // Search + Filter
  // =========================

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      task.description
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all"
        ? true
        : filter === "completed"
        ? task.completed
        : !task.completed;

    return matchesSearch && matchesFilter;
  });

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks =
    tasks.length - completedTasks;

  return (
    <>
      <Navbar />

      <main className="dashboard">

        <div className="container">

          {/* Greeting */}

          <Greeting />

          {/* Header */}

          <section className="dashboard-header">

            <h1 className="dashboard-title">
              Welcome Back 👋
            </h1>

            <p className="dashboard-subtitle">
              Manage your daily work efficiently.
            </p>

          </section>

          {/* Stats */}

          <Stats tasks={tasks} />

          {/* Analytics */}

          <div className="dashboard-row">

            <TaskChart tasks={tasks} />

            <div className="analytics-card">

              <h3>Quick Summary</h3>

              <p>
                📋 Total Tasks
                <strong>{tasks.length}</strong>
              </p>

              <p>
                ✅ Completed
                <strong>{completedTasks}</strong>
              </p>

              <p>
                ⏳ Pending
                <strong>{pendingTasks}</strong>
              </p>

            </div>

          </div>

          {/* Task Form */}

          <section className="task-form-section">

            <TaskForm
              editingTask={editingTask}
              onSubmit={
                editingTask
                  ? updateTask
                  : addTask
              }
              search={search}
              setSearch={setSearch}
              filter={filter}
              setFilter={setFilter}
            />

          </section>

          {/* Tasks */}

          <section className="task-list-section">

            <div className="section-header">

              <h2 className="section-title">
                Your Tasks
              </h2>

              <span className="task-count">
                {filteredTasks.length} Tasks
              </span>

            </div>

            {filteredTasks.length === 0 ? (

              <div className="empty-state">

                <h2>No Tasks Found</h2>

                <p>
                  Try changing the filter or create a new task.
                </p>

              </div>

            ) : (

              <div className="task-grid">

                {filteredTasks.map((task) => (

                  <TaskCard
                    key={task._id}
                    task={task}
                    onDelete={deleteTask}
                    onEdit={setEditingTask}
                    onToggle={toggleTask}
                  />

                ))}

              </div>

            )}

          </section>

        </div>

      </main>
    </>
  );
}

export default Dashboard;