import * as yup from "yup";

const passwordRules =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

const usernameRules = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{2,29}$/;

export const formSchemas = yup.object().shape({
  email: yup.string().email("Please enter a valid email.").required("Your Email is required."),
  password: yup
    .string()
    .min(8)
    .matches(passwordRules, {
      message:
        "Your password needs at least 8 characters, including at least one number and letter and special characters, for example #,?,!.",
    })
    .required("Your Password is required."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match.")
    .required("Password confirm is required."),
  username: yup
    .string()
    .min(2)
    .matches(usernameRules, {
      message: "This username is not available.",
    })
    .required("Your Username is required."),
});
