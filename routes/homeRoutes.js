// homeRoutes.js
const express = require("express");
const router = express.Router();

// Route d'accueil
router.get("/", (req, res) => {
    res.send("Bienvenue sur la page d'accueil");
});

module.exports = router;
