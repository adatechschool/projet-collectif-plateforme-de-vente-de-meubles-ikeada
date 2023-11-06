import { createClient } from "@supabase/supabase-js";
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use((req,res,next) => {

//   console.log(req.body)
// })

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

//---> DEBUT ROOTING PUBLIC GET

//affiche tous les meubles

app.get("/items", async (req, res) => {
  let { data, error } = await supabase
    .from("ITEM")
    .select()
  if (checkAdmin(req) == false) {
    data = data.filter((e) => e.status == true)
  }

  if (error) {
    res.status(500).json({ error: "Une erreur s'est produite" });
  } else {
    res.status(200).json(data);
  }
});

//affiche les meubles selon le nom du produit

app.get("/items/:name", async (req, res) => {

  let searchRequest = req.params.name.split(" ");
  console.log("Requête avec name:", searchRequest); // Ajout de ce message de débogage

  let data = [];
  let error = "";

  let { data: nameData, error: nameError } = await supabase
    .from("ITEM")
    .select()
    .ilikeAnyOf("name", searchRequest.map((e) => `%${e}%`))

  data = data.concat(nameData);

  let { data: descData, error: descErr } = await supabase
    .from("ITEM")
    .select()
    .textSearch("desc", searchRequest.map((e) => `'${e}'`).join(" | "));
  data = data.concat(descData);

  if (checkAdmin(req) == false) {
    data = data.filter((e) => e.status == true)
  }

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

  const { data, error } = await supabase
  .from("ITEM")
  .select(`
    *,
    colors:COLOR(*);
  `)
  .eq("id", itemId);

  if (error) {
    console.error(error);

    res.status(500).json({ error: "Une erreur s'est produite" });
  } else if (
    data.filter((e) => e.status == false).length > 0 &&
    checkAdmin(req) == false
  ) {
    res.status(561).json("Check your privileges");
  } else {
    res.status(200).json(data);
  }
});

// Public GET category
// Affiche toutes les catégories de mobilier
app.get("/category", async (req, res) => {
  const { data, error } = await supabase.from("CATEG").select();
  // .eq('name', 'Cuisine') // Permet d'affiner l'affichage par catégorie.
  if (error) {
    res.status(500).json({ error: "Une erreur s'est produite" });
  } else {
    res.status(200).json(data);
  }
});

// Public GET sub_category
// Affiche toutes les sous-catégories de mobilier
app.get("/sub_category", async (req, res) => {
  const { data, error } = await supabase.from("SUB_CATEG").select();
  // .eq('name', 'Canapés') // Permet d'affiner l'affichage par sous catégorie.
  if (error) {
    res.status(500).json({ error: "Une erreur s'est produite" });
  } else {
    res.status(200).json(data);
  }
});

// GET Public catégories
// Recherche par motclé des catégories
app.get("/search_bar/category/:motcle", async (req, res) => {
  const motCle = req.params.motcle;
  console.log(motCle);
  if (!motCle) {
    return res
      .status(400)
      .json({ error: "Le paramètre 'motcle' est manquant dans l'URL." });
  } else {
    const { data, error } = await supabase
      .from("CATEG")
      .select()
      .textSearch("name", motCle);
    console.log("resultat:", data);
    res.status(200).json(data);
  }
});
// Fin GET Public catégories

// GET Public Sous catégories
// Sous catégories
app.get("/search_bar/sub_categ/:motcle", async (req, res) => {
  const motCle = req.params.motcle;
  console.log(motCle);
  if (!motCle) {
    return res
      .status(400)
      .json({ error: "Le paramètre 'motcle' est manquant dans l'URL." });
  } else {
    const { data, error } = await supabase
      .from("SUB_CATEG")
      .select()
      .textSearch("name", motCle);
    console.log("resultat:", data);
    res.status(200).json(data);
  }
});
// Fin GET Public catégories


//---> FIN ROOTING PUBLIC GET




//---> DEBUT ROOTING BO

// Check en premier si jeton JWT valide et si c'est le jeton de l'admin
app.use("/admin/*", checkAuth, (req, res, next) => {
  if (checkAdmin(req) == false) {
    return res.status(401).send("Check your privileges");
  }
  next();
});


// CREATION
app.post("/admin/postItem", async (req, res) => {
  const jsonData = req.body;
  if (jsonData.archived) {
    return res
      .status(403)
      .send("Interdit : les items ne peuvent pas être créés et archivés en même temps")
  } else {
    const { data, error } = await supabaseAd.from("ITEM").insert([jsonData]);

    if (error) {
      // console.log(req)
      return res
        .status(500)
        .send("Erreur lors de l'enregistrement des données dans Supabase.");
    }

    return res.send(
      "Données enregistrées avec succès dans Supabase. Nouveau meuble ajouté dans le BackOffice."
    );
  }
});


// MODIFICATION
app.post("/admin/editItem", async (req, res) => {
  const jsonData = req.body;
   if (jsonData.archived) {
     return res
       .status(403)
       .send("Interdit : les items ne peuvent pas être modifiés et archivés en même temps")
   } else {

    const { data, error } = await supabaseAd.from("ITEM").update([jsonData]).eq('id', jsonData.id)

    if (error) {
      return res
        .status(403)
        .send(`Echec de la modification de l'item (nom :'${jsonData.name}', prix :'${jsonData.price}'), Supabase_error: ${error.message}
      `)
    }

    return res
      .status(201)
      .send(
        "Données enregistrées avec succès. Item modifié : " + jsonData.name
      )
  }
})


// ARCHIVAGE
app.post("/admin/archiveItem", async (req, res) => {
  const jsonData = req.body;

  const { data, error } = await supabaseAd.from("ITEM").update([jsonData]).eq('id', jsonData.id);
  if (!jsonData.archived) {
    return res
      .status(403)
      .send("La propriété 'archived' doit être modifiée")
  } else {

    if (error) {
      return res
        .status(404)
        .send(`Echec de l'archivage de l'item, assurez-vous de ne modifier que la propriété "archived"
       (nom :'${jsonData.name}',
       prix :'${jsonData.price}'),
      Supabase_error: ${error.message}
      `)
    }

    return res
      .status(201)
      .send(
        "Données enregistrées avec succès. Archivé : " + jsonData.name
      )
  }
})


// SUPPRESSION (Work In Progress :update or delete on table "ITEM" violates foreign key constraint
//"ITEM_COLOR_RELA_item_id_fkey" on table "ITEM_COLOR_RELA")
app.post("/admin/deleteItem", async (req, res) => {
  const jsonData = req.body;

  if (!jsonData.archived) {
    return res
      .status(403)
      .send("Interdit : les items doivent être archivés avant suppression")
  } else {

    const { data, error } = await supabaseAd.from("ITEM").delete([jsonData]).eq('id', jsonData.id);

    if (error) {
      return res
        .status(404)
        .send(`Echec de la suppression de l'item (nom :'${jsonData.name}', prix :'${jsonData.price}'), Supabase_error: ${error.message}
      `)
    }

    return res
      .status(201)
      .send(
        "Données enregistrées avec succès. Item supprimé : " + jsonData.name
      )
  }
})


// CREATE COLOR
app.post("/admin/postColor", async (req, res) => {
  const jsonData = req.body;

  const { data, error } = await supabase.from("COLOR").insert([jsonData]);

  if (error) {
    return res
      .status(500)
      .send("Erreur lors de l'enregistrement des données dans Supabase.");
  }

  return res.send(
    "Données enregistrées avec succès dans Supabase. Nouvelle couleur ajoutée dans le BackOffice."
  );
});


// CREATE CAT
app.post("/admin/postCateg", async (req, res) => {
  const jsonData = req.body;

  const { data, error } = await supabase.from("CATEG").insert([jsonData]);

  if (error) {
    return res
      .status(500)
      .send("Erreur lors de l'enregistrement des données dans Supabase.");
  }

  return res.send(
    "Données enregistrées avec succès dans Supabase. Nouvelle catégorie ajoutée dans le BackOffice."
  );
});


// CREATE SUB_CAT
app.post("/admin/postSubCateg", async (req, res) => {
  const jsonData = req.body;

  const { data, error } = await supabase.from("SUB_CATEG").insert([jsonData]);

  if (error) {
    return res
      .status(500)
      .send("Erreur lors de l'enregistrement des données dans Supabase.");
  }

  return res.send(
    "Données enregistrées avec succès dans Supabase. Nouvelle sous-catégorie ajoutée dans le BackOffice."
  );
});

//---> FIN ROOTING BO



//---> Fonctions Check pour les requetes BO

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
        err
      });
    }
  } else {
    res.status(401);
  }
}

function checkAdmin(req) {
  // Verifie si l'user enregeristré dans le jeton JWT correspond a l'Admin
  if (!req.userData) {
    return false
  }
  if (req.userData.sub == "2e0ab73d-47b8-4ee2-8f43-e22fe8a63dce") {
    return true;
  } else {
    return false;
  }
}

export default app;
