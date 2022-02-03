const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const path = require("path");
const https = require("https");
const fs = require("fs");

app.use(express.static(path.join(__dirname, "public")));
app.use("/css", express.static(path.join(__dirname, "node_modules/mdb-ui-kit/css")));
app.use("/js", express.static(path.join(__dirname, "node_modules/mdb-ui-kit/js")));
app.use("/js/all.js", express.static(path.join(__dirname, "node_modules/@fortawesome/fontawesome-pro/js/all.js")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(expressLayouts);
app.set("layout", "layouts/primary");

app.get("/", (req, res) => {
    res.render("home", { title: "Startseite"});
});

app.get("/kochen", (req, res) => {
    res.render("cooking/cooking", { layout: "layouts/secondary", title: "Kochen"});
});

https
    .createServer(
        // Provide the private and public key to the server by reading each
        // file's content with the readFileSync() method.
        {
            key: fs.readFileSync("key.pem"),
            cert: fs.readFileSync("cert.pem"),
        },
        app
    )
    .listen(8080, "0.0.0.0",() => {
        console.log("serever is runing at port 8080");
});