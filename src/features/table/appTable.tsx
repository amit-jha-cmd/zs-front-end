import { Pagination, Table } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { AppDispatch } from 'lib/dao/store';
import { jumpToPage } from 'features/table/tableSlice';
import { fetchAttacks } from 'features/table/tableThunks';
import { dateRangeSelector } from 'features/dateRange/dateRangeSlice';
import AppProgressIndicator from 'components/appProgressIndicator';
import TableHeader from 'features/table/tableHeader';
import TableBody from 'features/table/tableBody';
import { tableSelector } from 'features/table/tableSelectors';

export default function AppTable() {
  const {
    status, isLoading, data, error, pageNumber, sortBy,
  } = useSelector(tableSelector);
  const { startDateTime, endDateTime } = useSelector(dateRangeSelector);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAttacks());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (status !== 'idle' && error) {
      toast.error(error);
    }
  }, [error, status]);

  useEffect(() => {
    dispatch(fetchAttacks());
  }, [dispatch, pageNumber, startDateTime, endDateTime, sortBy]);

  return (
    <div className="relative h-full">
      {isLoading ? <AppProgressIndicator /> : <div />}
      <div className="h-full flex flex-col">
        <div className="border rounded-md flex-1 overflow-x-auto">
          <Table>
            <TableHeader />
            <TableBody />
          </Table>
        </div>
        {data.length === 0 ? (
          <div />
        ) : (
          <div className="flex overflow-x-auto sm:justify-center">
            <Pagination
              currentPage={pageNumber}
              totalPages={100}
              onPageChange={(pNumber) => {
                dispatch(jumpToPage(pNumber));
              }}
              showIcons
            />
          </div>
        )}
      </div>
    </div>
  );
}
