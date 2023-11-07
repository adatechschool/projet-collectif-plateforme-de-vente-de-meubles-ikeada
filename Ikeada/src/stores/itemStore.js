import { makeObservable, observable, action } from "mobx";
import { interfaceBackEnd } from "../providers/interfaceBackEnd";

// store qui va contenir les données de session
class itemStore {
  items = [];
  currentItem = {};

  // c'est une propriété "privée", on ne peux y accéder qu'à l'intérieur même de la classe
  #service;

  // on lui dis que "items" et "currentItem" sont des trucs auxquels on va vouloir accèder
  // et que setItems etc... sont des méthode pour y assigner des données
  constructor(service) {
    // on instancie le service chargé des requêtes API directement dans le constructeur, comme ça les deux sont liés de manière permanente
    this.#service = service;
    makeObservable(this, {
      items: observable,
      currentItem: observable,
      setItems: action,
      addItem: action,
      delItem: action,
      setCurrentItem: action,
    });
  }

  async getItems() {
    const data = await this.#service.fetchItems();
    this.setItems(data);
  }
  async searchItems(query) {
    // on reset pour ne pas afficher un autre item pendant le chargement de celui qu'on veut
    this.currentItem = {};
    const data = await this.#service.searchItems(query);
    this.setItems(data);
  }
  async searchItemById(id) {
    this.currentItem = {};
    const data = await this.#service.searchItemById(id);
    this.setCurrentItem(data);
  }

  setItems(data) {
    this.items = data.map((el) => {
      return new Item(el);
    });
  }
  setCurrentItem(data) {
    this.currentItem = new Item(data);
  }
  addItem(data) {
    this.items.push(new Item(data));
    this.#service.addItem(data);
  }
  delItem(id) {
    // purement "visuel" pour l'instant
    // il faudra envoyer la requête au serveur et récupérer les données à jour
    let index = this.items.indexOf(
      this.items.find((item) => {
        return item.id == id;
      })
    );
    // supprime du tableau, mais ce qu'on voudra c'est simplement relancer getItem() vu que ça sera supprimé au niveaud de la BDD
    this.items.splice(index, 1);
    // this.items.splice(index, 1)
  }
}

class Item {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.desc = data.desc;
    this.subcateg_id = data.subcateg_id;
    this.price = data.price;
    this.materials = data.materials;
    this.available = data.available;
    this.picture = data.picture;
    this.status = data.status;
    this.dimensions = data.dimensions;
  }
}

// on instancie le Store avec le service back-end en paramètre
export const itemsStore = new itemStore(interfaceBackEnd);
