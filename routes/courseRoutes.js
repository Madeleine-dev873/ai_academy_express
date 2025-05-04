const express = require("express");
const router = express.Router();
const coursesController = require("../Controllers/coursesController");

// Routes pour les cours

// Afficher tous les cours
router.get("/", coursesController.index, coursesController.indexView);

// Formulaire de création d’un cours
router.get("/new", coursesController.new);

// Créer un nouveau cours
router.post("/create", coursesController.create, coursesController.redirectView);

// Afficher un cours spécifique
router.get("/:id", coursesController.show, coursesController.showView);

// Formulaire de modification
router.get("/:id/edit", coursesController.edit);

// Mettre à jour un cours
router.put("/:id/update", coursesController.update, coursesController.redirectView);

// Supprimer un cours
router.delete("/:id/delete", coursesController.delete, coursesController.redirectView);

module.exports = router;
