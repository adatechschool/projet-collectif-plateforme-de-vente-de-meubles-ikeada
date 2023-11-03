import { TrashFill } from "react-bootstrap-icons"
import { Button } from "react-bootstrap"
export default function EditButton() {
    function deleteItem() {
        console.log("delete")
        // trigger POST request
    }
    return (
        <>
            <Button variant="transparent" onClick={deleteItem}>
                <TrashFill size={25} className="text-danger"></TrashFill>
            </Button>
        </>)
}