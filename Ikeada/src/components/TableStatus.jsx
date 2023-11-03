import PropTypes from 'prop-types'

export default function TableStatus({ status, available }) {
    if (status && available) {
        return (<td className="bg-success text-center text-white">En ligne</td>)
    } else if (available) {
        return (<td className="bg-warning text-center text-white">A valider</td>)
    } else {
        return (<td className="bg-danger text-center text-white">Indisponible</td>)
    }
}

// on vérifie juste le type des props pour éviter les erreurs
TableStatus.propTypes = {
    status: PropTypes.bool,
    available: PropTypes.bool
}