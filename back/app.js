import {createClient} from '@supabase/supabase-js';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

const app = express();
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const supabase = createClient(
  "https://bbrfovbvfzeszrjnhsdp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJicmZvdmJ2Znplc3pyam5oc2RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2NjQwMDAsImV4cCI6MjAxNDI0MDAwMH0.m59kFNiMCInEjaQcC-v32YOJ4JolEwE9dJruivGi5FQ"
);

//cors
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

//---> DEBUT ROOTING PUBLIC GET

//affiche tous les meubles

app.get("/items", async (req, res) => {
  const { data, error } = await supabase
    .from("ITEM")
    .select()
    .eq("status", true);

  if (error) {
    res.status(500).json({ error: "Une erreur s'est produite" });
  } else {
    res.status(200).json(data);
  }
});

//affiche les meubles selon le nom du produit

app.get("/items/:name", async (req, res) => {
  const itemName = req.params.name;
  console.log("Requête avec name:", itemName); // Ajout de ce message de débogage

  const { data, error } = await supabase
    .from("ITEM")
    .select()
    .eq("name", itemName);

  if (error) {
    console.error(error);
    res.status(500).json({ error: "Une erreur s'est produite" });
  } else {
    res.status(200).json(data);
  }
});

//affiche les meubles selon l'id du produit

app.get("/items/id/:id", async (req, res) => {
  const itemId = req.params.id;

  const { data, error } = await supabase.from("ITEM").select().eq("id", itemId);

  if (error) {
    console.error(error);

    res.status(500).json({ error: "Une erreur s'est produite" });
  } else {
    res.status(200).json(data);
  }
});

//---> FIN ROOTING PUBLIC GET
app.use("/admin", (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
    }
  
    try {
      // Vérifiez le format du jeton et faites d'autres validations si nécessaire
      const decoded = jwt.verify(token.replace('Bearer ', ''), getPublicKeyFromDatabase(), { algorithms: ['RS256'] });
  
      // Le jeton est valide, vous pouvez utiliser les informations dans l'objet `decoded` pour autoriser l'utilisateur
      req.user = decoded; // Ajoutez les informations du jeton au req pour une utilisation ultérieure
      next();
    } catch (error) {
      // Le jeton est invalide ou a expiré
      return res.status(401).json({ message: 'Accès non autorisé. Jeton invalide ou expiré.' });
    }
  });

  async function getPublicKeyFromDatabase() {
    try {
      // Récupérez la clé publique JWK depuis Supabase
      const { data, error } = await supabase
        .from('auth.v1.public_keys')
        .select('public_key')
        .eq('alg', 'RS256')
        .single();
  
      if (error) {
        console.error('Erreur lors de la récupération de la clé publique depuis Supabase:', error);
        throw new Error('Erreur lors de la récupération de la clé publique depuis Supabase');
      }
  
      return data.public_key;
    } catch (error) {
      console.error('Erreur lors de la récupération de la clé publique depuis Supabase:', error);
      throw new Error('Erreur lors de la récupération de la clé publique depuis Supabase');
    }
  }

export default app;
