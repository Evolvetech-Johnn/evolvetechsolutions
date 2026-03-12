import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
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

app.use(helmet());
app.use(compression());

const allowedOrigins = [
  "http://localhost:5173",
  "https://evolvetechsolutions.netlify.app",
  "https://evolvetechsolutions.com.br",
  "https://www.evolvetechsolutions.com.br",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (origin.startsWith("http://localhost")) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(morgan("combined"));

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    version: "2.0.0",
    environment: process.env.NODE_ENV || "development",
  });
});

app.get("/api/platforms", (_req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      data: platforms.map(({ id, name, summary, icon, category }) => ({
        id,
        name,
        summary,
        icon,
        category,
      })),
    });
  } catch (_error) {
    void _error;
    res.status(500).json({ success: false, error: "Erro interno do servidor" });
  }
});

app.get("/api/platforms/:id", (req: Request, res: Response) => {
  try {
    const platform = platforms.find((p) => p.id === req.params.id);
    if (!platform) {
      return res
        .status(404)
        .json({ success: false, error: "Plataforma não encontrada" });
    }
    return res.json({ success: true, data: platform });
  } catch (_error) {
    void _error;
    return res
      .status(500)
      .json({ success: false, error: "Erro interno do servidor" });
  }
});

app.get("/api/technologies", (req: Request, res: Response) => {
  try {
    const { category } = req.query as { category?: string };
    const filteredTechs = category
      ? technologies.filter((tech) => tech.category === category)
      : technologies;
    res.json({ success: true, data: filteredTechs });
  } catch (_error) {
    void _error;
    res.status(500).json({ success: false, error: "Erro interno do servidor" });
  }
});

app.get("/api/projects", (req: Request, res: Response) => {
  try {
    const { platform } = req.query as { platform?: string };
    let filteredProjects = getProjects();
    if (platform) {
      filteredProjects = filteredProjects.filter(
        (project) => project.platform === platform,
      );
    }
    res.json({ success: true, data: filteredProjects });
  } catch (_error) {
    void _error;
    res.status(500).json({ success: false, error: "Erro interno do servidor" });
  }
});

app.get("/api/projects/:id", (req: Request, res: Response) => {
  try {
    const safeProjects = getProjects();
    const project = safeProjects.find((p) => p.id === req.params.id);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, error: "Projeto não encontrado" });
    }
    return res.json({ success: true, data: project });
  } catch (_error) {
    void _error;
    return res
      .status(500)
      .json({ success: false, error: "Erro interno do servidor" });
  }
});

app.get("/api/internal/projects/:id/url", (req: Request, res: Response) => {
  try {
    const realUrl = getProjectRealUrl(String(req.params.id));
    if (!realUrl) {
      return res
        .status(404)
        .json({ success: false, error: "Projeto não encontrado" });
    }
    return res.json({ success: true, url: realUrl });
  } catch (_error) {
    void _error;
    return res
      .status(500)
      .json({ success: false, error: "Erro interno do servidor" });
  }
});

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
  service?: string;
};

app.post("/api/contact", (req: Request, res: Response) => {
  try {
    const { name, email, message, service } = req.body as ContactBody;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Nome, email e mensagem são obrigatórios",
      });
    }

    console.log("Novo contato:", { name, email, message, service });

    return res.json({
      success: true,
      message: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
    });
  } catch (_error) {
    void _error;
    return res
      .status(500)
      .json({ success: false, error: "Erro interno do servidor" });
  }
});

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const error = err as { stack?: unknown };
  console.error(error.stack ?? err);
  res.status(500).json({ success: false, error: "Algo deu errado!" });
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, error: "Rota não encontrada" });
});

app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
});
