import express from "express";
import cors from "cors";
import llamaRoutes from "./routes/llamaRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.get("/", async (req, res) => {
  return res.status(200).json({ message: "hello from flexi-dev-team" });
});

app.use("/user", userRoutes);
app.use("/ai", llamaRoutes);
// app.use("/calendars", calendarRoutes);
// app.use("/bookings", bookingRoutes);
// app.use("/notifications", notificationRoutes);

// WebSocket
// websocketServer(app);

export default app;
