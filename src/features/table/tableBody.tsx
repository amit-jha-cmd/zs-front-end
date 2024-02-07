import React from 'react';
import { Table } from 'flowbite-react';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import {
  attackerId,
  attackerIp,
  attackerName,
  decoy,
  timestamp,
  type,
} from 'features/table/tableUtils';
import { tableSelector } from 'features/table/tableSelectors';

function TableBody() {
  const { data, selectedColumns } = useSelector(tableSelector);

  return (
    <Table.Body className="divide-y">
      {data.map((item) => {
        let timestampStyle = 'selected-column-row';
        let attackerIdStyle = 'selected-column-row';
        let attackerNameStyle = 'selected-column-row';
        let attackerIpStyle = 'selected-column-row';
        let typeStyle = 'selected-column-row';
        let decoyStyle = 'selected-column-row';

        if (!selectedColumns.includes(timestamp.value)) {
          timestampStyle = 'unselected-column-row';
        }

        if (!selectedColumns.includes(attackerId.value)) {
          attackerIdStyle = '';
        }

        if (!selectedColumns.includes(attackerName.value)) {
          attackerNameStyle = '';
        }

        if (!selectedColumns.includes(attackerIp.value)) {
          attackerIpStyle = '';
        }

        if (!selectedColumns.includes(type.value)) {
          typeStyle = '';
        }

        if (!selectedColumns.includes(decoy.value)) {
          decoyStyle = '';
        }

        return (
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 h-10">
            <Table.Cell className={timestampStyle} align="center">
              {dayjs(item.timestamp).format('HH:MM A • MMM DD, YYYY')}
            </Table.Cell>
            <Table.Cell align="center" className={attackerIdStyle}>
              {item.attackerId}
            </Table.Cell>
            <Table.Cell align="center" className={attackerNameStyle}>
              {item.attackerName}
            </Table.Cell>
            <Table.Cell align="center" className={attackerIpStyle}>
              {item.attackerIp}
            </Table.Cell>
            <Table.Cell align="center" className={typeStyle}>
              {item.type}
            </Table.Cell>
            <Table.Cell align="center" className={decoyStyle}>
              {item.decoyName}
            </Table.Cell>
          </Table.Row>
        );
      })}
    </Table.Body>
  );
}

export default TableBody;
