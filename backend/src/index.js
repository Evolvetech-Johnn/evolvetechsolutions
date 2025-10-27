import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import platforms from './data/platforms.js';
import technologies from './data/technologies.js';
import { projects, getProjects, getProjectRealUrl } from './data/projects.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware de segurança e performance
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('combined'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Rotas de plataformas
app.get('/api/platforms', (req, res) => {
  try {
    res.json({
      success: true,
      data: platforms.map(({ id, name, summary, icon, category }) => ({ 
        id, name, summary, icon, category 
      }))
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

app.get('/api/platforms/:id', (req, res) => {
  try {
    const platform = platforms.find(p => p.id === req.params.id);
    if (!platform) {
      return res.status(404).json({ 
        success: false, 
        error: 'Plataforma não encontrada' 
      });
    }
    res.json({ success: true, data: platform });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

// Rotas de tecnologias
app.get('/api/technologies', (req, res) => {
  try {
    const { category } = req.query;
    let filteredTechs = technologies;
    
    if (category) {
      filteredTechs = technologies.filter(tech => tech.category === category);
    }
    
    res.json({ success: true, data: filteredTechs });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

// Rotas de projetos
app.get('/api/projects', (req, res) => {
  try {
    const { platform } = req.query;
    let filteredProjects = getProjects(); // Usa função segura que remove URLs reais
    
    if (platform) {
      filteredProjects = filteredProjects.filter(project => project.platform === platform);
    }
    
    res.json({ success: true, data: filteredProjects });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

app.get('/api/projects/:id', (req, res) => {
  try {
    const safeProjects = getProjects(); // Usa função segura
    const project = safeProjects.find(p => p.id === req.params.id);
    if (!project) {
      return res.status(404).json({ 
        success: false, 
        error: 'Projeto não encontrado' 
      });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

// Rota interna para obter URL real (apenas para uso administrativo)
app.get('/api/internal/projects/:id/url', (req, res) => {
  try {
    // Esta rota deve ser protegida em produção com autenticação
    const realUrl = getProjectRealUrl(req.params.id);
    if (!realUrl) {
      return res.status(404).json({ 
        success: false, 
        error: 'Projeto não encontrado' 
      });
    }
    res.json({ success: true, url: realUrl });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

// Rota para contato/orçamento
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, message, service } = req.body;
    
    // Validação básica
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Nome, email e mensagem são obrigatórios'
      });
    }
    
    // Aqui você implementaria o envio de email ou salvamento no banco
    console.log('Novo contato:', { name, email, message, service });
    
    res.json({
      success: true,
      message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    error: 'Algo deu errado!' 
  });
});

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'Rota não encontrada' 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});