import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  CalendarOff,
  Wallet,
  Settings,
  Building2,
  Briefcase,
  MapPin,
  Clock,
  Activity,
  UserCog,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const { user } = useAuth();

  // controls settings submenu open/close
  const [settingsOpen, setSettingsOpen] = useState(false);

  // active link style — applied by NavLink automatically
  const activeStyle = "bg-teal-600 text-white";
  const baseStyle =
    "flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-slate-700 transition-colors";

  return (
    <div className="w-64 h-screen bg-slate-800 flex flex-col overflow-y-auto">
      {/* LOGO */}
      <div className="px-6 py-5 border-b border-slate-700">
        <h1 className="text-white text-xl font-bold">HR Pro</h1>
        <p className="text-gray-400 text-xs mt-1">
          {user?.role === "super_admin" ? "Super Admin" : "HR Manager"}
        </p>
      </div>

      {/* NAV LINKS */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/employees"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <Users size={18} />
          Employees
        </NavLink>

        <NavLink
          to="/attendance"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <CalendarCheck size={18} />
          Attendance
        </NavLink>

        <NavLink
          to="/leave"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <CalendarOff size={18} />
          Leave Management
        </NavLink>

        <NavLink
          to="/payroll"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <Wallet size={18} />
          Payroll
        </NavLink>

        {/* SETTINGS — expandable submenu */}
        <div>
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className={`${baseStyle} w-full justify-between`}
          >
            <span className="flex items-center gap-3">
              <Settings size={18} />
              Settings
            </span>
            {settingsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {/* submenu links */}
          {settingsOpen && (
            <div className="ml-4 mt-1 space-y-1">
              <NavLink
                to="/settings/departments"
                className={({ isActive }) =>
                  `${baseStyle} text-sm ${isActive ? activeStyle : ""}`
                }
              >
                <Building2 size={16} />
                Departments
              </NavLink>

              <NavLink
                to="/settings/designations"
                className={({ isActive }) =>
                  `${baseStyle} text-sm ${isActive ? activeStyle : ""}`
                }
              >
                <Briefcase size={16} />
                Designations
              </NavLink>

              <NavLink
                to="/settings/work-modes"
                className={({ isActive }) =>
                  `${baseStyle} text-sm ${isActive ? activeStyle : ""}`
                }
              >
                <Activity size={16} />
                Work Modes
              </NavLink>

              <NavLink
                to="/settings/work-locations"
                className={({ isActive }) =>
                  `${baseStyle} text-sm ${isActive ? activeStyle : ""}`
                }
              >
                <MapPin size={16} />
                Work Locations
              </NavLink>

              <NavLink
                to="/settings/employment-types"
                className={({ isActive }) =>
                  `${baseStyle} text-sm ${isActive ? activeStyle : ""}`
                }
              >
                <Clock size={16} />
                Employment Types
              </NavLink>

              <NavLink
                to="/settings/job-statuses"
                className={({ isActive }) =>
                  `${baseStyle} text-sm ${isActive ? activeStyle : ""}`
                }
              >
                <Activity size={16} />
                Job Statuses
              </NavLink>

              <NavLink
                to="/settings/reporting-managers"
                className={({ isActive }) =>
                  `${baseStyle} text-sm ${isActive ? activeStyle : ""}`
                }
              >
                <UserCog size={16} />
                Reporting Managers
              </NavLink>
            </div>
          )}
        </div>

        {/* HR ACCOUNTS — super_admin only */}
        {user?.role === "super_admin" && (
          <NavLink
            to="/accounts"
            className={({ isActive }) =>
              `${baseStyle} ${isActive ? activeStyle : ""}`
            }
          >
            <UserCog size={18} />
            HR Accounts
          </NavLink>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
