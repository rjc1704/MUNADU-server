import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./router";
import "dotenv/config";
import { sequelize } from "./database";

const app = express();

const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;
const HOST: string = process.env.HOST || "localhost";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const options: cors.CorsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
};

app.use(router);
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("무나두 스타트");
});

app.use(cors(options));
app.listen(PORT, HOST, async () => {
  console.log(process.env.DB_USERNAME);
  console.log(`Server Listening on ${HOST}:${PORT}`);
  sequelize
    .authenticate()
    .then(async () => {
      console.log("database connected");
      try {
        await sequelize.sync({ force: false });
      } catch (e) {
        console.log(e.message);
      }
    })
    .catch((e: any) => {
      console.log(e.message);
    });
});
