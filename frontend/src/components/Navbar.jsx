import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-200 px-6 shadow-sm">
      <div className="flex-1">
        <span className="text-xl font-bold">EmployeeTaskForge</span>
      </div>
      <button className="btn btn-error btn-sm" onClick={handleLogout}>
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}
