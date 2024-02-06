import "App.css";
import {Button} from "flowbite-react";
import {
    HiOutlineTable,
    HiPresentationChartLine,
} from "react-icons/hi";
import {Outlet, useNavigate} from "react-router";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DateTimeRangeSelector from "./features/dateRange/dateTimeRangeSelector";

function App() {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center h-screen p-10">
            <div className="w-screen h-full rounded-md overflow-hidden shadow-md border bg-white flex flex-col">
                <div className="px-4 w-full border-b-2 border-gray-100 flex flex-row justify-between items-center">
                    <div className={"py-4"}>
                        <Button.Group>
                            <Button color="gray" onClick={() => navigate("graph")}>
                                <HiPresentationChartLine className="mr-3 h-4 w-4"/>
                                Graph
                            </Button>
                            <Button color="gray" onClick={() => navigate("table")}>
                                <HiOutlineTable className="mr-3 h-4 w-4"/>
                                Table
                            </Button>
                        </Button.Group>
                    </div>
                    <DateTimeRangeSelector/>
                </div>
                <div className="px-6 py-4 flex-1 h-full overflow-y-auto">
                    <Outlet/>
                </div>
            </div>
            <ToastContainer position={"bottom-right"}/>
        </div>
    );
}

export default App;
