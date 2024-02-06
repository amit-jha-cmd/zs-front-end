import {Spinner} from "flowbite-react";

function AppProgressIndicator() {
    return (
        <div
            className={"h-full w-full flex justify-center items-center bg-opacity-70 bg-white absolute z-10"}>
            <Spinner size={"xl"}/>
        </div>
    );
}

export default AppProgressIndicator;