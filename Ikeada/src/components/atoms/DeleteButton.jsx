import { TrashFill } from "react-bootstrap-icons"
import { Button } from "react-bootstrap"
import PropTypes from "prop-types"
import { observer } from 'mobx-react-lite'
const DeleteButton = observer(({ item }) => {
    function del() {
        item.archiveSelf()
    }
    return (
        <>
            <Button variant="transparent" onClick={del}>
                <TrashFill size={25} className="text-danger"></TrashFill>
            </Button>
        </>)
})

DeleteButton.propTypes = {
    item: PropTypes.object,
}

export default DeleteButton