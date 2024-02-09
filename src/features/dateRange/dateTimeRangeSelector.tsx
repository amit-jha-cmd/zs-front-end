import { useDispatch, useSelector } from 'react-redux';
import { HiArrowRight, HiPencil, HiCalendar } from 'react-icons/hi';
import React, { useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import {
  dateRangeSelector,
  updateEndDateTime,
  updateStartDateTime,
} from 'features/dateRange/dateRangeSlice';
import { AppDispatch } from 'lib/dao/store';
import 'features/dateRange/dateRangeStyle.css';

function DateTimeRangeSelector() {
  const [openModal, setOpenModal] = useState(false);
  const { startDateTime, endDateTime } = useSelector(dateRangeSelector);
  const [unsavedStartDateTime, setUnsavedStartDateTime] = useState(
    dayjs(startDateTime),
  );
  const [unsavedEndDateTime, setUnsavedEndDateTime] = useState(
    dayjs(endDateTime),
  );
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <button type="button" aria-label="Date Selector" onClick={() => setOpenModal(true)}>
        <div className="date-range-main">
          <div className="date-range-main-content">
            <HiCalendar className="h-5 w-5" />
          </div>
          <div className="flex justify-center w-10">
            <HiPencil className="h-5 w-5" />
          </div>
        </div>
      </button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Date & Time Selector</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Select the date range in which you want to see all the attacks on
              the decoys
            </p>
            <div className="flex flex-row items-center justify-center">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  defaultValue={unsavedStartDateTime}
                  onChange={(date) => {
                    if (date) {
                      setUnsavedStartDateTime(date);
                    }
                  }}
                  slotProps={{ textField: { size: 'small' } }}
                />
              </LocalizationProvider>
              <HiArrowRight className="mx-2 h-5 w-5" />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  minDateTime={unsavedStartDateTime}
                  defaultValue={unsavedEndDateTime}
                  onChange={(date) => {
                    if (date) {
                      setUnsavedEndDateTime(date);
                    }
                  }}
                  slotProps={{ textField: { size: 'small' } }}
                />
              </LocalizationProvider>
            </div>
            <p className="text-base leading-relaxed text-red-500 font-mono">
              For the purpose of this interview task the data provided was from
              Aug 7th to Aug 9th, 2021
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setOpenModal(false);
              dispatch(updateStartDateTime(unsavedStartDateTime.toISOString()));
              dispatch(updateEndDateTime(unsavedEndDateTime.toISOString()));
            }}
          >
            Save
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DateTimeRangeSelector;
