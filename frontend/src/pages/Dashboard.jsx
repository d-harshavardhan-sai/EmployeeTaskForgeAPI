import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import { Users, ClipboardList } from "lucide-react";

export default function Dashboard() {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [empRes, taskRes] = await Promise.all([
          API.get("/employees"),
          API.get("/tasks"),
        ]);

        setEmployeeCount(empRes.data.length || 0);
        setTaskCount(taskRes.data.length || 0);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="flex bg-base-300 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-8 space-y-6">
          <h1 className="text-3xl font-bold">Dashboard 🚀</h1>

          {loading ? (
            <span className="loading loading-spinner loading-lg"></span>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body flex flex-row items-center justify-between">
                  <div>
                    <p className="text-sm opacity-70">Total Employees</p>
                    <p className="text-3xl font-bold">{employeeCount}</p>
                  </div>
                  <Users size={40} />
                </div>
              </div>

              <div className="card bg-base-100 shadow-xl">
                <div className="card-body flex flex-row items-center justify-between">
                  <div>
                    <p className="text-sm opacity-70">Total Tasks</p>
                    <p className="text-3xl font-bold">{taskCount}</p>
                  </div>
                  <ClipboardList size={40} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
