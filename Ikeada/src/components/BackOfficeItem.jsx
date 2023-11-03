import { PropTypes } from "prop-types";
import TableActions from "./TableActions";
import TableStatus from "./TableStatus";

export default function BackOfficeItem({ name, price, status, available }) {
  return (
    <>
      <tr className="fs-5">
        <td>{name}</td>
        <td className="text-center">{price / 100} €</td>
        <TableStatus status={status} available={available} />
        {<TableActions status={status} available={available} />}
      </tr>
    </>
  );
}

// vérification du type des props
BackOfficeItem.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  status: PropTypes.bool,
  available: PropTypes.bool,
};
