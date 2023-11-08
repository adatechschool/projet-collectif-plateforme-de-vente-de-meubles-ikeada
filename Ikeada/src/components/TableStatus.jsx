import PropTypes from 'prop-types'
import { observer } from 'mobx-react-lite'
// affiche le statut du meuble avec des couleurs qui vont bien
const TableStatus = observer(({ item }) => {
    if (item.archived) {
        return (<td className="bg-secondary text-center text-white">Archivé</td>)
    } else if (item.status && item.available) {
        return (<td className="bg-success text-center text-white">En ligne</td>)
    } else if (item.available) {
        return (<td className="bg-warning text-center text-white">A valider</td>)
    } else {
        return (<td className="bg-danger text-center text-white">Indisponible</td>)
    }
})

// on vérifie juste le type des props pour éviter les erreurs
TableStatus.propTypes = {
    item: PropTypes.object,
    status: PropTypes.bool,
    available: PropTypes.bool
}

export default TableStatus