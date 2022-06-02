import React, { useState, useMemo } from "react";
import Panel from "../../component/Panel";
import { Form, Button } from "react-bootstrap";
import useForm from "../../hook/useForm";
import Table from "../../component/Table";
import SelectBox, { SelectItem } from "../../component/SelectBox";
import CheckBox from "../../component/CheckBox";

function makeTableItem(addList, setAddList, id, name, email) {
  return {
    id,
    name,
    email,
    check: (
      <CheckBox
        checked={addList[id]}
        onChecked={() => {
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
      />
    ),
  };
}

function CreateSubjectPage() {
  const { value, handleChange } = useForm({ name: "" });

  const [addList, setAddList] = useState({});

  const temp = useMemo(
    () => [
      makeTableItem(
        addList,
        setAddList,
        parseInt(Math.random() * 100000000),
        "강선규",
        "123"
      ),
      makeTableItem(
        addList,
        setAddList,
        parseInt(Math.random() * 100000000),
        "강선규",
        "123"
      ),
      makeTableItem(
        addList,
        setAddList,
        parseInt(Math.random() * 100000000),
        "강선규",
        "123"
      ),
      makeTableItem(
        addList,
        setAddList,
        parseInt(Math.random() * 100000000),
        "강선규",
        "123"
      ),
      makeTableItem(
        addList,
        setAddList,
        parseInt(Math.random() * 100000000),
        "강선규",
        "123"
      ),
      makeTableItem(
        addList,
        setAddList,
        parseInt(Math.random() * 100000000),
        "강선규",
        "123"
      ),
      makeTableItem(
        addList,
        setAddList,
        parseInt(Math.random() * 100000000),
        "강선규",
        "123"
      ),
      makeTableItem(
        addList,
        setAddList,
        parseInt(Math.random() * 100000000),
        "강선규",
        "123"
      ),
      makeTableItem(
        addList,
        setAddList,
        parseInt(Math.random() * 100000000),
        "강선규",
        "123"
      ),
      makeTableItem(
        addList,
        setAddList,
        parseInt(Math.random() * 100000000),
        "강선규",
        "123"
      ),
      makeTableItem(
        addList,
        setAddList,
        parseInt(Math.random() * 100000000),
        "강선규",
        "123"
      ),
    ],
    []
  );

  return (
    <Panel>
      <div style={{ width: "720px" }}>
        <form>
          <Form.Label>과목 이름</Form.Label>
          <Form.Control
            value={value.name}
            type="text"
            name="name"
            onChange={handleChange}
          />
          <Form.Label style={{ marginTop: "10px" }}>학생 리스트</Form.Label>

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
            data={[
              makeTableItem(addList, setAddList, "201820802", "강선규", "123"),
              ...temp,
            ]}
          />
          <Button
            as="input"
            type="submit"
            style={{ width: "100%", marginTop: "20px" }}
            value="과목 생성"
          />
        </form>
      </div>
    </Panel>
  );
}

export default CreateSubjectPage;
