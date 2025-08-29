import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Calendar, Users, MessageCircle, HelpCircle, Plus, Bell } from 'lucide-react';

export default function DashboardPage() {
  const { profile } = useAuth();

  return (
    <DashboardLayout>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
            <p className="text-gray-600">Visão Geral</p>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
            <div className="w-8 h-8 bg-gradient-to-br from-clinic-blue to-clinic-green rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
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
                <Users className="h-8 w-8 text-clinic-green" />
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
      </main>
    </DashboardLayout>
  );
}
