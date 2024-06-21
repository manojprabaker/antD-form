import * as Yup from "yup";
export const signupValidation = Yup.object({
  name: Yup.string().required("Please Enter Your Name"),
  email: Yup.string()
    .email("Please Enter Valid Email")
    .required("Please Enter Your Name"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,}$/,
      "Password must contain minimum 8 characters, at least one letter and one number"
    )
    .required("Please Enter Password"),
    cPassword:Yup.string().oneOf([Yup.ref("password"),null],"Password did not match").required('Please Confirm Password'),
    jobRole: Yup.string()
      .oneOf(["Developer", "Tester"])
      .required("Please Select Job Role"),
      gender:Yup.string().required("Please Select Gender"),
      phNo:Yup.string().max(10,"Must be 10 Digit").required("Please Enter 10 digit number")
});
