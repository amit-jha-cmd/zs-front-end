import {Checkbox, Table} from "flowbite-react";
import {tableSelector, updateSelectedColumn, updateSortBy} from "./tableSlice";
import {HiArrowUp, HiTrash} from "react-icons/hi";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../lib/dao/store";
import {headers} from "./tableUtils";

function TableHeader() {
    const {selectedColumns, sortBy} = useSelector(tableSelector);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <Table.Head>
            {
                headers.map(({name, value}) => (
                    <Table.HeadCell
                        align={"center"}
                        className={selectedColumns.includes(value) ? "bg-blue-200" : undefined}
                    >
                        <div className={"flex items-center justify-between"}>
                            <Checkbox
                                className={"mx-5"} checked={selectedColumns.includes(value)}
                                      onClick={() => dispatch(updateSelectedColumn(value))}
                            />
                            {name}
                            {
                                sortBy === value ?
                                <HiTrash
                                    size={15}
                                    className={"mx-5"}
                                    onClick={() => dispatch(updateSortBy(value))}
                                /> :
                                <HiArrowUp
                                    size={15}
                                    className={"mx-5"}
                                    onClick={() => dispatch(updateSortBy(value))}
                                />
                            }
                        </div>
                    </Table.HeadCell>
                ))
            }
        </Table.Head>
    );
}

export default TableHeader;