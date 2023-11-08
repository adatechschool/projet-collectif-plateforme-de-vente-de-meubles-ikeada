import { supabase } from "./app.js"
import { supabaseAd } from "./app.js"
import jwt from 'jsonwebtoken';
import { addItemColors } from "./insertItemController.js";
// Check en premier si jeton JWT valide et si c'est le jeton de l'admin
export const checkAuthAdmin = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      // Verifie le token avec la clef secrète
      const decoded = jwt.verify(token, process.env.SUPABASE_TOKEN);
      req.userData = decoded;
      if (await checkAdmin(req) == false) {
        return res.status(401).send("Check your privileges");
      }
    } catch (err) {
      return res.status(401).json({
        message: "Auth failed",
        err,
      });
    }
  } else {
    res.status(401);
  }
  next();
};

// MODIFICATION
export const editItem = async (req, res) => {
  const jsonData = req.body;
  const itemData = jsonData.item
  const colorsData = jsonData.colors

  if (itemData.archived) {
    return res
      .status(403)
      .send(
        "Interdit : les items ne peuvent pas être modifiés et archivés en même temps"
      );
  } else {
    const { data, error } = await supabaseAd
      .from("ITEM")
      .update([itemData])
      .select()
      .eq("id", itemData.id)

    if (error) {
      console.log(error)
      return res.status(403)
        .send(`Echec de la modification de l'item (nom :'${itemData.name}', prix :'${itemData.price}'), Supabase_error: ${error.message}
      `);
    }

    const colorRes = await addItemColors(colorsData, itemData.id)

    return res
      .status(201)
      .send(
        " Item modifié : " + data + ", couleurs : " + colorRes
      );
  }
};

export const changeItemStatus = async (req, res) => {
  const jsonData = req.body;
  console.log(jsonData)
  if (jsonData.archived) {
    return res
      .status(403)
      .send(
        "Interdit : les items ne peuvent pas être modifiés et archivés en même temps"
      );
  } else {
    const { data, error } = await supabaseAd.from("ITEM").update([jsonData]).select().eq("id", jsonData.id)
    console.log(jsonData.id)

    if (error) {
      console.log(error)
      return res.status(403)
        .send(`Echec de la modification de l'item (id :'${jsonData.id}'), Supabase_error: ${error.message}
      `);
    }
    console.log(data)
    return res.status(201).json(
      " Statut modifié : " + data
    );
  }
};

// CREATE COLOR
export const postColor = async (req, res) => {
  const jsonData = req.body;

  const { data, error } = await supabase.from("COLOR").insert([jsonData]).select()

  if (error) {
    return res
      .status(500)
      .send("Erreur lors de l'enregistrement des données dans Supabase.");
  }

  return res.send(
    "Données enregistrées avec succès. Couleur ajoutée : " + data
  );
};

// CREATE CAT
export const postCategory = async (req, res) => {
  const jsonData = req.body;

  const { data, error } = await supabase.from("CATEG").insert([jsonData]).select()

  if (error) {
    return res
      .status(500)
      .send("Erreur lors de l'enregistrement des données dans Supabase.")
  }

  return res.send(
    "Données enregistrées avec succès. Catégorie ajoutée : " + data
  );
};

// CREATE SUB_CAT
export const postSubcategory = async (req, res) => {
  const jsonData = req.body;
  const { data, error } = await supabase.from("SUB_CATEG").insert([jsonData]).select()

  if (error) {
    return res
      .status(500)
      .send("Erreur : " + error);
  }

  return res.send(
    "Données enregistrées avec succès. Sous-catégorie ajoutée : " + data
  );
};

export async function checkAdmin(req) {
  // Verifie si l'user enregeristré dans le jeton JWT correspond a l'Admin
  if (!req.userData) {
    return false;
  }

  const { data, error } = await supabase.from('profiles').select().eq('id', req.userData.sub)

  if (data[0].admin == true) {
    return true;
  } else {
    return false;
  }
}
