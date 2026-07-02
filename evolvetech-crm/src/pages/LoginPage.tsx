import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card, { CardHeader, CardTitle, CardContent } from '../components/ui/Card';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    
    if (!email || !senha) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      await login(email, senha);
      navigate('/dashboard');
    } catch (err: any) {
      setErro(err.message || 'Erro ao fazer login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full pointer-events-none" />

      <Card variant="glass" className="w-full max-w-md relative z-10 p-2">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto bg-slate-800 p-3 rounded-2xl w-fit mb-4 border border-slate-700 shadow-xl">
             <h1 className="text-2xl font-bold text-white tracking-tight">
               Evolve<span className="text-primary">CRM</span>
             </h1>
          </div>
          <CardTitle className="text-xl">Bem-vindo de volta</CardTitle>
          <p className="text-slate-400 text-sm mt-2">Faça login para gerenciar suas vendas.</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {erro && (
              <div className="bg-error/10 border border-error/50 text-error text-sm p-3 rounded-lg text-center">
                {erro}
              </div>
            )}
            
            <div className="space-y-4">
              <Input
                label="E-mail"
                type="email"
                placeholder="ex: admin@evolvetech.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              
              <div>
                <Input
                  label="Senha"
                  type="password"
                  placeholder="••••••••"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  autoComplete="current-password"
                />
                <div className="text-right mt-1">
                  <Link to="/esqueci-senha" className="text-xs text-primary hover:text-primary-hover transition-colors">
                    Esqueceu a senha?
                  </Link>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full mt-6" isLoading={loading}>
              Entrar no sistema
            </Button>
          </form>

          <div className="mt-8 text-center text-xs text-slate-500 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
            <p><strong>Demo Access:</strong></p>
            <p>Email: admin@evolvetech.com.br</p>
            <p>Senha: 123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
