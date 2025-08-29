import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Plus, Bell } from 'lucide-react';

export default function AppointmentsPage() {
  return (
    <DashboardLayout>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Agendamentos</h1>
            <p className="text-gray-600">Consultas e Procedimentos</p>
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
      </main>
    </DashboardLayout>
  );
}
