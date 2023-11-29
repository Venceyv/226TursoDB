import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { vars } from "./config/vars.config";
import { dbRouter } from "./routes/dbroute";

const app = express();
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
app.use("/db", dbRouter);
app.get("/check", async (req, res) => {
  const uptime = process.uptime();
  res.status(200).send({
    status: "UP",
    uptime: uptime,
    startTime: new Date(process.uptime()).toISOString(),
    currentTime: new Date().toISOString(),
  });
});
app.listen(vars.port, () => console.log(`Listening on port ${vars.port}`));
