import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton() {
    // navigate variable
    const navigate = useNavigate()

    // function for clicking back button
    function handleClickBack(e) {
        // prevent default action of form reloading
        e.preventDefault()

        // sending page back by 1 step
        navigate(-1)
    }

    return (
        <Button
            type='back'
            onClick={handleClickBack}
        >&larr; Back</Button>
    )
}

export default BackButton
