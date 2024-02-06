import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../lib/dao/store";
import {dateRangeSelector, updateEndDateTime, updateStartDateTime} from "./dateRangeSlice";
import {HiArrowRight, HiPencil} from "react-icons/hi";
import {useState} from "react";
import {Button, Modal} from "flowbite-react";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function DateTimeRangeSelector() {
    const [openModal, setOpenModal] = useState(false);
    const {startDateTime, endDateTime} = useSelector(dateRangeSelector);
    const [unsavedStartDateTime, setUnsavedStartDateTime] = useState(dayjs(startDateTime));
    const [unsavedEndDateTime, setUnsavedEndDateTime] = useState(dayjs(endDateTime));
    const dispatch = useDispatch<AppDispatch>();

    return (
        <>
            <div
                className={"flex flex-row border rounded-md items-center cursor-pointer hover:shadow-md active:shadow-none"}
                onClick={() => setOpenModal(true)}
            >
                <div
                    className={
                        "flex justify-evenly items-center p-4 h-12 border-r-2 border-gray-100"
                    }
                >
                    <p>{dayjs(startDateTime).format("DD/MM/YYYY - HH:MM A")}</p>
                    <HiArrowRight className="mx-2 h-5 w-5"/>
                    <p>{dayjs(endDateTime).format("DD/MM/YYYY - HH:MM A")}</p>
                </div>
                <div className={"flex justify-center w-10"}>
                    <HiPencil className="h-5 w-5"/>
                </div>
            </div>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Terms of Service</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Select the date range in which you want to see all the attacks on the decoys
                        </p>
                        <div className={"flex flex-row items-center justify-center"}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    defaultValue={unsavedStartDateTime}
                                    onChange={(date) => {
                                        if (date) {
                                            setUnsavedStartDateTime(date);
                                        }
                                    }
                                    }
                                    slotProps={{textField: {size: 'small'}}}
                                />
                            </LocalizationProvider>
                            <HiArrowRight className="mx-2 h-5 w-5"/>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    minDateTime={unsavedStartDateTime}
                                    defaultValue={unsavedEndDateTime}
                                    onChange={(date) => {
                                        if (date) {
                                            setUnsavedEndDateTime(date);
                                        }
                                    }
                                    }
                                    slotProps={{textField: {size: 'small'}}}
                                />
                            </LocalizationProvider>
                        </div>
                        <p className="text-base leading-relaxed text-red-500 font-mono">
                            For the purpose of this interview task the data provided was from Aug 4th to Aug 6th, 2021
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {
                        setOpenModal(false);
                        dispatch(updateStartDateTime(unsavedStartDateTime.toISOString()));
                        dispatch(updateEndDateTime(unsavedEndDateTime.toISOString()));
                    }}>Save</Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DateTimeRangeSelector;