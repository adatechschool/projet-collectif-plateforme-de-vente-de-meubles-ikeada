import { createClient } from "@supabase/supabase-js";
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const supabase = createClient(
  process.env.SUPABASE_AUTH_DOMAIN,
  process.env.SUPABASE_PU_API_KEY
);

const supabaseAd = createClient(
  process.env.SUPABASE_AUTH_DOMAIN,
  process.env.SUPABASE_AD_API_KEY
);

//CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Check le jeton JWT de toutes les requètes du BO avant de les traiter
app.use("/admin/*", checkAuth, checkAdmin, (req, res, next) => {
  next();
});

// Routing de test pour Admin
app.get("/admin/items", checkAdmin, async (req, res) => {
  const { data, error } = await supabase.from("ITEM").select();
  if (error) {
    res.send(error);
  }
  res.send(data);
});

app.get("/admin/colors", checkAdmin, async (req, res) => {
  try {
    const { data, error } = await supabaseAd.from("COLOR").select();
    if (error) {
      throw error;
    }
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching colors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Fin des routing test Admin

// Fonctions Check pour les requetes BO

// func pour checker le token des requetes sur le BO
function checkAuth(req, res, next) {
  // Recupère l' access token du header de la requète
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      // Verifie le token avec la clef secrète
      const decoded = jwt.verify(token, process.env.SUPABASE_TOKEN);
      req.userData = decoded;
      // S'il est possible de le decoder alors on passe au prochains middleware
      next();
    } catch (err) {
      return res.status(401).json({
        message: "Auth failed",
      });
    }
  } else {
    res.status(401);
  }
}

function checkAdmin(req, res, next) {
  // Verifie si l'user enregeristré dans le jeton JWT correspond a l'Admin
  if (req.userData.sub == "2e0ab73d-47b8-4ee2-8f43-e22fe8a63dce") {
    next();
  } else {
    res.status(401);
  }
}

//Requête d'ajout d'un item dans le BackOffice
app.post('admin/postItem', async (req, res) => {
    const jsonData = req.body;

    const { data, error } = await supabase.from('ITEM').insert([jsonData]);

    if (error) {
        return res.status(500).send('Erreur lors de l\'enregistrement des données dans Supabase.');
    }

    return res.send('Données enregistrées avec succès dans Supabase. Nouveau meuble ajouté dans le BackOffice.');
});

//Requête d'ajout d'un item dans le BackOffice
app.post('admin/postColor', async (req, res) => {
    const jsonData = req.body;

    const { data, error } = await supabase.from('COLOR').insert([jsonData]);

    if (error) {
        return res.status(500).send('Erreur lors de l\'enregistrement des données dans Supabase.');
    }

    return res.send('Données enregistrées avec succès dans Supabase. Nouvelle couleur ajoutée dans le BackOffice.');
});

//Requête d'ajout de catégories dans le BackOffice
app.post('admin/postCateg', async (req, res) => {
    const jsonData = req.body;

    const { data, error } = await supabase.from('CATEG').insert([jsonData]);

    if (error) {
        return res.status(500).send('Erreur lors de l\'enregistrement des données dans Supabase.');
    }

    return res.send('Données enregistrées avec succès dans Supabase. Nouvelle catégorie ajoutée dans le BackOffice.');
});

//Requête d'ajout d'une sous-catégorie dans le BackOffice
app.post('admin/postSubCateg', async (req, res) => {
    const jsonData = req.body;

    const { data, error } = await supabase.from('SUB_CATEG').insert([jsonData]);

    if (error) {
        return res.status(500).send('Erreur lors de l\'enregistrement des données dans Supabase.');
    }

    return res.send('Données enregistrées avec succès dans Supabase. Nouvelle sous-catégorie ajoutée dans le BackOffice.');
})

export default app;
