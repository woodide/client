import React, { useMemo } from "react";
import Table from "../component/Table";
import SelectBox, { SelectItem } from "../component/SelectBox";
import CheckBox from "../component/CheckBox";
import { Form, Button } from "react-bootstrap";

export function makeTableItem(addList, id, name, email) {
  return {
    id,
    name,
    email,
    check: <CheckBox checked={addList[id]} />,
  };
}

function StudentTable({ addList, setAddList }) {
  const temp = useMemo(
    () => [
      makeTableItem(
        addList,
        parseInt(Math.random() * 100000000),
        "강선규",
        "123"
      ),
      makeTableItem(
        addList,
        parseInt(Math.random() * 100000000),
        "강선규",
        "123"
      ),
      makeTableItem(
        addList,
        parseInt(Math.random() * 100000000),
        "강선규",
        "123"
      ),
      makeTableItem(
        addList,
        parseInt(Math.random() * 100000000),
        "강선규",
        "123"
      ),
      makeTableItem(
        addList,
        parseInt(Math.random() * 100000000),
        "강선규",
        "123"
      ),
      makeTableItem(
        addList,
        parseInt(Math.random() * 100000000),
        "강선규",
        "123"
      ),
      makeTableItem(
        addList,
        parseInt(Math.random() * 100000000),
        "강선규",
        "123"
      ),
      makeTableItem(
        addList,
        parseInt(Math.random() * 100000000),
        "강선규",
        "123"
      ),
      makeTableItem(
        addList,
        parseInt(Math.random() * 100000000),
        "강선규",
        "123"
      ),
      makeTableItem(
        addList,
        parseInt(Math.random() * 100000000),
        "강선규",
        "123"
      ),
      makeTableItem(
        addList,
        parseInt(Math.random() * 100000000),
        "강선규",
        "123"
      ),
    ],
    []
  );

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
          const { id } = _data;
          console.log(_data);
          if (addList[id]) {
            setAddList((data) => {
              const newData = { ...data };
              delete newData[id];
              return newData;
            });
          } else {
            setAddList((data) => {
              const newData = { ...data };
              newData[id] = true;
              return newData;
            });
          }
        }}
        columns={[
          {
            accessor: "id",
            Header: "학번",
          },
          {
            accessor: "name",
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
        data={[makeTableItem(addList, "201820802", "강선규", "123"), ...temp]}
      />
    </div>
  );
}

export default StudentTable;
