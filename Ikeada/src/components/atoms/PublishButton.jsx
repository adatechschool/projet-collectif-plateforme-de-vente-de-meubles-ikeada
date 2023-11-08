import { Check2Square } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import PropTypes from 'prop-types'
import { observer } from 'mobx-react-lite'

const PublishButton = observer(({ item }) => {
    function publish() {
        item.publishSelf()
    }
    return (
        <>
            <Button variant="transparent" onClick={publish}>
                <Check2Square size={25} className="text-success" ></Check2Square>
            </Button>
        </>)
})

PublishButton.propTypes = {
    item: PropTypes.object
}

export default PublishButton