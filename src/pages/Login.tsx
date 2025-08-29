import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-clinic-blue to-clinic-green flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo e Título */}
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-clinic-blue to-clinic-green rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-sm"></div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            EstéticaCare
          </h2>
          <p className="text-white/80 text-lg">
            Dashboard de Clínicas
          </p>
        </div>

        {/* Formulário de Login */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-clinic-blue focus:border-transparent transition-colors"
                  placeholder="admin@clinicademo.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-clinic-blue focus:border-transparent transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Mensagem de Erro */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Botão de Login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-clinic-blue to-clinic-green text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-green-600 focus:ring-2 focus:ring-offset-2 focus:ring-clinic-blue transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          {/* Informações de Demo */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Credenciais de Demonstração:</h4>
            <div className="space-y-1 text-xs text-blue-700">
              <p><strong>Admin:</strong> admin@clinicademo.com</p>
              <p><strong>Staff:</strong> staff@clinicademo.com</p>
              <p><strong>Senha:</strong> demo123</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-white/60 text-sm">
          <p>© 2024 EstéticaCare. Sistema de gestão para clínicas estéticas.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
