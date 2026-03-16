import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* LEFT — sidebar, fixed, never changes */}
      <Sidebar />

      {/* RIGHT — navbar + current page content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* TOP — navbar, fixed, never changes */}
        <Navbar />

        {/* MAIN — this is where pages render */}
        {/* Outlet swaps content based on current URL */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
