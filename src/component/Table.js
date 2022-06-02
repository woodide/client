import React, { useEffect, useState } from "react";
import { Column, usePagination, useTable, useFilters } from "react-table";
import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { matchSorter } from "match-sorter";

const LIST_NUM = 6;

const StyleTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 5px;
  border-style: hidden;
  box-shadow: 0 0 0 1px #cccccc;

  thead {
    border: 1px solid #ced4da;
  }

  tbody {
    tr {
      border: 1px solid #ced4da;
      height: 30px;
      td {
        height: 30px;
      }
    }
  }

  .search {
    outline: none;
    border: none;
  }
`;

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      className="search"
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}
export default function Table({ columns, data, style }) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );
  const {
    getTableProps, //table head
    getTableBodyProps, //table body
    headerGroups, // header 부분에 들어갈 data 담고있음.
    prepareRow, //각각의 data들을 한 줄씩 묶음으로 가공
    page, //전달한 data를 받는 곳
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 6 },
      defaultColumn,
      filterTypes,
    },
    useFilters,
    usePagination
  );

  const [pageNum, setPageNum] = useState(0);

  useEffect(() => {
    console.log("num", pageNum, pageCount, pageIndex);
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "285px",
        ...style,
      }}
    >
      <div>
        <StyleTable {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, i) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={`h-${i}`}>
                {headerGroup.headers.map((column, i) => (
                  <th {...column.getHeaderProps()} key={`h2-${i}`}>
                    {column.render("Header")}
                    <div>
                      {console.log(column)}
                      {column.id !== "check" && column.canFilter
                        ? column.render("Filter")
                        : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="tableBody" {...getTableBodyProps()}>
            {page.map((_page, i) => {
              prepareRow(_page);
              return (
                <tr className="trBody" {..._page.getRowProps()} key={`p-${i}`}>
                  {_page.cells.map((cell, i) => (
                    <td
                      className="tdBody"
                      {...cell.getCellProps()}
                      key={`c-${i}`}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </StyleTable>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        All Data: {data.length}
      </div>

      <div>
        <Paginations>
          <div className="buttonWrap">
            <span id="buttonList">
              {pageOptions
                .filter((v) => {
                  if (pageNum === 0) return 0 <= v && v <= LIST_NUM - 1;
                  else {
                    return (
                      pageNum * LIST_NUM - 1 < v &&
                      v <= LIST_NUM * (pageNum + 1) - 1
                    );
                  }
                })
                .map((v, i) => (
                  <button
                    className={`btnEach ${pageIndex === v ? "select" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      gotoPage(v);
                    }}
                    key={`b-${i}`}
                  >
                    {v + 1}
                  </button>
                ))}
            </span>
          </div>
        </Paginations>
      </div>
    </div>
  );
}

const Paginations = styled.div`
  & {
    display: flex;
    justify-content: center;
    height: 35px;
  }
  .buttonWrap {
    display: flex;
    align-items: center;
  }
  .arrow {
    background-color: #f9f9f9;
    border-radius: 10px;
    text-align: center;
    margin-left: 20px;
    margin-right: 20px;
    cursor: pointer;
    border: 1px solid #c2c2c2;
    width: 35px;
    height: 35px;
    color: #6418c3;
  }
  #buttonList {
    background-color: #f9f9f9;
    border-radius: 10px;

    .btnEach {
      background-color: #f9f9f9;
      width: 45px;
      height: 35px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-size: 15px;
      text-align: center;
      &.select {
        color: white;
        font-weight: 700;
        background: #1879c3 0% 0% no-repeat padding-box;
      }
    }
    .btnEach:hover {
      background: #1879c3 0% 0% no-repeat padding-box;
      transition: 0.2s;
      color: white;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
    }
  }
`;
