import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { Spinner } from 'flowbite-react';
import { toast } from 'react-toastify';
import { AppDispatch } from 'lib/dao/store';
import { graphSelector } from 'features/graph/graphSlice';
import { fetchOverview } from 'features/graph/graphThunks';
import { dateRangeSelector } from 'features/dateRange/dateRangeSlice';

export default function TimeSeries() {
  const {
    status, isLoading, error, data,
  } = useSelector(graphSelector);
  const { startDateTime, endDateTime } = useSelector(dateRangeSelector);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchOverview());
  }, [dispatch, status, startDateTime, endDateTime]);

  useEffect(() => {
    if (status !== 'idle' && error) {
      toast.error(error);
    }
  }, [error, status]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      {isLoading ? (
        <Spinner size="xl" />
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="10 10" />
            <XAxis
              dataKey="minute"
              tickFormatter={(unixTime) => dayjs(unixTime).format('HH:MM')}
            />
            <YAxis
              label={{
                value: 'No. of attacks',
                angle: -90,
                position: 'insideLeft',
              }}
              domain={[0, 200]}
            />
            <Tooltip
              labelFormatter={(unixTime) => dayjs(unixTime).format('hh:MM A • MMM DD, YYYY')}
            />
            <Legend />
            <Line
              type="monotone"
              strokeWidth={2}
              dataKey="count"
              stroke="#2455a3"
              activeDot={{ r: 9 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
