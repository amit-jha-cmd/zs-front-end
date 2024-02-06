import {Checkbox, Pagination, Spinner, Table} from "flowbite-react";
import {HiArrowUp} from "react-icons/hi";
import {useDispatch, useSelector} from "react-redux";
import {graphSelector} from "../graph/graphSlice";
import {AppDispatch} from "../../lib/dao/store";
import {useEffect} from "react";
import {fetchOverview} from "../graph/graphThunks";
import {toast} from "react-toastify";
import {jumpToPage, tableSelector, updateSelectedColumn} from "./tableSlice";
import {fetchAttacks} from "./tableThunks";
import dayjs from "dayjs";
import {dateRangeSelector} from "../dateRange/dateRangeSlice";
import TableHeader from "./tableHeader";

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
                        <TableHeader />
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
