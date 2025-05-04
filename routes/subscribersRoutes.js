const express = require("express");
const router = express.Router();
const subscribersController = require("../Controllers/subscribersController");

// Lister tous les abonnés
router.get("/", subscribersController.index);

// Afficher le formulaire d’ajout d’un abonné
router.get("/new", subscribersController.new);

// Créer un nouvel abonné
router.post("/create", subscribersController.create);

// Afficher un abonné par ID
router.get("/:id", subscribersController.show);

// Formulaire d'édition d’un abonné
router.get("/:id/edit", subscribersController.edit);

// Mettre à jour un abonné
router.put("/:id/update", subscribersController.update);

// Supprimer un abonné
router.delete("/:id/delete", subscribersController.delete);

module.exports = router;
