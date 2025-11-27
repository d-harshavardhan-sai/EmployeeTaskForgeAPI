import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, ClipboardList } from "lucide-react";

export default function Sidebar() {
  const { pathname } = useLocation();

  const isActive = (path) =>
    pathname === path ? "bg-base-100 font-semibold" : "";

  return (
    <aside className="w-64 min-h-screen bg-base-300 border-r border-base-200">
      <ul className="menu p-4 text-sm">
        <li className={isActive("/dashboard")}>
          <Link to="/dashboard">
            <LayoutDashboard size={18} /> Dashboard
          </Link>
        </li>
        <li className={isActive("/employees")}>
          <Link to="/employees">
            <Users size={18} /> Employees
          </Link>
        </li>
        <li className={isActive("/tasks")}>
          <Link to="/tasks">
            <ClipboardList size={18} /> Tasks
          </Link>
        </li>
      </ul>
    </aside>
  );
}
