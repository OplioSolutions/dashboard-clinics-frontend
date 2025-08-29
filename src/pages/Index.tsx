import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, Users, MessageCircle, Settings as SettingsIcon, Home, LogOut, HelpCircle, Plus, Eye, Clock, Phone, Mail, Instagram, Filter, Send, User, MapPin, CreditCard, Bell } from 'lucide-react';
import Login from './Login';
import OmnichannelPage from './Omnichannel';

// Sidebar Components
export const SidebarDemo = () => {
  const { user, profile, logout, clearAuthState } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const links = [
    { label: "Dashboard", href: "dashboard", icon: <Home className="h-5 w-5" /> },
    { label: "Agendamentos", href: "appointments", icon: <Calendar className="h-5 w-5" /> },
    { label: "Clientes", href: "clients", icon: <Users className="h-5 w-5" /> },
    { label: "Atendimento", href: "omnichannel", icon: <MessageCircle className="h-5 w-5" /> },
    { label: "Configurações", href: "settings", icon: <SettingsIcon className="h-5 w-5" /> },
    { label: "Suporte", href: "help", icon: <HelpCircle className="h-5 w-5" /> }
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
              onClick={() => link.href.startsWith('/') ? window.location.href = link.href : setCurrentPage(link.href)}
              className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                currentPage === link.href ? 'bg-blue-50 text-clinic-blue border-r-2 border-clinic-blue' : 'text-gray-600'
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

        {/* Debug Button - TEMPORÁRIO */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => {
              console.log('🔧 DEBUG: Limpando estado de auth manualmente');
              clearAuthState();
            }}
            className="w-full flex items-center px-0 py-2 text-red-600 hover:text-red-800 mb-2"
          >
            <HelpCircle className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3">Limpar Auth (DEBUG)</span>}
          </button>
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
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                {getPageTitle(currentPage)}
              </h1>
              <p className="text-gray-600">
                {profile ? `Empresa #${profile.company_id}` : 'Sua clínica'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
              <div className="w-8 h-8 bg-gradient-to-br from-clinic-blue to-clinic-green rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {renderCurrentPage(currentPage)}
        </main>
      </div>
    </div>
  );
};

// Dashboard Page
const Dashboard = () => (
  <div className="p-6 space-y-6">
    {/* Quick Summary Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Próximos Agendamentos</p>
            <p className="text-3xl font-bold text-gray-800">8</p>
          </div>
          <Calendar className="h-12 w-12 text-clinic-blue" />
        </div>
        <button className="mt-4 text-clinic-blue hover:text-blue-800 text-sm font-medium">
          Ver Agenda →
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Clientes Ativos</p>
            <p className="text-3xl font-bold text-gray-800">142</p>
          </div>
          <Users className="h-12 w-12 text-clinic-green" />
        </div>
        <button className="mt-4 text-clinic-green hover:text-green-800 text-sm font-medium">
          Ver Lista →
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Chamados Abertos</p>
            <p className="text-3xl font-bold text-gray-800">3</p>
          </div>
          <HelpCircle className="h-12 w-12 text-clinic-orange" />
        </div>
        <button className="mt-4 text-clinic-orange hover:text-orange-800 text-sm font-medium">
          Abrir Chamado →
        </button>
      </div>
    </div>

    {/* Quick Actions */}
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Ações Rápidas</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Calendar className="h-8 w-8 text-clinic-blue" />
          <div className="text-left">
            <p className="font-medium text-gray-800">Agendar Consulta</p>
            <p className="text-sm text-gray-600">Nova consulta</p>
          </div>
        </button>

        <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <User className="h-8 w-8 text-clinic-green" />
          <div className="text-left">
            <p className="font-medium text-gray-800">Adicionar Cliente</p>
            <p className="text-sm text-gray-600">Cadastro novo</p>
          </div>
        </button>

        <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <MessageCircle className="h-8 w-8 text-clinic-purple" />
          <div className="text-left">
            <p className="font-medium text-gray-800">Atendimento</p>
            <p className="text-sm text-gray-600">Omnichannel</p>
          </div>
        </button>
      </div>
    </div>

    {/* Mini Marketplace */}
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Funcionalidades Futuras</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">Financeiro Avançado</h3>
          <p className="text-sm text-gray-600 mb-3">Controle completo de receitas e despesas</p>
          <button className="text-clinic-blue hover:text-blue-800 text-sm font-medium">
            Saiba Mais →
          </button>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">Controle de Estoque</h3>
          <p className="text-sm text-gray-600 mb-3">Gestão de produtos e materiais</p>
          <button className="text-clinic-blue hover:text-blue-800 text-sm font-medium">
            Saiba Mais →
          </button>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">Marketing Digital</h3>
          <p className="text-sm text-gray-600 mb-3">Campanhas e automações</p>
          <button className="text-clinic-blue hover:text-blue-800 text-sm font-medium">
            Saiba Mais →
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Appointments Page
const Appointments = () => (
  <div className="p-6">
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Calendar */}
      <div className="lg:col-span-3 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Calendário</h2>
          <button className="bg-clinic-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Novo Agendamento</span>
          </button>
        </div>
        <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Calendário Interativo (Mock)</p>
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Hoje (15/03)</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-clinic-green pl-4 py-2">
            <p className="font-medium text-gray-800">Maria Silva</p>
            <p className="text-sm text-gray-600">Limpeza de Pele</p>
            <p className="text-sm text-gray-500">09:00 - Dr. Ana</p>
            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
              Confirmado
            </span>
          </div>

          <div className="border-l-4 border-clinic-yellow pl-4 py-2">
            <p className="font-medium text-gray-800">João Santos</p>
            <p className="text-sm text-gray-600">Preenchimento</p>
            <p className="text-sm text-gray-500">14:30 - Dr. Carlos</p>
            <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
              Pendente
            </span>
          </div>

          <div className="border-l-4 border-clinic-red pl-4 py-2">
            <p className="font-medium text-gray-800">Ana Costa</p>
            <p className="text-sm text-gray-600">Botox</p>
            <p className="text-sm text-gray-500">16:00 - Dr. Ana</p>
            <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
              Cancelado
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Clients Page
const Clients = () => {
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const clients = [
    { id: 1, name: "Maria Silva", phone: "(11) 99999-0001", lastVisit: "10/03/2024" },
    { id: 2, name: "João Santos", phone: "(11) 99999-0002", lastVisit: "08/03/2024" },
    { id: 3, name: "Ana Costa", phone: "(11) 99999-0003", lastVisit: "05/03/2024" }
  ];

  if (selectedClient) {
    return (
      <div className="p-6">
        <div className="mb-4">
          <button 
            onClick={() => setSelectedClient(null)}
            className="text-clinic-blue hover:text-blue-800 flex items-center space-x-2"
          >
            <span>← Voltar para lista</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Client Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face"
                  className="w-20 h-20 rounded-full"
                  alt="Client"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Maria Silva</h2>
                  <p className="text-gray-600">32 anos • (11) 99999-0001</p>
                  <p className="text-gray-600">maria.silva@email.com</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Cliente desde</p>
                  <p className="font-medium">Janeiro 2023</p>
                </div>
                <div>
                  <p className="text-gray-600">Total de visitas</p>
                  <p className="font-medium">24 consultas</p>
                </div>
                <div>
                  <p className="text-gray-600">Observações médicas</p>
                  <p className="font-medium">Alergia a ácido salicílico</p>
                </div>
                <div>
                  <p className="text-gray-600">Última visita</p>
                  <p className="font-medium">10/03/2024</p>
                </div>
              </div>
            </div>

            {/* Insights do Agente */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">🤖 Insights do Agente Analista</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-clinic-green rounded-full"></div>
                    <p className="font-medium text-green-800">Comportamento Fiel</p>
                  </div>
                  <p className="text-sm text-green-700">Cliente pontual, raramente cancela consultas</p>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-clinic-yellow rounded-full"></div>
                    <p className="font-medium text-yellow-800">Padrão Sazonal</p>
                  </div>
                  <p className="text-sm text-yellow-700">Aumenta frequência antes do verão</p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2">Serviços Favoritos</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Limpeza de Pele</span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Hidratação</span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Peeling</span>
                </div>
              </div>

              <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-800 mb-2">💡 Recomendações</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Oferecer pacote de manutenção mensal</li>
                  <li>• Sugerir novos tratamentos antienvelhecimento</li>
                  <li>• Enviar lembretes 2 semanas antes das datas usuais</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions & History */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <button className="w-full bg-clinic-blue text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Agendar Consulta</span>
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Histórico</h3>
              <div className="space-y-3">
                <div className="border-b border-gray-200 pb-2">
                  <p className="font-medium text-gray-800">Limpeza de Pele</p>
                  <p className="text-sm text-gray-600">10/03/2024</p>
                  <span className="text-xs text-clinic-green">Concluído</span>
                </div>
                <div className="border-b border-gray-200 pb-2">
                  <p className="font-medium text-gray-800">Hidratação Facial</p>
                  <p className="text-sm text-gray-600">25/02/2024</p>
                  <span className="text-xs text-clinic-green">Concluído</span>
                </div>
                <div className="border-b border-gray-200 pb-2">
                  <p className="font-medium text-gray-800">Peeling Superficial</p>
                  <p className="text-sm text-gray-600">15/02/2024</p>
                  <span className="text-xs text-clinic-green">Concluído</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Lista de Clientes</h2>
            <button className="bg-clinic-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Novo Cliente</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Último Atendimento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={`https://images.unsplash.com/photo-149479010875${client.id}?w=40&h=40&fit=crop&crop=face`}
                        alt=""
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{client.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.lastVisit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => setSelectedClient(client)}
                      className="text-clinic-blue hover:text-blue-900 flex items-center space-x-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Ver Perfil</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Componente Support foi removido e substituído pelo OmnichannelPage importado

// Settings Page
const Settings = () => {
  const [showUserModal, setShowUserModal] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* General Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Configurações Gerais</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Logo da Clínica</label>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gradient-to-br from-clinic-blue to-clinic-green rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">BC</span>
                </div>
                <button className="text-clinic-blue hover:text-blue-800 text-sm">Alterar Logo</button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome da Clínica</label>
              <input 
                type="text" 
                defaultValue="Clínica Bella Estética" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-clinic-blue" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Horários de Funcionamento</label>
              <input 
                type="text" 
                defaultValue="Segunda à Sexta: 8:00 - 18:00 | Sábado: 8:00 - 14:00" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-clinic-blue" 
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
              <input 
                type="text" 
                defaultValue="Rua das Flores, 123 - Centro" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-clinic-blue" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
              <input 
                type="text" 
                defaultValue="(11) 3456-7890" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-clinic-blue" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
              <input 
                type="email" 
                defaultValue="contato@bellaestetica.com.br" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-clinic-blue" 
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="bg-clinic-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Salvar Alterações
          </button>
        </div>
      </div>

      {/* Users & Permissions */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Perfis e Permissões</h2>
          <button 
            onClick={() => setShowUserModal(true)}
            className="bg-clinic-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Adicionar Usuário</span>
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="flex items-center space-x-4">
              <img
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face"
                className="w-12 h-12 rounded-full"
                alt=""
              />
              <div>
                <p className="font-medium text-gray-800">Dr. Ana Silva</p>
                <p className="text-sm text-gray-600">ana.silva@email.com</p>
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  Administrador
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="text-clinic-blue hover:text-blue-800 text-sm">Editar</button>
              <button className="text-clinic-red hover:text-red-800 text-sm">Remover</button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="flex items-center space-x-4">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
                className="w-12 h-12 rounded-full"
                alt=""
              />
              <div>
                <p className="font-medium text-gray-800">Dr. Carlos Lima</p>
                <p className="text-sm text-gray-600">carlos.lima@email.com</p>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  Profissional
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="text-clinic-blue hover:text-blue-800 text-sm">Editar</button>
              <button className="text-clinic-red hover:text-red-800 text-sm">Remover</button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="flex items-center space-x-4">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face"
                className="w-12 h-12 rounded-full"
                alt=""
              />
              <div>
                <p className="font-medium text-gray-800">Carla Mendes</p>
                <p className="text-sm text-gray-600">carla.mendes@email.com</p>
                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                  Recepcionista
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="text-clinic-blue hover:text-blue-800 text-sm">Editar</button>
              <button className="text-clinic-red hover:text-red-800 text-sm">Remover</button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Assinatura e Pagamento</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-clinic-green rounded-full"></div>
                <p className="font-medium text-green-800">Plano Pro - Ativo</p>
              </div>
              <p className="text-sm text-green-700">Acesso completo a todas as funcionalidades</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Valor mensal</p>
              <p className="text-2xl font-bold text-gray-800">R$ 149,90</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Próxima cobrança</p>
              <p className="font-medium text-gray-800">20 de Março de 2024</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Método de pagamento</p>
              <div className="flex items-center space-x-2 mt-1">
                <CreditCard className="h-4 w-4 text-gray-600" />
                <p className="font-medium text-gray-800">•••• •••• •••• 1234</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button className="w-full bg-clinic-blue text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>Gerenciar Pagamento</span>
            </button>

            <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50">
              Histórico de Faturas
            </button>

            <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50">
              Alterar Plano
            </button>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">💡 Dica</h4>
              <p className="text-sm text-blue-700">
                Aproveite 20% de desconto no plano anual. Entre em contato conosco!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Adicionar Novo Usuário</h3>
              <button 
                onClick={() => setShowUserModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                <input 
                  type="text" 
                  placeholder="Ex: Dr. João Silva"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-clinic-blue" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                <input 
                  type="email" 
                  placeholder="joao.silva@email.com"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-clinic-blue" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Perfil</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-clinic-blue">
                  <option>Selecionar perfil...</option>
                  <option>Administrador</option>
                  <option>Profissional</option>
                  <option>Recepcionista</option>
                </select>
              </div>

              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setShowUserModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button 
                  onClick={() => setShowUserModal(false)}
                  className="flex-1 bg-clinic-blue text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Help Page
const Help = () => (
  <div className="p-6">
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Central de Ajuda</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
          <h3 className="font-medium text-gray-800 mb-2">Como agendar consultas?</h3>
          <p className="text-sm text-gray-600">Aprenda a usar o sistema de agendamentos</p>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
          <h3 className="font-medium text-gray-800 mb-2">Gerenciar clientes</h3>
          <p className="text-sm text-gray-600">Como cadastrar e gerenciar informações de clientes</p>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
          <h3 className="font-medium text-gray-800 mb-2">Atendimento omnichannel</h3>
          <p className="text-sm text-gray-600">Configure e use o sistema de atendimento</p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-800 mb-2">Precisa de mais ajuda?</h3>
        <p className="text-sm text-blue-700 mb-3">Nossa equipe está pronta para te auxiliar</p>
        <button className="bg-clinic-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Falar com Suporte
        </button>
      </div>
    </div>
  </div>
);

// Helper functions
const getPageTitle = (page: string) => {
  const titles: { [key: string]: string } = {
    dashboard: "Dashboard",
    appointments: "Agendamentos", 
    clients: "Clientes",
    omnichannel: "Atendimento",
    settings: "Configurações",
    help: "Ajuda"
  };
  return titles[page] || "Dashboard";
};

const renderCurrentPage = (currentPage: string) => {
  switch (currentPage) {
    case 'dashboard': return <Dashboard />;
    case 'appointments': return <Appointments />;
    case 'clients': return <Clients />;
    case 'omnichannel': return <OmnichannelPage />;
    case 'settings': return <Settings />;
    case 'help': return <Help />;
    default: return <Dashboard />;
  }
};

// Main component that handles authentication routing
const Index = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-clinic-blue to-clinic-green flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return <SidebarDemo />;
};

export default Index;