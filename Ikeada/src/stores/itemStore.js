import { makeObservable, observable, action } from "mobx";
import { interfaceBackEnd } from "../providers/interfaceBackEnd";

// store qui va contenir les données de session
class itemStore {
  items = [];
  currentItem = {};

  // c'est une propriété "privée", on ne peux y accéder qu'à l'intérieur même de la classe
  #service;

  // on lui dis que "items" et "currentItem" sont des trucs auxquels on va vouloir accèder
  // et que #setItems etc... sont des méthode pour y assigner des données
  constructor(service) {
    // on instancie le service chargé des requêtes API directement dans le constructeur, comme ça les deux sont liés de manière permanente
    this.#service = service;
    makeObservable(this, {
      items: observable,
      currentItem: observable,
      setItems: action,
      addItem: action,
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
      return new Item(el, interfaceBackEnd, this);
    });
  }
  setCurrentItem(data) {
    this.currentItem = new Item(data, interfaceBackEnd, this);
  }
  async addItem(data) {
    await this.#service.addItem(data);
    this.#service.getItems()
  }


}

class Item {
  #service
  #store
  constructor(data, service, store) {
    this.#store = store
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
    this.archived = data.archived
    this.colors = data.colors
    this.#service = service
  }
  async delSelf() {
    await this.#service.deleteItem(this.id)
    await this.#store.getItems()
  }
  async archiveSelf() {
    const data = { id: this.id, archived: true }
    await this.#service.archiveItem(data)
    await this.#store.getItems()
  }
  async restoreSelf() {
    const data = { id: this.id, archived: true }
    console.log(this)
    await this.#service.restoreItem(data)
    await this.#store.getItems()
  }
  async stashSelf() {
    const data = { id: this.id, status: false }
    console.log(this)

    await this.#service.changeItemStatus(data)
    await this.#store.getItems()
  }
  async publishSelf() {
    const data = { id: this.id, status: true }
    await this.#service.changeItemStatus(data)
    await this.#store.getItems()
  }
  async setUnavailable() {
    const data = { id: this.id, available: false }
    await this.#service.changeItemStatus(data)
    await this.#store.getItems()
  }
  async setAvailable() {
    const data = { id: this.id, available: true }
    await this.#service.changeItemStatus(data)
    await this.#store.getItems()
  }
}

// on instancie le Store avec le service back-end en paramètre
export const itemsStore = new itemStore(interfaceBackEnd);
