import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Bell } from 'lucide-react';

export default function HelpPage() {
  return (
    <DashboardLayout>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Suporte</h1>
            <p className="text-gray-600">Central de Ajuda</p>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
            <div className="w-8 h-8 bg-gradient-to-br from-clinic-blue to-clinic-green rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
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
      </main>
    </DashboardLayout>
  );
}
