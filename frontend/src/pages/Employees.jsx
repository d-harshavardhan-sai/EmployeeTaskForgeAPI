import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import toast from "react-hot-toast";
import { PlusCircle, Edit2, Trash2 } from "lucide-react";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", position: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const fetchEmployees = async () => {
    try {
      setFetching(true);
      const { data } = await API.get("/employees");
      setEmployees(data);
    } catch (error) {
      toast.error("Failed to fetch employees");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const resetForm = () => {
    setForm({ name: "", email: "", position: "" });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.position) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      if (editingId) {
        await API.put(`/employees/${editingId}`, form);
        toast.success("Employee updated");
      } else {
        await API.post("/employees", form);
        toast.success("Employee added");
      }
      resetForm();
      fetchEmployees();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (emp) => {
    setEditingId(emp._id);
    setForm({
      name: emp.name,
      email: emp.email,
      position: emp.position,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;
    try {
      await API.delete(`/employees/${id}`);
      toast.success("Employee deleted");
      fetchEmployees();
    } catch (error) {
      toast.error("Failed to delete employee");
    }
  };

  return (
    <div className="flex bg-base-300 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Employees</h1>
          </div>

          {/* Form */}
          <div className="card bg-base-100 shadow-xl mb-8">
            <div className="card-body">
              <h2 className="card-title text-lg mb-4 flex items-center gap-2">
                <PlusCircle size={20} />
                {editingId ? "Edit Employee" : "Add New Employee"}
              </h2>
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered w-full"
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full"
                  value={form.email}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
                <input
                  type="text"
                  placeholder="Position"
                  className="input input-bordered w-full"
                  value={form.position}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, position: e.target.value }))
                  }
                />

                <div className="md:col-span-3 flex gap-2 justify-end mt-2">
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
                      ? "Update Employee"
                      : "Add Employee"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Table */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title mb-4">Employee List</h2>

              {fetching ? (
                <span className="loading loading-spinner loading-lg"></span>
              ) : employees.length === 0 ? (
                <p>No employees found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Position</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((emp, index) => (
                        <tr key={emp._id}>
                          <td>{index + 1}</td>
                          <td>{emp.name}</td>
                          <td>{emp.email}</td>
                          <td>{emp.position}</td>
                          <td>
                            <div className="flex gap-2">
                              <button
                                className="btn btn-sm btn-outline"
                                onClick={() => handleEdit(emp)}
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                className="btn btn-sm btn-error"
                                onClick={() => handleDelete(emp._id)}
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
