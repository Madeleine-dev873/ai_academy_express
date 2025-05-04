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
// Ajoutez les contrôleurs
const usersController = require("./Controllers/usersController");
const coursesController = require("./controllers/coursesController");
// Ajouter le middleware method-override
const methodOverride = require("method-override");
app.use(methodOverride("_method", {
methods: ["POST", "GET"]

}));
// Routes pour les utilisateurs
app.get("/users", usersController.index, usersController.indexView);
app.get("/users/new", usersController.new);
app.post("/users/create", usersController.create, usersController.redirectView);
app.get("/users/:id", usersController.show, usersController.showView);
app.get("/users/:id/edit", usersController.edit);
app.put("/users/:id/update", usersController.update, usersController.redirectView);
app.delete("/users/:id/delete", usersController.delete, usersController.redirectView);
// Routes pour les cours
app.get("/courses", coursesController.index, coursesController.indexView);
app.get("/courses/new", coursesController.new);
app.post("/courses/create", coursesController.create, coursesController.redirectView);
app.get("/courses/:id", coursesController.show, coursesController.showView);
app.get("/courses/:id/edit", coursesController.edit);
app.put("/courses/:id/update", coursesController.update, coursesController.redirectView);
app.delete("/courses/:id/delete", coursesController.delete, coursesController.redirectView);

// Gestion des erreurs
app.use(errorController.pageNotFound);

// Lancer le serveur
const port = 3000;
app.listen(port, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${port}`);
});
