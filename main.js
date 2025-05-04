const express = require("express");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const errorController = require("./Controllers/errorController");
const homeController = require("./Controllers/homeController");  // Ajoutez l'importation du contrôleur
const subscribersController = require("./Controllers/subscribersController");

// Connexion à MongoDB
mongoose.connect("mongodb://localhost:27017/ai_academy", { useNewUrlParser: true });

const db = mongoose.connection;
db.once("open", () => {
  console.log("Connexion réussie à MongoDB en utilisant Mongoose!");
});

const app = express();

// Configuration du moteur de templates
app.set("view engine", "ejs");

// Middleware
app.use(layouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", homeController.index);  // Utilisez le contrôleur homeController pour la route d'accueil
app.get("/about", homeController.about);  // Exemple d'utilisation de la route 'about'
app.get("/courses", homeController.courses);  // Exemple d'utilisation de la route 'courses'
app.get("/contact", homeController.contact);  // Exemple d'utilisation de la route 'contact'
app.post("/contact", homeController.processContact);  // Traiter le formulaire de contact
// Routes pour les abonnés
app.get("/subscribers", subscribersController.getAllSubscribers);
app.get("/subscribers/new", subscribersController.getSubscriptionPage);
app.post("/subscribers/create", subscribersController.saveSubscriber);
app.get("/subscribers/:id", subscribersController.show);

// Gestion des erreurs
app.use(errorController.pageNotFound);

// Lancer le serveur
const port = 3000;
app.listen(port, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${port}`);
});
