import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import { textAi } from "./src/services/ai.service.js";

const PORT = process.env.PORT;

textAi();

// Connect DB
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server is running", PORT);
  });
});
