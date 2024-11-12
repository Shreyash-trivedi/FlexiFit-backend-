import http from "http";
import app from "./app.js";
import mongoose from "mongoose";

const port = process.env.PORT || 3000;

const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to Mongo DB"))
    .catch((err) => {
      console.error("failed to connect with mongo");
      console.error(err);
    });
};

const server = http.createServer(app);
// websocketServer(server);

server.listen(port, () => {
  connectDB();
  console.log(`Server running on port ${port}`);
});
