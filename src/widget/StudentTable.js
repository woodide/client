import React, { useMemo } from "react";
import Table from "../component/Table";
import SelectBox, { SelectItem } from "../component/SelectBox";
import CheckBox from "../component/CheckBox";
import { Form, Button } from "react-bootstrap";
import { useQuery } from "react-query";

export function makeTableItem(addList, studentNumber, username, email) {
  return;
}

function StudentTable({ addList, setAddList, subject }) {
  const { data: allStudents } = useQuery(["professor", "all_student"]);
  // const { data: students } = useQuery([
  //   "professor",
  //   "subject",
  //   "student",
  //   "F091",
  // ]);
  const tableItem =
    allStudents?.map(({ username, email, studentNumber }) => ({
      studentNumber,
      username,
      email,
      check: (
        <CheckBox
          checked={addList[studentNumber]}
          style={{ marginLeft: "5px" }}
        />
      ),
    })) ?? [];

  return (
    <div>
      <SelectBox>
        {Object.keys(addList).map((select, i) => (
          <SelectItem
            key={`select-${i}`}
            value={select}
            onClick={() => {
              setAddList((data) => {
                const newData = { ...data };
                delete newData[select];
                return newData;
              });
            }}
          />
        ))}
      </SelectBox>
      <Table
        style={{ marginTop: "10px" }}
        onItemClick={(_data) => {
          const { studentNumber } = _data;
          console.log(_data);
          if (addList[studentNumber]) {
            setAddList((data) => {
              const newData = { ...data };
              delete newData[studentNumber];
              return newData;
            });
          } else {
            setAddList((data) => {
              const newData = { ...data };
              newData[studentNumber] = true;
              return newData;
            });
          }
        }}
        columns={[
          {
            accessor: "studentNumber",
            Header: "학번",
          },
          {
            accessor: "username",
            Header: "이름",
          },
          {
            accessor: "email",
            Header: "이메일",
          },
          {
            accessor: "check",
            Header: "추가",
          },
        ]}
        data={tableItem}
      />
    </div>
  );
}

export default StudentTable;
