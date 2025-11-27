import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import toast from "react-hot-toast";
import { PlusCircle, Edit2, Trash2, Filter } from "lucide-react";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Pending",
    assignedTo: "",
    dueDate: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [filters, setFilters] = useState({ status: "", assignedTo: "" });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const fetchEmployees = async () => {
    try {
      const { data } = await API.get("/employees");
      setEmployees(data);
    } catch (error) {
      toast.error("Failed to fetch employees");
    }
  };

  const fetchTasks = async (params = {}) => {
    try {
      setFetching(true);
      const query = new URLSearchParams(params).toString();
      const url = query ? `/tasks?${query}` : "/tasks";
      const { data } = await API.get(url);
      setTasks(data);
    } catch (error) {
      toast.error("Failed to fetch tasks");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchTasks();
  }, []);

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      status: "Pending",
      assignedTo: "",
      dueDate: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, status, assignedTo, dueDate } = form;

    if (!title || !description || !status || !assignedTo || !dueDate) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const payload = { ...form };

      if (editingId) {
        await API.put(`/tasks/${editingId}`, payload);
        toast.success("Task updated");
      } else {
        await API.post("/tasks", payload);
        toast.success("Task created");
      }

      resetForm();
      fetchTasks(filters);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (task) => {
    setEditingId(task._id);
    setForm({
      title: task.title,
      description: task.description,
      status: task.status,
      assignedTo: task.assignedTo?._id || task.assignedTo,
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await API.delete(`/tasks/${id}`);
      toast.success("Task deleted");
      fetchTasks(filters);
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const applyFilters = () => {
    const params = {};
    if (filters.status) params.status = filters.status;
    if (filters.assignedTo) params.assignedTo = filters.assignedTo;
    fetchTasks(params);
  };

  const clearFilters = () => {
    setFilters({ status: "", assignedTo: "" });
    fetchTasks();
  };

  return (
    <div className="flex bg-base-300 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Tasks</h1>
          </div>

          {/* Form */}
          <div className="card bg-base-100 shadow-xl mb-8">
            <div className="card-body">
              <h2 className="card-title text-lg mb-4 flex items-center gap-2">
                <PlusCircle size={20} />
                {editingId ? "Edit Task" : "Create New Task"}
              </h2>
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <input
                  type="text"
                  placeholder="Title"
                  className="input input-bordered w-full"
                  value={form.title}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
                <select
                  className="select select-bordered w-full"
                  value={form.status}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, status: e.target.value }))
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>

                <textarea
                  className="textarea textarea-bordered w-full md:col-span-2"
                  placeholder="Description"
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />

                <select
                  className="select select-bordered w-full"
                  value={form.assignedTo}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      assignedTo: e.target.value,
                    }))
                  }
                >
                  <option value="">Assign to employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.name}
                    </option>
                  ))}
                </select>

                <input
                  type="date"
                  className="input input-bordered w-full"
                  min={new Date().toISOString().split("T")[0]}
                  value={form.dueDate}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, dueDate: e.target.value }))
                  }
                />

                <div className="md:col-span-2 flex justify-end gap-2 mt-2">
                  {editingId && (
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={resetForm}
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading
                      ? "Saving..."
                      : editingId
                      ? "Update Task"
                      : "Create Task"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Filters */}
          <div className="card bg-base-100 shadow mb-6">
            <div className="card-body flex flex-col md:flex-row gap-4 md:items-end">
              <div className="flex-1">
                <label className="label">
                  <span className="label-text">Status</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={filters.status}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      status: e.target.value,
                    }))
                  }
                >
                  <option value="">All</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="label">
                  <span className="label-text">Employee</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={filters.assignedTo}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      assignedTo: e.target.value,
                    }))
                  }
                >
                  <option value="">All</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2">
                <button className="btn btn-outline" onClick={applyFilters}>
                  <Filter size={16} /> Apply
                </button>
                <button className="btn btn-ghost" onClick={clearFilters}>
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title mb-4">Task List</h2>
              {fetching ? (
                <span className="loading loading-spinner loading-lg"></span>
              ) : tasks.length === 0 ? (
                <p>No tasks found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Employee</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks.map((task, index) => (
                        <tr key={task._id}>
                          <td>{index + 1}</td>
                          <td>{task.title}</td>
                          <td>
                            {task.assignedTo?.name ||
                              task.assignedTo?.email ||
                              "—"}
                          </td>
                          <td>{task.status}</td>
                          <td>
                            {task.dueDate
                              ? new Date(task.dueDate).toLocaleDateString()
                              : "—"}
                          </td>
                          <td>
                            <div className="flex gap-2">
                              <button
                                className="btn btn-sm btn-outline"
                                onClick={() => handleEdit(task)}
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                className="btn btn-sm btn-error"
                                onClick={() => handleDelete(task._id)}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
