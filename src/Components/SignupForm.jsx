import React, { useEffect, useState } from "react";
import { useFormik, Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { updateReduxState } from "../Redux/Slice";
import { signupValidation } from "./Yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Button, Modal } from "antd";
const SignupForm = () => {
  const initalValues = {
    name: "",
    email: "",
    password: "",
    cPassword: "",
    jobRole: "",
    gender: "",
    phNo: "",
    date: new Date(),
  };
  const globalDispatch = useDispatch();
  const reduxState = useSelector(({ data }) => data);
  const [editData, setEditData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (reduxState?.editIndex !== null) {
      setEditData(reduxState?.arr[reduxState?.editIndex]);
      setIsModalOpen(true);
    }
  }, [reduxState?.editIndex]);
  const triggerSuccessToast = (message) => {
    toast.success(
      <p className="mx-2 tx-16 d-flex align-items-center mb-0 ">{message}</p>
    );
  };
  const handleSubmit = (values, { resetForm }) => {
    console.log(values, reduxState);
    setIsModalOpen(false);
    if (reduxState?.editIndex === null) {
      values.date = values?.date?.toString();
      let tempData = [...reduxState?.arr, values];
      resetForm();
      globalDispatch(updateReduxState({ arr: tempData }));
      triggerSuccessToast("Record Added Successfully");
    } else {
      setEditData(initalValues);
      let tempData = [...reduxState?.arr];
      tempData[reduxState?.editIndex] = values;
      globalDispatch(updateReduxState({ arr: tempData }));
      globalDispatch(updateReduxState({ editIndex: null }));
      triggerSuccessToast("Record Edited Successfully");
    }
  };

  return (
    <>
      <div className="container">
        <Button
          type="primary"
          className="text-center"
          onClick={() => setIsModalOpen(true)}
        >
          Signup Form
        </Button>
        <Modal
          title="Signup Form"
          open={isModalOpen}
          footer={null}
          //   onOk={() => () => setIsModalOpen(true)}
          onCancel={() => setIsModalOpen(false)}
        >
          <div className="row justify-content-center s">
            <div className=" col-sm-12 col-md-12  ">
              <Formik
                enableReinitialize
                initialValues={editData || initalValues}
                onSubmit={handleSubmit}
                validationSchema={signupValidation}
                validateOnMount
              >
                {({ values, setFieldValue, dirty}) => {
                  
                  return (
                    <>
                      <Form>
                        <div className="mt-2">
                          <Field
                            type="text"
                            className="form-control"
                            placeholder="Enter your Name"
                            name="name"
                          />
                          <ErrorMessage
                            component="label"
                            name="name"
                            className="form-label text-danger"
                          />
                        </div>

                        <div className="mt-2">
                          <Field
                            type="email"
                            className="form-control"
                            placeholder="Enter your Email"
                            name="email"
                          />
                          <ErrorMessage
                            component="label"
                            name="email"
                            className="form-label text-danger"
                          />
                        </div>

                        <div className="mt-2">
                          <Field
                            type="password"
                            className="form-control"
                            placeholder="Enter your Password"
                            name="password"
                          />
                          <ErrorMessage
                            component="label"
                            name="password"
                            className="form-label text-danger"
                          />
                        </div>

                        <div className="mt-2">
                          <Field
                            type="password"
                            className="form-control"
                            placeholder="Confirm Your Password"
                            name="cPassword"
                          />
                          <ErrorMessage
                            component="label"
                            name="cPassword"
                            className="form-label text-danger"
                          />
                        </div>

                        <div className="mt-2">
                          <Field
                            as="select"
                            className="form-control"
                            name="jobRole"
                          >
                            <option value="" disabled>
                              Select Job Role
                            </option>
                            <option value="Developer">Developer</option>
                            <option value="Tester">Tester</option>
                          </Field>
                          <ErrorMessage
                            component="label"
                            name="jobRole"
                            className="form-label text-danger"
                          />
                        </div>

                        <div className="mt-2">
                          <Field
                            type="radio"
                            name="gender"
                            value="Male"
                            id="male"
                          />{" "}
                          &nbsp;
                          <label htmlFor="male">Male</label>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <Field
                            type="radio"
                            name="gender"
                            value="Female"
                            id="female"
                          />{" "}
                          &nbsp;
                          <label htmlFor="female">Female</label>
                          <ErrorMessage
                            component="label"
                            name="gender"
                            className="form-label text-danger"
                          />
                        </div>

                        <div className="mt-2">
                          <Field
                            type="text"
                            className="form-control"
                            placeholder="Enter your 10 Digit Number"
                            name="phNo"
                            onKeyDown={(event) => {
                              if (
                                isNaN(event.key) &&
                                event.key !== "Backspace"
                              ) {
                                event.preventDefault();
                              }
                            }}
                          />
                          <ErrorMessage
                            component="label"
                            name="phNo"
                            className="form-label text-danger"
                          />
                        </div>

                        <DatePicker
                          name="date"
                          dateFormat="MMMM d, yyyy"
                          selected={values?.date}
                          onChange={(date) => setFieldValue("date", date)}
                        />
                        <div>
                          <button
                            className=" w-100 btn btn-primary"
                            type="submit"
                            disabled={!(dirty)}
                          >
                            Signup
                          </button>
                        </div>
                      </Form>
                    </>
                  );
                }}
              </Formik>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default SignupForm;
