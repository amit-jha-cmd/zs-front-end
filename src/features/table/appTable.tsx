import {Checkbox, Pagination, Spinner, Table} from "flowbite-react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../lib/dao/store";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {jumpToPage, tableSelector, updateSelectedColumn, updateSortBy} from "./tableSlice";
import {fetchAttacks} from "./tableThunks";
import {dateRangeSelector} from "../dateRange/dateRangeSlice";
import {HiArrowUp, HiTrash} from "react-icons/hi";
import dayjs from "dayjs";

const timestamp = {
    name: "Timestamp",
    value: "timestamp"
};

const attackerId = {
    name: "Attacker Id",
    value: "attackerId"
};

const attackerName = {
    name: "Attacker Name",
    value: "attackerName"
}

const attackerIp = {
    name: "Attacker Ip",
    value: "attackerIp"
};

const type = {
    name: "Type",
    value: "type"
};

const decoy = {
    name: "Decoy",
    value: "decoyName"
};

const headers = [
    timestamp,
    attackerId,
    attackerName,
    attackerIp,
    type,
    decoy,
];

export default function AppTable() {
    const {status, isLoading, data, error, pageNumber, selectedColumns, sortBy} = useSelector(tableSelector);
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
    }, [dispatch, pageNumber, startDateTime, endDateTime, sortBy]);

    return (
        <>
            <div className={"relative"}>
                {
                    isLoading ? <div
                        className={"h-full w-full flex justify-center items-center bg-opacity-70 bg-white absolute z-10"}>
                        <Spinner size={"xl"}/>
                    </div> : <div></div>
                }
                <div className="overflow-x-auto h-full flex flex-col">
                    <div className={"border rounded-md flex-1 overflow-x-auto"}>
                        <Table>
                            <Table.Head>
                                {
                                    headers.map(({name, value}) => (
                                        <Table.HeadCell align={"center"}
                                                        className={selectedColumns.includes(value) ? "bg-blue-200" : undefined}>
                                            <div className={"flex items-center justify-between"}>
                                                <Checkbox className={"mx-5"} checked={selectedColumns.includes(value)}
                                                          onClick={() => dispatch(updateSelectedColumn(value))}/>
                                                {name}
                                                {sortBy === value ?
                                                    <HiTrash size={15} className={"mx-5"}
                                                             onClick={() => dispatch(updateSortBy(value))}/> :
                                                    <HiArrowUp size={15} className={"mx-5"}
                                                               onClick={() => dispatch(updateSortBy(value))}/>}
                                            </div>
                                        </Table.HeadCell>
                                    ))
                                }
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {
                                    data.map((item, index) => (
                                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 h-10">
                                            <Table.Cell
                                                className={selectedColumns.includes(timestamp.name) ? "whitespace-nowrap font-medium text-gray-900 dark:text-white bg-blue-50" : "whitespace-nowrap font-medium text-gray-900 dark:text-white"}
                                                align={"center"}
                                            >
                                                {dayjs(item.timestamp).format("HH:MM A • MMM DD, YYYY")}
                                            </Table.Cell>
                                            <Table.Cell align={"center"}
                                                        className={selectedColumns.includes(attackerId.name) ? "whitespace-nowrap font-medium text-gray-900 dark:text-white bg-blue-50" : ""}>{item.attackerId}</Table.Cell>
                                            <Table.Cell align={"center"}
                                                        className={selectedColumns.includes(attackerName.name) ? "whitespace-nowrap font-medium text-gray-900 dark:text-white bg-blue-50" : ""}>{item.attackerName}</Table.Cell>
                                            <Table.Cell align={"center"}
                                                        className={selectedColumns.includes(attackerIp.name) ? "whitespace-nowrap font-medium text-gray-900 dark:text-white bg-blue-50" : ""}>{item.attackerIp}</Table.Cell>
                                            <Table.Cell align={"center"}
                                                        className={selectedColumns.includes(type.name) ? "whitespace-nowrap font-medium text-gray-900 dark:text-white bg-blue-50" : ""}>{item.type}</Table.Cell>
                                            <Table.Cell align={"center"}
                                                        className={selectedColumns.includes(decoy.name) ? "whitespace-nowrap font-medium text-gray-900 dark:text-white bg-blue-50" : ""}>{item.decoyName}</Table.Cell>
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
                </div>
            </div>
        </>
    );
}
