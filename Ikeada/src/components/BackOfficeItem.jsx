import { PropTypes } from "prop-types";
import  TableActions  from "./TableActions";
import  TableStatus  from "./TableStatus";

export default function BackOfficeItem({ item }) {
  return (
    <>
      <tr className="fs-5">
        <td>{item.name}</td>
        <td className="text-center">{item.price / 100} €</td>
        <TableStatus item={item} />
        {<TableActions item={item} />}
      </tr>
    </>
  );
}

// vérification du type des props
BackOfficeItem.propTypes = {
  item: PropTypes.object,
  name: PropTypes.string,
  price: PropTypes.number,
};
