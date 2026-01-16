# EvolveTech Backend API

Backend API para o portfólio da EvolveTech, desenvolvido em Node.js/Express.

## 🚀 Deployment no Render

### Passo a Passo

1. **Criar Conta no Render**
   - Acesse [render.com](https://render.com)
   - Faça login com sua conta GitHub

2. **Novo Web Service**
   - Clique em "New +" → "Web Service"
   - Conecte seu repositório GitHub
   - Selecione este projeto

3. **Configurações do Serviço**
   ```
   Name: evolvetech-api
   Region: Oregon (US West)
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Variáveis de Ambiente**
   Adicione as seguintes variáveis em "Environment":
   ```
   NODE_ENV=production
   PORT=5000
   FRONTEND_URL=https://seu-dominio-frontend.netlify.app
   ```

5. **Plano**
   - Free tier: Suficiente para começar
   - Paid: Recomendado para produção (melhor performance)

6. **Deploy**
   - Clique em "Create Web Service"
   - Aguarde o build e deploy automático
   - URL da API estará disponível em: `https://evolvetech-api.onrender.com`

### URLs da API

Após o deploy, sua API estará disponível em:
```
Base URL: https://evolvetech-api.onrender.com
Health: /api/health
Platforms: /api/platforms
Projects: /api/projects
Technologies: /api/technologies
Contact: /api/contact (POST)
```

### Testar a API

```bash
# Health check
curl https://evolvetech-api.onrender.com/api/health

# Listar projetos
curl https://evolvetech-api.onrender.com/api/projects

# Listar plataformas
curl https://evolvetech-api.onrender.com/api/platforms
```

## 🔧 Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Produção
npm start
```

## 📁 Estrutura

```
backend/
├── src/
│   ├── data/
│   │   ├── platforms.js
│   │   ├── projects.js
│   │   └── technologies.js
│   └── index.js
├── .env
├── .env.example
├── package.json
└── README.md
```

## 🔐 Segurança

- Helmet.js para headers de segurança
- CORS configurado
- Rate limiting (implementar em produção)
- URLs reais protegidas
- Validação de dados

## 📊 Monitoramento

Render fornece:
- Logs em tempo real
- Métricas de uso
- Alertas de erro
- Health checks automáticos

## 🌐 Conectar Frontend

Após deploy, atualize o frontend para usar a URL da API:

```javascript
// frontend/src/config.js
export const API_URL = 'https://evolvetech-api.onrender.com/api'
```

## 🔄 Auto-Deploy

Render faz deploy automático quando você:
1. Faz push para a branch main
2. Merge pull requests
3. Atualiza variáveis de ambiente

## ⚡ Performance

- Compressão gzip habilitada
- Cache headers configurados
- Health checks every 5 min
- Auto-sleep após inatividade (free tier)
- Wake-up automático em requisições

## 🆘 Troubleshooting

**API não responde:**
- Verifique logs no dashboard Render
- Confirme variáveis de ambiente
- Free tier: aguarde wake-up (primeira requisição pode demorar)

**CORS Error:**
- Adicione sua URL frontend em FRONTEND_URL
- Verifique configuração de CORS no index.js

**Build falha:**
- Verifique Node version (>= 18.0.0)
- Confirme package.json está correto
- Veja logs de build no Render

## 📞 Suporte

- Documentação Render: https://render.com/docs
- Issues: GitHub repository
- Email: suporte@evolvetech.com.br
