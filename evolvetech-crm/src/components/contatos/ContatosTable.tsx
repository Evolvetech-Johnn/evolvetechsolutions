import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Contato } from '../../types/contato';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import { Mail, Phone, ChevronRight } from 'lucide-react';

interface ContatosTableProps {
  contatos: Contato[];
}

const ContatosTable: React.FC<ContatosTableProps> = ({ contatos }) => {
  const navigate = useNavigate();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Contato</TableHead>
          <TableHead>Empresa / Cargo</TableHead>
          <TableHead>Contato Direto</TableHead>
          <TableHead>Status Lead</TableHead>
          <TableHead className="w-10"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contatos.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8 text-slate-500">
              Nenhum contato encontrado.
            </TableCell>
          </TableRow>
        ) : (
          contatos.map((contato) => (
            <TableRow 
              key={contato.id} 
              className="cursor-pointer hover:bg-slate-800/80"
              onClick={() => navigate(`/contatos/${contato.id}`)}
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar initials={contato.nome.substring(0, 2).toUpperCase()} />
                  <span className="font-medium text-slate-200">{contato.nome}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-sm text-slate-300">{contato.empresa}</span>
                  <span className="text-xs text-slate-500">{contato.cargo}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <Mail size={14} /> {contato.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} /> {contato.telefone}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {contato.leadId ? (
                  <Badge variant="primary">No Funil</Badge>
                ) : (
                  <Badge variant="outline">Sem Lead</Badge>
                )}
              </TableCell>
              <TableCell>
                <ChevronRight size={18} className="text-slate-500" />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default ContatosTable;
