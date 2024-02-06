import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import {useDispatch, useSelector} from "react-redux";
import {graphSelector} from "./graphSlice";
import {useEffect} from "react";
import {AppDispatch} from "../../lib/dao/store";
import dayjs from "dayjs";
import {Spinner} from "flowbite-react";
import {toast} from "react-toastify";
import {fetchOverview} from "./graphThunks";

export default function TimeSeries() {
    const {status, isLoading, error, data} = useSelector(graphSelector);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchOverview());
        }
    }, [dispatch, status])

    useEffect(() => {
        if (status !== "idle" && error) {
            toast.error(error);
        }
    }, [error, status]);

    return (
        <div className={"w-full h-full flex justify-center items-center"}>
            {isLoading ? <Spinner size="xl"/> : <ResponsiveContainer width="100%" height="100%">
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
                    <CartesianGrid strokeDasharray="10 10"/>
                    <XAxis dataKey="minute" tickFormatter={(unixTime) => dayjs(unixTime).format("HH:MM")}/>
                    <YAxis label={{value: 'No. of attacks', angle: -90, position: 'insideLeft'}} domain={[0, 45]}/>
                    <Tooltip labelFormatter={(unixTime) => dayjs(unixTime).format("hh:MM A • MMM, DD, YYYY")}/>
                    <Legend/>
                    <Line type="monotone" strokeWidth={2} dataKey="count" stroke="#2455a3" activeDot={{r: 9}}/>
                </LineChart>
            </ResponsiveContainer>}
        </div>
    );
}
