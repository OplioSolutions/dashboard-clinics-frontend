import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Plus, CreditCard, Bell } from 'lucide-react';

export default function SettingsPage() {
  const [showUserModal, setShowUserModal] = useState(false);

  return (
    <DashboardLayout>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Configurações</h1>
            <p className="text-gray-600">Preferências do Sistema</p>
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
      </main>
    </DashboardLayout>
  );
}
