import { XSquare } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
export default function StachButton() {
    function stashItem() {
        console.log("stash")
        // trigger UPDATE request for status
    }
    return (
        <>
            <Button variant="transparent"  onClick={stashItem}>
                <XSquare size={25} className="text-warning"></XSquare>
            </Button>
        </>)
}