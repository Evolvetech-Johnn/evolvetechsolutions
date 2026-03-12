import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";
import platforms from "./data/platforms.js";
import technologies from "./data/technologies.js";
import { getProjects, getProjectRealUrl } from "./data/projects.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT ?? 5000);

// Midlewares
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(cors({
    origin: (origin, callback) => {
        // Permitir localhost e os domínios da EvolveTech
        if (!origin || origin.startsWith("http://localhost") || 
            origin.includes("evolvetechsolutions.netlify.app") || 
            origin.includes("evolvetechsolutions.com.br")) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.get("/api/health", (_req, res) => {
  res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    version: "2.1.0"
  });
});

app.get("/api/platforms", (_req, res) => {
  res.json({ success: true, data: platforms });
});

app.get("/api/platforms/:id", (req, res) => {
    const platform = platforms.find(p => p.id === req.params.id);
    if (!platform) return res.status(404).json({ success: false, error: "Plataforma não encontrada" });
    res.json({ success: true, data: platform });
});

app.get("/api/projects", (req, res) => {
    const { platform } = req.query as { platform?: string };
    let data = getProjects();
    if (platform) data = data.filter(p => p.platform === platform);
    res.json({ success: true, data });
});

app.get("/api/projects/:id", (req, res) => {
    const project = getProjects().find(p => p.id === req.params.id);
    if (!project) return res.status(404).json({ success: false, error: "Projeto não encontrado" });
    res.json({ success: true, data: project });
});

app.get("/api/technologies", (_req, res) => {
    res.json({ success: true, data: technologies });
});

app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: "Nome, email e mensagem são obrigatórios" });
    }
    console.log("Novo contato recebido:", { name, email });
    res.json({ success: true, message: "Mensagem enviada com sucesso!" });
});

// Error handling
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Server Error:", err);
  res.status(500).json({ success: false, error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`🚀 EvolveTech API running on http://localhost:${PORT}`);
});
