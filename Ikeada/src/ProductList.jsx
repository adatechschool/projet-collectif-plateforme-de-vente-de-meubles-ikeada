import items from './jsonTest/item.json'

function ProductList() {

    return(
      <>
      <p>Salut</p>
      {items.map((id, name) => 
      <p>{id}, {name}</p>
      )}
      </>
    )
}

export default ProductList