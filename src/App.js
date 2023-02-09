import axios from "axios";
import { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios("https://sheet2api.com/v1/zeEGv9a4RCue/spredsheet").then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  };
  const emailFormatter = (data, row) => {
    return <span>{data}</span>;
  };
  const columns = [
    {
      dataField: "Name",
      text: "Name",
      sort: true,
      formatter: emailFormatter,
    },
    {
      dataField: "Age",
      text: "Age",

      sort: true,
      validator: (newValue, row, column) => {
        if (isNaN(newValue)) {
          return {
            valid: false,
            message: "Please enter numeric value",
          };
        }
        return true;
      },
    },
    {
      dataField: "Add",
      text: "Address",
      sort: true,
      editable: false,
    },
    {
      dataField: "Dep",
      text: "Department",
      editor: {
        type: Type.SELECT,
        options: [
          {
            value: "A",
            label: "A",
          },
          {
            value: "B",
            label: "B",
          },
        ],
      },
    },
  ];
  return (
    <div className="App">
      <BootstrapTable
        keyField="id"
        data={data}
        columns={columns}
        striped
        hover
        condensed
        pagination={paginationFactory()}
        cellEdit={cellEditFactory({
          mode: "dbclick",
          blurToSave: true,
          nonEditableRows: () => [1, 2, 3],
        })}
        // selectRow={selectRow}
        filter={filterFactory()}
      />
    </div>
  );
}

export default App;
