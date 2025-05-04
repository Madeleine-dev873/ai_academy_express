// errorRoutes.js
const express = require("express");
const router = express.Router();

// Exemple de route pour gérer les erreurs
router.get("/404", (req, res) => {
    res.status(404).send("Page non trouvée");
});

router.get("/500", (req, res) => {
    res.status(500).send("Erreur interne du serveur");
});

module.exports = router;
