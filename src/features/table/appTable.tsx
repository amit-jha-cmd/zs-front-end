import {Checkbox, Pagination, Spinner, Table} from "flowbite-react";
import {HiArrowUp} from "react-icons/hi";
import {useDispatch, useSelector} from "react-redux";
import {graphSelector} from "../graph/graphSlice";
import {AppDispatch} from "../../lib/dao/store";
import {useEffect} from "react";
import {fetchOverview} from "../graph/graphThunks";
import {toast} from "react-toastify";
import {jumpToPage, tableSelector} from "./tableSlice";
import {fetchAttacks} from "./tableThunks";
import dayjs from "dayjs";
import {dateRangeSelector} from "../dateRange/dateRangeSlice";

export default function AppTable() {
    const {status, isLoading, error, data, pageNumber} = useSelector(tableSelector);
    const {startDateTime, endDateTime} = useSelector(dateRangeSelector);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchAttacks());
        }
    }, [dispatch, status])

    useEffect(() => {
        if (status !== "idle" && error) {
            toast.error(error);
        }
    }, [error, status]);

    useEffect(() => {
        dispatch(fetchAttacks());
    }, [dispatch, pageNumber, startDateTime, endDateTime]);

    return (
        <>
            {isLoading ? <div className={"h-full w-full flex justify-center items-center"}>
                <Spinner size={"xl"}/>
            </div> : <div className="overflow-x-auto h-full flex flex-col">
                <div className={"border rounded flex-1 overflow-x-auto"}>
                    <Table>
                        <Table.Head>
                            <Table.HeadCell align={"center"}>
                                <div className={"flex items-center justify-between"}>
                                    <Checkbox className={"mx-5"}/>
                                    Timestamp
                                    <HiArrowUp className={"mx-5"}/>
                                </div>
                            </Table.HeadCell>
                            <Table.HeadCell align={"center"}>
                                <div className={"flex items-center justify-between"}>
                                    <Checkbox className={"mx-5"}/>
                                    Attacker ID
                                    <HiArrowUp className={"mx-5"}/>
                                </div>
                            </Table.HeadCell>
                            <Table.HeadCell>
                                <div className={"flex items-center justify-between"}>
                                    <Checkbox className={"mx-5"}/>
                                    Attacker Name
                                    <HiArrowUp className={"mx-5"}/>
                                </div>
                            </Table.HeadCell>
                            <Table.HeadCell>
                                <div className={"flex items-center justify-between"}>
                                    <Checkbox className={"mx-5"}/>
                                    Attacker IP
                                    <HiArrowUp className={"mx-5"}/>
                                </div>
                            </Table.HeadCell>
                            <Table.HeadCell>
                                <div className={"flex items-center justify-between"}>
                                    <Checkbox className={"mx-5"}/>
                                    Type
                                    <HiArrowUp className={"mx-5"}/>
                                </div>
                            </Table.HeadCell>
                            <Table.HeadCell>
                                <div className={"flex items-center justify-between"}>
                                    <Checkbox className={"mx-5"}/>
                                    Decoy
                                    <HiArrowUp className={"mx-5"}/>
                                </div>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {
                                data.map((item, index) => (
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 h-10">
                                        <Table.Cell
                                            className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                                            align={"center"}
                                        >
                                            {dayjs(item.timestamp).format("HH:MM A • MMM DD, YYYY")}
                                        </Table.Cell>
                                        <Table.Cell align={"center"}>{item.attackerId}</Table.Cell>
                                        <Table.Cell align={"center"}>{item.attackerName}</Table.Cell>
                                        <Table.Cell align={"center"}>{item.attackerIp}</Table.Cell>
                                        <Table.Cell align={"center"}>{item.type}</Table.Cell>
                                        <Table.Cell align={"center"}>{item.decoyName}</Table.Cell>
                                    </Table.Row>
                                ))
                            }
                        </Table.Body>
                    </Table>
                </div>

                <div className="flex overflow-x-auto sm:justify-center">
                    <Pagination
                        currentPage={pageNumber}
                        totalPages={100}
                        onPageChange={(pageNumber) => {
                            dispatch(jumpToPage(pageNumber));
                        }}
                        showIcons
                    />
                </div>
            </div>}
        </>
    );
}
