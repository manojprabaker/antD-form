import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateReduxState } from "../Redux/Slice";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Table } from "antd";
import { Button } from "antd";
import {
  DeleteFilled,
  EditFilled 
} from '@ant-design/icons';

const TableData = () => {
  const globalDispatch = useDispatch();
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },{
      title: "Date",
      dataIndex: "date",
      render:(date)=><>{dateFormatFn(date)}</>
    },

    {
      title: "Actions",
      dataIndex: "actions",
      render: (text) => (
        <>
          <Button type="primary" shape="circle" onClick={() => handleEdit(text)}>
            <EditFilled />
          </Button>{" "}
          <Button type="primary" danger shape="circle" onClick={() => handleDelete(text)}>
          <DeleteFilled/>
          </Button>
        </>
      ),
    },
  ];
  const reduxState = useSelector(({ data }) => data);
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    pushDataToTable();
  }, [reduxState?.arr]);
  const pushDataToTable = () => {
    let data = [];
    if (reduxState?.arr?.length === 0) {
      setTableData([...data]);
    } else {
      reduxState?.arr?.forEach((element, index) => {
        data.push({
          key: index,
          name: element?.name,
          email: element?.email,
          gender: element?.gender,
          date:element?.date,
          actions: index,
        });
        
      });
      setTableData([...data]);
    }
  };
  const triggerSuccessToast = (message) => {
    toast.success(
      <p className="mx-2 tx-16 d-flex align-items-center mb-0 ">{message}</p>
    );
  };
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dateFormatFn = (str) => {
    const date = new Date(str);
    let currDate = date.getDate();
    let currMonth = months[date.getMonth()];
    let currYear = date.getFullYear();
    return `${currDate} ${currMonth} ${currYear}`;
  };

  const handleDelete = (index) => {
    Swal.fire({
      title: "Are you sure want to delete",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        let tempData = reduxState?.arr.filter((e, i) => i !== index);
        globalDispatch(updateReduxState({ arr: tempData }));

        triggerSuccessToast("Record Deleted Successfully");
      }
    });
  };
  const handleEdit = (index) => {
 
    globalDispatch(updateReduxState({ editIndex: index }));
    document.documentElement.scrollTop = 0;
  };
  return (
    <>
      <div className="container">
        <Table bordered={true} dataSource={tableData} columns={columns} />
        {/* <table className="table table-hover table-striped table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Designation</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reduxState?.arr?.length != 0 ? (
              reduxState?.arr?.map((item, index) => {
                return (
                  <>
                    <tr>
                      <td>{item?.name}</td>
                      <td>{item?.email}</td>
                      <td>{item?.gender}</td>
                      <td>{item?.jobRole}</td>
                      <td>{dateFormatFn(item?.date)}</td>
                      <td>
                        <button
                          className="btn btn-secondary"
                          onClick={() => {
                            globalDispatch(
                              updateReduxState({ editIndex: index })
                            );
                            document.documentElement.scrollTop = 0;
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            handleDelete(index);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })
            ) : (
              <>
                <tr className="text-center fs-2">
                  <td colSpan={6}>No records to Display </td>
                </tr>
              </>
            )}
          </tbody>
        </table> */}
      </div>
    </>
  );
};

export default TableData;
