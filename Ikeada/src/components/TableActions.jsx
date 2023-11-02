import { PropTypes } from 'prop-types'

import DeleteButton from './atoms/DeleteButton'
import EditButton from './atoms/EditButton'
import StachButton from './atoms/StachButton'
import PublishButton from './atoms/PublishButton'

export default function TableActions({ status, available }) {
    if (status && available) {
        return (<td direction="horizontal" className="text-center" ><EditButton /><StachButton /><DeleteButton /></td>)
    } else if (available) {
        return (<td direction="horizontal" className="text-center"><EditButton /><PublishButton /><DeleteButton /></td>)
    }
    else {
        return (<td direction="horizontal" className="text-center"><EditButton /><DeleteButton /></td>)
    }
}

TableActions.propTypes = {
    status: PropTypes.bool,
    available: PropTypes.bool
}