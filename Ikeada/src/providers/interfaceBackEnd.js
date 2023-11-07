import { sessionStore } from "../auth/session";

class InterfaceBackEnd {
    // en privé pour faire ça bien
    #sessionStore
    constructor(sessionStore) {
        this.#sessionStore = sessionStore
    }

    // récupère tous les items
    async fetchItems() {
        return await fetch('/api/items', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                return data
            })
            .catch(error => console.error('Erreur de chargement du JSON :', error));
    }

    // récupère un item grace à son nom complet, pas terrible pour la recherche mais certainement pour d'autres choses, comme la page produit
    async searchItems(query) {
        return await fetch(`/api/items/${query}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                return data
            })
            .catch(error => {
                console.error('Erreur de chargement du JSON :', error);
                return null;
    });
    }

    // recherche par id
    async searchItemById(id) {
        return await fetch(`/api/items/id/${id}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                return data[0]
            })
            .catch(error => console.error('Erreur de chargement du JSON :', error));
    }

    // ajout d'un item dans la BDD
    async addItem(data) {
        return await fetch(`api/admin/postItem`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${this.#sessionStore.token}`,
                "body": data
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                return data
            })
            .catch(error => console.error('Erreur de chargement du JSON :', error));
    }
}

export const interfaceBackEnd = new InterfaceBackEnd(sessionStore)