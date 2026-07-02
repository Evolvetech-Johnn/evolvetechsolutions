import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card, { CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { authService } from '../services/authService';

const EsqueciSenhaPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    if (!email) {
      setErro('Por favor, informe seu e-mail.');
      return;
    }

    setLoading(true);
    try {
      await authService.resetPassword(email);
      setSucesso(true);
    } catch (err: any) {
      setErro(err.message || 'Ocorreu um erro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[120px] rounded-full pointer-events-none" />

      <Card variant="glass" className="w-full max-w-md relative z-10">
        <CardHeader className="pb-4">
          <Link to="/login" className="flex items-center text-sm text-slate-400 hover:text-white transition-colors w-fit mb-4">
            <ArrowLeft size={16} className="mr-1" /> Voltar ao login
          </Link>
          <CardTitle className="text-xl">Recuperar Senha</CardTitle>
          <p className="text-slate-400 text-sm mt-1">Informe seu e-mail para receber as instruções.</p>
        </CardHeader>
        
        <CardContent>
          {sucesso ? (
            <div className="text-center space-y-4 py-4">
              <div className="mx-auto w-12 h-12 bg-success/20 text-success rounded-full flex items-center justify-center mb-2">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-lg font-medium text-white">E-mail enviado!</h3>
              <p className="text-sm text-slate-400">Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.</p>
              <Link to="/login" className="block mt-6 text-primary hover:text-primary-hover font-medium">
                Ir para o Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              {erro && (
                <div className="bg-error/10 border border-error/50 text-error text-sm p-3 rounded-lg text-center">
                  {erro}
                </div>
              )}
              
              <Input
                label="E-mail"
                type="email"
                placeholder="Seu e-mail cadastrado"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button type="submit" className="w-full" isLoading={loading}>
                Enviar instruções
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EsqueciSenhaPage;
