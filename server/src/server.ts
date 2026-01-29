import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db";
import shortUrl from "./routes/shortUrl"

dotenv.config();
connectDb();

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://link-forge-delta.vercel.app",
    ],
    credentials: true,
  })
);

app.use("/api/", shortUrl);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Port is listening on PORT: ${port}`);
});
