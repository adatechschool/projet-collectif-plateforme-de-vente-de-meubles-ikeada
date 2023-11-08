import { PencilSquare } from "react-bootstrap-icons"
import { Button } from "react-bootstrap"
import PropTypes from 'prop-types'
import { observer } from 'mobx-react-lite'
const EditButton = observer(({ item }) => {

    function editItem() {
        console.log(item)
    }
    return (
        <>
            <Button variant="transparent" onClick={editItem}>
                <PencilSquare size={25} className="text-primary"></PencilSquare>
            </Button>
        </>)
})

export default EditButton

EditButton.propTypes = {
    item: PropTypes.object,
}