import React, { useState } from 'react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Checkbox from '../components/ui/Checkbox';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import Toast from '../components/ui/Toast';
import Tooltip from '../components/ui/Tooltip';
import Avatar from '../components/ui/Avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';

const StyleguidePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-24">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Styleguide</h1>
        <p className="text-slate-400">Catálogo de componentes UI base para o EvolveTech CRM.</p>
      </div>

      {/* Typography & Colors */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-200 border-b border-slate-800 pb-2">Cores</h2>
        <div className="flex gap-4 flex-wrap">
          <div className="h-16 w-16 rounded-lg bg-slate-900 border border-slate-700 flex items-end p-2 text-xs font-mono">slate-900</div>
          <div className="h-16 w-16 rounded-lg bg-slate-800 border border-slate-700 flex items-end p-2 text-xs font-mono">slate-800</div>
          <div className="h-16 w-16 rounded-lg bg-primary flex items-end p-2 text-xs font-mono">primary</div>
          <div className="h-16 w-16 rounded-lg bg-secondary flex items-end p-2 text-xs font-mono">secondary</div>
          <div className="h-16 w-16 rounded-lg bg-accent flex items-end p-2 text-xs font-mono text-slate-900">accent</div>
          <div className="h-16 w-16 rounded-lg bg-success flex items-end p-2 text-xs font-mono">success</div>
          <div className="h-16 w-16 rounded-lg bg-error flex items-end p-2 text-xs font-mono">error</div>
          <div className="h-16 w-16 rounded-lg bg-warning flex items-end p-2 text-xs font-mono text-slate-900">warning</div>
        </div>
      </section>

      {/* Buttons */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-200 border-b border-slate-800 pb-2">Buttons</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="danger">Danger Button</Button>
          <Button isLoading>Loading...</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      {/* Forms */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-200 border-b border-slate-800 pb-2">Forms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Email Address" placeholder="Ex: joao@empresa.com" />
          <Input label="Password" type="password" error="A senha é muito curta." />
          <Select 
            label="Estágio do Funil" 
            options={[
              { value: 'novo', label: 'Novo' },
              { value: 'proposta', label: 'Proposta' }
            ]} 
          />
          <div className="flex flex-col gap-4 justify-center">
            <Checkbox label="Aceitar termos" description="Você concorda com nossa política." />
            <Checkbox label="Apenas label" />
          </div>
        </div>
      </section>

      {/* Cards & Badges */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-200 border-b border-slate-800 pb-2">Cards & Badges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Card Padrão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400 text-sm">Este é um card padrão com fundo sólido. Usado na maior parte do sistema.</p>
              <div className="mt-4 flex gap-2 flex-wrap">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button size="sm">Ação</Button>
            </CardFooter>
          </Card>
          
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Glass Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400 text-sm">Este é um card estilo "glassmorphism", ideal para áreas flutuantes ou em cima de gradientes.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Data Display */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-200 border-b border-slate-800 pb-2">Data Display</h2>
        
        <div className="flex items-center gap-6 mb-6">
          <Avatar initials="JS" />
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" size="lg" />
          
          <Tooltip content="Informação útil aqui!" position="top">
            <Badge variant="primary">Passe o mouse (Top)</Badge>
          </Tooltip>
          <Tooltip content="Mais detalhes..." position="right">
            <Badge variant="secondary">Passe o mouse (Right)</Badge>
          </Tooltip>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">João Silva</TableCell>
              <TableCell>TechCorp</TableCell>
              <TableCell><Badge variant="success">Ganho</Badge></TableCell>
              <TableCell className="text-right">R$ 15.000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Maria Souza</TableCell>
              <TableCell>SoftSys</TableCell>
              <TableCell><Badge variant="warning">Proposta</Badge></TableCell>
              <TableCell className="text-right">R$ 8.500</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      {/* Overlays */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-200 border-b border-slate-800 pb-2">Overlays (Toast & Modal)</h2>
        <div className="flex flex-col gap-4 items-start">
          <Button onClick={() => setIsModalOpen(true)}>Abrir Modal de Exemplo</Button>
          
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Exemplo de Modal">
            <p className="text-slate-300 text-sm mb-4">Este é o conteúdo do modal. Você pode colocar formulários, confirmações e qualquer outro componente aqui dentro.</p>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
              <Button onClick={() => setIsModalOpen(false)}>Confirmar</Button>
            </div>
          </Modal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
            <Toast variant="info" title="Informação" description="Uma atualização de sistema." />
            <Toast variant="success" title="Sucesso!" description="Lead salvo com sucesso." />
            <Toast variant="warning" title="Atenção" description="Sua assinatura vence em 3 dias." />
            <Toast variant="error" title="Erro fatal" description="Não foi possível conectar ao servidor." />
          </div>
        </div>
      </section>

    </div>
  );
};

export default StyleguidePage;
