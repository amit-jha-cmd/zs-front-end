import {Checkbox, Table} from "flowbite-react";
import {tableSelector, updateSelectedColumn} from "./tableSlice";
import {HiArrowUp} from "react-icons/hi";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../lib/dao/store";
import dayjs from "dayjs";

const headers = ["Timestamp", "Attacker Id", "Attacker Name", "Attacker Ip", "Type", "Decoy"];


function TableHeader() {
    const {data, selectedColumns} = useSelector(tableSelector);
    const dispatch = useDispatch<AppDispatch>();

    return (<>
            <Table.Head>
                {
                    headers.map((header) => (
                        <Table.HeadCell align={"center"}
                                        className={selectedColumns.includes(header) ? "bg-blue-200" : undefined}>
                            <div className={"flex items-center justify-between"}>
                                <Checkbox className={"mx-5"} checked={selectedColumns.includes(header)}
                                          onClick={() => dispatch(updateSelectedColumn(header))}/>
                                {header}
                                <HiArrowUp className={"mx-5"}/>
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
                                className={selectedColumns.includes("Timestamp") ? "whitespace-nowrap font-medium text-gray-900 dark:text-white bg-blue-50" : "whitespace-nowrap font-medium text-gray-900 dark:text-white"}
                                align={"center"}
                            >
                                {dayjs(item.timestamp).format("HH:MM A • MMM DD, YYYY")}
                            </Table.Cell>
                            <Table.Cell align={"center"}
                                        className={selectedColumns.includes("Attacker Id") ? "whitespace-nowrap font-medium text-gray-900 dark:text-white bg-blue-50" : ""}>{item.attackerId}</Table.Cell>
                            <Table.Cell align={"center"}
                                        className={selectedColumns.includes("Attacker Name") ? "whitespace-nowrap font-medium text-gray-900 dark:text-white bg-blue-50" : ""}>{item.attackerName}</Table.Cell>
                            <Table.Cell align={"center"}
                                        className={selectedColumns.includes("Attacker Ip") ? "whitespace-nowrap font-medium text-gray-900 dark:text-white bg-blue-50" : ""}>{item.attackerIp}</Table.Cell>
                            <Table.Cell align={"center"}
                                        className={selectedColumns.includes("Type") ? "whitespace-nowrap font-medium text-gray-900 dark:text-white bg-blue-50" : ""}>{item.type}</Table.Cell>
                            <Table.Cell align={"center"}
                                        className={selectedColumns.includes("Decoy") ? "whitespace-nowrap font-medium text-gray-900 dark:text-white bg-blue-50" : ""}>{item.decoyName}</Table.Cell>
                        </Table.Row>
                    ))
                }
            </Table.Body>
        </>
    );
}

export default TableHeader;