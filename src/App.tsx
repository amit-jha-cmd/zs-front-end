import React from 'react';
import 'App.css';
import {Button} from "flowbite-react";
import { HiOutlineTable, HiPresentationChartLine, HiArrowRight } from 'react-icons/hi';
import {Outlet, useNavigate} from "react-router";

function App() {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center h-screen p-10">
            <div className="w-screen h-full rounded-md overflow-hidden shadow-md border bg-white flex flex-col">
                <div className="px-4 w-full border-b-2 border-gray-100 flex flex-row justify-between">
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
                    <div className={"flex justify-evenly items-center py-4"}>
                        <Button color="light">March 7th, 8:30PM </Button>
                        <HiArrowRight className="mx-2 h-5 w-5"/>
                        <Button color="light">March 10th, 8:30PM </Button>
                    </div>

                </div>
                <div className="px-6 py-4 flex-1 h-full">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}

export default App;
