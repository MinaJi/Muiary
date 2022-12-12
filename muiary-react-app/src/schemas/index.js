import * as yup from "yup";

const passwordRules =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

export const formSchemas = yup.object().shape({
  email: yup.string().email("Please enter a valid email.").required("Required"),
  password: yup
    .string()
    .min(8)
    .matches(passwordRules, {
      message:
        "Your password needs at least 8 characters including at least one number or letter.",
    })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match.")
    .required("Required"),
});
