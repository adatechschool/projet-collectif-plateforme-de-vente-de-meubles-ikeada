import { supabaseAd } from "./app.js"

// ARCHIVAGE
export const archiveItem = async (req, res) => {
  const jsonData = req.body;

  const { data, error } = await supabaseAd.from("ITEM").update([jsonData]).eq("id", jsonData.id)

  if (error) {
    return res.status(403)
      .send(`Echec de l'archivage de l'item, assurez-vous de ne modifier que la propriété "archived"
         (nom :'${jsonData.name}',
         prix :'${jsonData.price}'),
        Supabase_error: ${error.message}
        `);
  } else {
    return res
      .status(201)
      .send("Données enregistrées avec succès. Archivé : " + data);
  }
};

// RESTORATION
export const restoreItem = async (req, res) => {
  const jsonData = req.body;

  const { data, error } = await supabaseAd
    .from("ITEM")
    .update([jsonData])
    .select()
    .eq("id", jsonData.id);
  if (jsonData.archived) {
    return res.status(403).send("La propriété 'archived' doit être modifiée");
  } else {
    if (error) {
      return res.status(403)
        .send(`Echec de la restoration de l'item, assurez-vous de ne modifier que la propriété "archived"
         (nom :'${jsonData.name}',
         prix :'${jsonData.price}'),
        Supabase_error: ${error.message}
        `);
    }

    return res
      .status(201)
      .send("Données enregistrées avec succès. Restauré : " + data);
  }
};

// SUPPRESSION
export const deleteItem = async (req, res) => {
  const jsonData = req.body;

  if (!jsonData.archived) {
    return res
      .status(403)
      .send("Interdit : les items doivent être archivés avant suppression");
  } else {
    const { data, error } = await supabaseAd
      .from("ITEM")
      .delete([jsonData])
      .eq("id", jsonData.id);

    if (error) {
      return res.status(404)
        .send(`Echec de la suppression de l'item (nom :'${jsonData.name}', prix :'${jsonData.price}'), Supabase_error: ${error.message}
        `);
    }

    return res
      .status(201)
      .send(
        "Données enregistrées avec succès. Item supprimé : " + jsonData.name
      );
  }
};