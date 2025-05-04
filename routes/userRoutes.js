const express = require("express");
const router = express.Router();
const usersController = require("../Controllers/usersController");
const authController = require("../Controllers/authController");

// Vérifie que l'utilisateur est connecté pour toutes les routes
router.use(authController.ensureLoggedIn);

// Routes CRUD pour les utilisateurs
router.get("/", usersController.index, usersController.indexView);
router.get("/new", usersController.new);
router.post("/create", usersController.validate, usersController.create, usersController.redirectView);
router.get("/:id", usersController.show, usersController.showView);
router.get("/:id/edit", usersController.edit);
router.put("/:id/update", usersController.update, usersController.redirectView);
router.delete("/:id/delete", usersController.delete, usersController.redirectView);

// ✅ Route pour obtenir le token API
router.get("/api-token", usersController.getApiToken);

module.exports = router;
