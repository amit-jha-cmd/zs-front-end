import "App.css";
import { Button } from "flowbite-react";
import {
  HiOutlineTable,
  HiPresentationChartLine,
  HiArrowRight,
  HiPencil,
} from "react-icons/hi";
import { Outlet, useNavigate } from "react-router";

function App() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen p-10">
      <div className="w-screen h-full rounded-md overflow-hidden shadow-md border bg-white flex flex-col">
        <div className="px-4 w-full border-b-2 border-gray-100 flex flex-row justify-between items-center">
          <div className={"py-4"}>
            <Button.Group>
              <Button color="gray" onClick={() => navigate("graph")}>
                <HiPresentationChartLine className="mr-3 h-4 w-4" />
                Graph
              </Button>
              <Button color="gray" onClick={() => navigate("table")}>
                <HiOutlineTable className="mr-3 h-4 w-4" />
                Table
              </Button>
            </Button.Group>
          </div>
          <div className={"flex flex-row border rounded-md items-center"}>
            <div
              className={
                "flex justify-evenly items-center p-4 h-12 border-r-2 border-gray-100"
              }
            >
              <p>23/04/2022</p>
              {/*<LocalizationProvider dateAdapter={AdapterDayjs}>*/}
              {/*    <DateTimePicker*/}
              {/*        defaultValue={dayjs('2022-04-17T15:30')}*/}
              {/*        slotProps={{ textField: { size: 'small' } }}*/}
              {/*    />*/}
              {/*</LocalizationProvider>*/}
              <HiArrowRight className="mx-2 h-5 w-5" />
              {/*<LocalizationProvider  dateAdapter={AdapterDayjs}>*/}
              {/*    <DateTimePicker*/}
              {/*        slotProps={{ textField: { size: 'small' } }}*/}
              {/*        defaultValue={dayjs('2022-04-17T15:30')}*/}
              {/*    />*/}
              {/*</LocalizationProvider>*/}
              <p>23/04/2022</p>
            </div>
            <div className={"flex justify-center w-10"}>
              <HiPencil className="h-5 w-5" />
            </div>
          </div>
        </div>
        <div className="px-6 py-4 flex-1 h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
