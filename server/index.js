"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();


const mongodb = require("./db");

app.use(cors());

mongodb();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: "50mb",
    })
);

const profitRoutes=require("./route");
app.use("/", profitRoutes);

app.get("/api", (req, res) => {
    var response = {
        success: 1,
        message: "Welcome to new era of Collections",
    };
    res.status(200).json(response);
});

/**
 * @description Page NOT FOUND Error
 */
app.use((req, res) => {
    return res.status(404).json({
        success: 0,
        message: `NOT FOUND ${req.originalUrl}`,
    });
});

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV;

app.listen(PORT, () => {
    console.log(`server is listing in ${NODE_ENV} on ${PORT} `);
});
