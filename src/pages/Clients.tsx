import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Plus, Eye, Calendar, Bell } from 'lucide-react';

export default function ClientsPage() {
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const clients = [
    { id: 1, name: "Maria Silva", phone: "(11) 99999-0001", lastVisit: "10/03/2024" },
    { id: 2, name: "João Santos", phone: "(11) 99999-0002", lastVisit: "08/03/2024" },
    { id: 3, name: "Ana Costa", phone: "(11) 99999-0003", lastVisit: "05/03/2024" }
  ];

  return (
    <DashboardLayout>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Clientes</h1>
            <p className="text-gray-600">Gerenciamento de Clientes</p>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
            <div className="w-8 h-8 bg-gradient-to-br from-clinic-blue to-clinic-green rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        {selectedClient ? (
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
        ) : (
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
        )}
      </main>
    </DashboardLayout>
  );
}
