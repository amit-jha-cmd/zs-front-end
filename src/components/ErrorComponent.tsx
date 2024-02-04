import {Button} from "flowbite-react";
import { HiOutlineArrowRight } from 'react-icons/hi';
import {useNavigate} from "react-router";

export default function ErrorComponent() {
    const navigate = useNavigate();

    return (
        <div className={"flex justify-center items-center flex-col h-screen"}>
            <h1 className={"text-9xl"}>404</h1>
            <h3 className={"mb-5"}>Hmm, we are not sure how you landed here</h3>
            <Button onClick={() => navigate("/")}>
                Go to Home
                <HiOutlineArrowRight className="ml-2 h-5 w-5" />
            </Button>
        </div>
    );
}