import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/database.js";

const PORT = process.env.PORT;
// Connect DB
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server is running", PORT);
  });
});
