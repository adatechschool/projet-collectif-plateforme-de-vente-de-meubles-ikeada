import { Check2Square } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
export default function StachButton() {
    function publishItem() {
        console.log("publish")
        // trigger UPDATE request for status
    }
    return (
        <>
            <Button variant="transparent" onClick={publishItem}>
                <Check2Square size={25} className="text-success" ></Check2Square>
            </Button>
        </>)
}