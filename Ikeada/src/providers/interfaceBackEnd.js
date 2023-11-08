import { sessionStore } from "../auth/session";

class InterfaceBackEnd {
  // en privé pour faire ça bien
  #sessionStore;
  constructor(sessionStore) {
    this.#sessionStore = sessionStore;
  }

  // récupère tous les items
  async fetchItems() {
    return await fetch("/api/ikeada/items", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => console.error("Erreur de chargement du JSON :", error));
  }

  // récupère un item grace à son nom complet, pas terrible pour la recherche mais certainement pour d'autres choses, comme la page produit
  async searchItems(query) {
    return await fetch(`/api/ikeada/items/${query}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => console.error("Erreur de chargement du JSON :", error));
  }

  // recherche par id
  async searchItemById(id) {
    return await fetch(`/api/ikeada/items/id/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data[0];
      })
      .catch((error) => console.error("Erreur de chargement du JSON :", error));
  }

  async archiveItem(itemData) {

    return await fetch('/api/ikeada/admin/archiveItem', {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${this.#sessionStore.token}`,
        'body': itemData,
        'Content-Type': 'application/json'
      },

    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => console.error("Erreur lors de l'archivage :", error));
  }

  async editItem(itemData) {
    return await fetch('/api/ikeada/admin/editItem', {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.#sessionStore.token}`,
        body: itemData,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => console.error("Erreur lors de la tentative de suppression :", error));
  }

  async changeItemStatus(itemData) {
    console.log(itemData)
    return await fetch('/api/ikeada/admin/changeItemStatus', {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.#sessionStore.token}`,
        body: itemData,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => console.error("Erreur lors du changement de statut :" + error));
  }


  async deleteItem(itemData) {
    return await fetch('/api/ikeada/admin/archiveItem', {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.#sessionStore.token}`,
        body: itemData,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => console.error("Erreur lors de la tentative de suppression :", error));
  }


  // ajout d'un item dans la BDD
  async addItem(item) {
    const itemData = { item: item }
    return await fetch(`/api/ikeada/admin/postItem`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.#sessionStore.token}`,
        body: itemData,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => console.error("Erreur de chargement du JSON :", error));
  }

  // Categs
  async fetchCategs() {
    return await fetch("/api/ikeada/category", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => console.error("Erreur de chargement du JSON :", error));
  }
}

export const interfaceBackEnd = new InterfaceBackEnd(sessionStore);
