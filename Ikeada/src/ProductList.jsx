import items from '../jsonTest/item'

function ProductList() {

    return(
      <>
      {items.map((id, name) => 
      <p>{id}, {name}</p>
      )}
      </>
    )
}

export default ProductList