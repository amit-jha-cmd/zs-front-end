import { Checkbox, Pagination, Table } from "flowbite-react";
import { HiArrowUp } from "react-icons/hi";

export default function AppTable() {
  return (
    <div className="overflow-x-auto h-full flex flex-col">
      <div className={"border rounded flex-1 overflow-x-auto"}>
        <Table>
          <Table.Head>
            <Table.HeadCell align={"center"}>
              <div className={"flex items-center justify-between"}>
                <Checkbox className={"mx-5"} />
                Timestamp
                <HiArrowUp className={"mx-5"} />
              </div>
            </Table.HeadCell>
            <Table.HeadCell align={"center"}>
              <div className={"flex items-center justify-between"}>
                <Checkbox className={"mx-5"} />
                Attacker ID
                <HiArrowUp className={"mx-5"} />
              </div>
            </Table.HeadCell>
            <Table.HeadCell>
              <div className={"flex items-center justify-between"}>
                <Checkbox className={"mx-5"} />
                Attacker Name
                <HiArrowUp className={"mx-5"} />
              </div>
            </Table.HeadCell>
            <Table.HeadCell>
              <div className={"flex items-center justify-between"}>
                <Checkbox className={"mx-5"} />
                Attacker IP
                <HiArrowUp className={"mx-5"} />
              </div>
            </Table.HeadCell>
            <Table.HeadCell>
              <div className={"flex items-center justify-between"}>
                <Checkbox className={"mx-5"} />
                Type
                <HiArrowUp className={"mx-5"} />
              </div>
            </Table.HeadCell>
            <Table.HeadCell>
              <div className={"flex items-center justify-between"}>
                <Checkbox className={"mx-5"} />
                Decoy
                <HiArrowUp className={"mx-5"} />
              </div>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 h-10">
              <Table.Cell
                className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                align={"center"}
              >
                March 7th, 2PM
              </Table.Cell>
              <Table.Cell align={"center"}>10.2.3.2</Table.Cell>
              <Table.Cell align={"center"}>10.2.3.2</Table.Cell>
              <Table.Cell align={"center"}>Amit</Table.Cell>
              <Table.Cell align={"center"}>Sever</Table.Cell>
              <Table.Cell align={"center"}>232ws</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>

      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={0}
          totalPages={100}
          onPageChange={(s) => {}}
          showIcons
        />
      </div>
    </div>
  );
}
