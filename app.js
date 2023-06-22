const express = require("express");
const config = require("config");
const path = require("path");
const mongoose = require("mongoose");
const app = express();

app.use(express.json({ extended: true }));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/link", require("./routes/link.routes"));
app.use("/t/", require("./routes/redirect.routes"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = config.get("port") || 5000;
const MONGO_URI = config.get("mongoUri");

if (!MONGO_URI) {
  console.error("Mongo URI not found in config");
  process.exit(1);
}
async function start() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    });
    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (e) {
    console.error("Server error:", e.message);
    process.exit(1);
  }
}
app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});
start();
