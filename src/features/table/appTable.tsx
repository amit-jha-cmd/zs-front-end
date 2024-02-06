import {Pagination, Table} from "flowbite-react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../lib/dao/store";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {jumpToPage, tableSelector} from "./tableSlice";
import {fetchAttacks} from "./tableThunks";
import {dateRangeSelector} from "../dateRange/dateRangeSlice";
import AppProgressIndicator from "../../components/appProgressIndicator";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

export default function AppTable() {
    const {status, isLoading, data, error, pageNumber, sortBy} = useSelector(tableSelector);
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
            <div className={"relative h-full"}>
                {
                    isLoading ? <AppProgressIndicator/> : <></>
                }
                <div className="h-full flex flex-col">
                    <div className={"border rounded-md flex-1 overflow-x-auto"}>
                        <Table>
                            <TableHeader/>
                            <TableBody/>
                        </Table>
                    </div>
                    {
                        data.length === 0 ? <></> : <div className="flex overflow-x-auto sm:justify-center">
                            <Pagination
                                currentPage={pageNumber}
                                totalPages={100}
                                onPageChange={(pageNumber) => {
                                    dispatch(jumpToPage(pageNumber));
                                }}
                                showIcons
                            />
                        </div>
                    }
                </div>
            </div>
        </>
    );
}
