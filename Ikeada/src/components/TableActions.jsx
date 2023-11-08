import { PropTypes } from "prop-types";

import DeleteButton from "./atoms/DeleteButton";
import EditButton from "./atoms/EditButton";
import StashButton from "./atoms/StashButton";
import PublishButton from "./atoms/PublishButton";
import { observer } from 'mobx-react-lite'

// ce composant affiche différents boutons selon le statut et la disponibilité du meuble
const TableActions = observer(({ item }) => {

  if (item.status && item.available) {
    return (
      <td direction="horizontal" className="text-center">
        <EditButton item={item} />
        <StashButton item={item} />
        <DeleteButton item={item} />
      </td>
    );
  } else if (item.available) {
    return (
      <td direction="horizontal" className="text-center">
        <EditButton item={item} />
        <PublishButton item={item} />
        <DeleteButton item={item} />
      </td>
    );
  } else {
    return (
      <td direction="horizontal" className="text-center">
        <EditButton item={item} />
        <DeleteButton item={item} />
      </td>
    );
  }
})

// vérification du type des props
TableActions.propTypes = {
  item: PropTypes.object,
};

export default TableActions
