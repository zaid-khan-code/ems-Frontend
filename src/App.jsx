import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

// layout
import Layout from "./components/layout/Layout.jsx";

// pages
import Login from "./pages/auth/Login.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Employees from "./pages/employees/Employees.jsx";
import AddEmployee from "./pages/employees/AddEmployee.jsx";
import EmployeeDetail from "./pages/employees/EmployeeDetail.jsx";
import Attendance from "./pages/attendance/Attendance.jsx";
import Leave from "./pages/leave/Leave.jsx";
import Payroll from "./pages/payroll/Payroll.jsx";
import HRAccounts from "./pages/accounts/HRAccounts.jsx";

// settings pages
import Departments from "./pages/settings/Departments.jsx";
import Designations from "./pages/settings/Designations.jsx";
import WorkModes from "./pages/settings/WorkModes.jsx";
import WorkLocations from "./pages/settings/WorkLocations.jsx";
import EmploymentTypes from "./pages/settings/EmploymentTypes.jsx";
import JobStatuses from "./pages/settings/JobStatuses.jsx";
import ReportingManagers from "./pages/settings/ReportingManagers.jsx";

const App = () => {
  return (
    // AuthProvider wraps everything
    // so every component can access useAuth()
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* PUBLIC ROUTE — no auth needed */}
          <Route path="/login" element={<Login />} />

          {/* PROTECTED ROUTES — need to be logged in */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            {/* default redirect → /dashboard */}
            <Route index element={<Navigate to="/dashboard" replace />} />

            <Route path="dashboard" element={<Dashboard />} />

            {/* employee routes */}
            <Route path="employees" element={<Employees />} />
            <Route path="employees/add" element={<AddEmployee />} />
            <Route path="employees/:id" element={<EmployeeDetail />} />

            {/* other routes */}
            <Route path="attendance" element={<Attendance />} />
            <Route path="leave" element={<Leave />} />
            <Route path="payroll" element={<Payroll />} />

            {/* settings routes */}
            <Route path="settings/departments" element={<Departments />} />
            <Route path="settings/designations" element={<Designations />} />
            <Route path="settings/work-modes" element={<WorkModes />} />
            <Route path="settings/work-locations" element={<WorkLocations />} />
            <Route
              path="settings/employment-types"
              element={<EmploymentTypes />}
            />
            <Route path="settings/job-statuses" element={<JobStatuses />} />
            <Route
              path="settings/reporting-managers"
              element={<ReportingManagers />}
            />

            {/* super_admin only */}
            <Route
              path="accounts"
              element={
                <ProtectedRoute requiredRole="super_admin">
                  <HRAccounts />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* catch unknown URLs → redirect to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
