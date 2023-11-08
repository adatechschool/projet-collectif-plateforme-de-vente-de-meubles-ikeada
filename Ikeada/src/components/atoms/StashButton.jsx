import { XSquare } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types"
import { observer } from 'mobx-react-lite'

const StashButton = observer(({ item }) => {
    function stash() {
        item.stashSelf()
    }
    return (
        <>
            <Button variant="transparent" onClick={stash}>
                <XSquare size={25} className="text-warning"></XSquare>
            </Button>
        </>)
})

StashButton.propTypes = {
    item: PropTypes.object
}

export default StashButton