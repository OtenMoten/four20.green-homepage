const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const path = require("path");
const https = require("https");
const fs = require("fs");
const mongoose = require("mongoose");

app.use(express.static(path.join(__dirname, "public")));
// app.use("/css", express.static(path.join(__dirname, "node_modules/mdb-ui-kit/css")));
// app.use("/js", express.static(path.join(__dirname, "node_modules/mdb-ui-kit/js")));
app.use("/js/all.js", express.static(path.join(__dirname, "node_modules/@fortawesome/fontawesome-pro/js/all.js")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(expressLayouts);
app.set("layout", "layouts/primary");

app.get("/", (req, res) => {
    res.render("landing/home", {title: "Startseite"});
});

app.get("/cannabis-kochen", (req, res) => {
    res.render("cooking/cooking", {layout: "layouts/secondary", title: "Mahlzeiten & Desserts"});
});

app.get("/cannabis-drinks", (req, res) => {
    res.render("drinks/drinks", {layout: "layouts/secondary", title: "Drinks & Cocktails"});
});

const options = {
    user: "admin",
    pass: "0bZ*5eOz!bx3",
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.connect("mongodb://db.four20.green/four20cooking?authSource=admin", options, () => {
    console.log("Successfully connected to four20cooking database *");
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection to four20cooking FAILED !!!"))
db.once("open", () => {
    console.log("Initialize mongoose ...")
});

https.createServer(
    // Provide the private and public key to the server by reading each
    // file's content with the readFileSync() method.
    {
        key: fs.readFileSync("key.pem"),
        cert: fs.readFileSync("cert.pem"),
    }, app)
    .listen(8080, "0.0.0.0", () => {
        console.log("Server listen on port 8080 *");
    });