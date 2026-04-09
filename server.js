import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import "dotenv/config";

const PORT = process.env.PORT || 8000;
// Connect DB
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server is running",PORT);
  });
});
