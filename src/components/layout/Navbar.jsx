import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { LogOut, User } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();                // clears localStorage + state
        navigate('/login');      // redirect to login page
    };

    return (
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">

            {/* LEFT — app name */}
            <h2 className="text-gray-700 font-semibold text-lg">
                HR Management System
            </h2>

            {/* RIGHT — user info + logout */}
            <div className="flex items-center gap-4">

                {/* role badge */}
                <span className={`text-xs px-3 py-1 rounded-full font-medium
                    ${user?.role === 'super_admin'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-teal-100 text-teal-700'
                    }`}>
                    {user?.role === 'super_admin' ? 'Super Admin' : 'HR'}
                </span>

                {/* username */}
                <div className="flex items-center gap-2 text-gray-600">
                    <User size={18} />
                    <span className="text-sm font-medium">{user?.username}</span>
                </div>

                {/* logout button */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 transition-colors">
                    <LogOut size={18} />
                    Logout
                </button>

            </div>
        </header>
    );
};

export default Navbar; 