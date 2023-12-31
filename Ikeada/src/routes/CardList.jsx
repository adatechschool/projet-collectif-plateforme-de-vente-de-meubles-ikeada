import ProductCard from "../components/ProductCard";
import { useParams } from "react-router";
import { useEffect } from "react";
import { itemsStore } from "../stores/itemStore";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";

const CardList = observer(() => {
  // récupère le chemin URL
  const urlLocation = useLocation();
  //recupère les paramètres
  const urlParams = useParams();
  // récupère les items
  const items = itemsStore.items;

  // s'éxecute toujours la première fois, puis permet de déclencher un re-render si on est pas sur la même page
  useEffect(() => {
    if (urlParams.query) {
      if (urlLocation.pathname.split("/")[2] == "itemscateg") {
        itemsStore.getItemsByCateg(urlParams.query);
      } else if (urlLocation.pathname.split("/")[2] == "search") {
        // page de recherche
        itemsStore.searchItems(urlParams.query);
      }
    } else {
      // page accueil
      itemsStore.getItems();
    }
  }, [urlParams]);

  return (
    <div className="d-flex justify-content-around flex-wrap">
      {items.length === 0
        ? "Oups... Il n'y a rien à voir ici !"
        : items.map((item) => <ProductCard key={item.name} item={item} />)}
    </div>
  );
});

export default CardList;
