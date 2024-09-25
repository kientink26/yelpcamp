import express from "express";
import campgroundRoutes from "./routes/campgrounds.js";
import userRoutes from "./routes/users.js";
import tokenRoutes from "./routes/tokens.js";
import { internalServerError, notFoundError } from "./utils/errors.js";
import { authenticate, requireAuthentication } from "./middlewares.js";
import ExpressError from "./utils/ExpressError.js";

const app = express();

app.use(express.json());
app.use(authenticate);

app.use("/users", userRoutes);
app.use("/tokens", tokenRoutes);
app.use("/campgrounds", requireAuthentication, campgroundRoutes);

app.use((req, res, next) => {
  next(notFoundError);
});

app.use((err, req, res, next) => {
  switch (err.code) {
    case "P2025":
      err = notFoundError;
      break;
    case "P2002":
      err = new ExpressError("already exists", 400);
      break;
  }
  if (!err.statusCode) {
    console.log(err);
    err = internalServerError;
  }
  const { statusCode, message } = err;
  res.status(statusCode).json({ error: message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
