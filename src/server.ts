import { config } from "./config/environment.js";
import app from "./app.js";

const PORT = config.port || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
