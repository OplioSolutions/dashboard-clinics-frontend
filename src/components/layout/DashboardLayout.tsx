import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Calendar, 
  Users, 
  MessageCircle, 
  Settings as SettingsIcon, 
  Home, 
  LogOut, 
  HelpCircle,
  Bell 
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const { user, profile, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const links = [
    { label: "Dashboard", href: "/", icon: <Home className="h-5 w-5" /> },
    { label: "Agendamentos", href: "/agendamentos", icon: <Calendar className="h-5 w-5" /> },
    { label: "Clientes", href: "/clientes", icon: <Users className="h-5 w-5" /> },
    { label: "Atendimento", href: "/atendimento", icon: <MessageCircle className="h-5 w-5" /> },
    { label: "Configurações", href: "/configuracoes", icon: <SettingsIcon className="h-5 w-5" /> },
    { label: "Suporte", href: "/suporte", icon: <HelpCircle className="h-5 w-5" /> }
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div 
        className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300 ease-in-out border-r border-gray-200 flex flex-col`}
        onMouseEnter={() => setSidebarOpen(true)}
        onMouseLeave={() => setSidebarOpen(false)}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-clinic-blue to-clinic-green rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            {sidebarOpen && (
              <span className="font-semibold text-gray-800 whitespace-nowrap">
                EstéticaCare
              </span>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-4">
          {links.map((link, idx) => (
            <button
              key={idx}
              onClick={() => navigate(link.href)}
              className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                window.location.pathname === link.href ? 'bg-blue-50 text-clinic-blue border-r-2 border-clinic-blue' : 'text-gray-600'
              }`}
            >
              <div className="flex-shrink-0">{link.icon}</div>
              {sidebarOpen && (
                <span className="ml-3 whitespace-nowrap">{link.label}</span>
              )}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <img
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face"
              className="w-8 h-8 rounded-full"
              alt="User"
            />
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {user?.email || 'Carregando...'}
                </p>
                <p className="text-xs text-gray-500">
                  {profile ? `Empresa #${profile.company_id} - ${profile.role}` : 'Sem empresa'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-0 py-2 text-gray-600 hover:text-gray-800"
          >
            <LogOut className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3">Sair</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
