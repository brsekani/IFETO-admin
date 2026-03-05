import * as Yup from "yup";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const passwordMessage =
  "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.";

export const SignupSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  country: Yup.string().required("Country is required"),
  password: Yup.string()
    .matches(passwordRegex, passwordMessage)
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const VerifyCodeSchema = Yup.object({
  code1: Yup.string().required("").matches(/^\d$/, ""),
  code2: Yup.string().required("").matches(/^\d$/, ""),
  code3: Yup.string().required("").matches(/^\d$/, ""),
  code4: Yup.string().required("").matches(/^\d$/, ""),
  code5: Yup.string().required("").matches(/^\d$/, ""),
  code6: Yup.string().required("").matches(/^\d$/, ""),
}).test(
  "all-digits",
  "Please enter a valid 6-digit verification code",
  function (values) {
    if (!values) return false;
    const codes = [
      values.code1,
      values.code2,
      values.code3,
      values.code4,
      values.code5,
      values.code6,
    ];
    return codes.every((code) => code && /^\d$/.test(code));
  },
);

export const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(passwordRegex, passwordMessage)
    .required("Password is required"),
});

export const ForgotPasswordSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const ResetPasswordSchema = Yup.object({
  password: Yup.string()
    .matches(passwordRegex, passwordMessage)
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const CreateCategorySchema = Yup.object({
  itemName: Yup.string()
    .trim()
    .min(3, "Must be at least 3 characters")
    .required("Item name is required"),

  description: Yup.string()
    .trim()
    .min(10, "Must be at least 10 characters")
    .max(500, "Maximum 500 characters")
    .required("Description is required"),

  image: Yup.mixed()
    .required("Product image is required")
    .test("fileSize", "Image must be less than 5MB", (value: any) => {
      if (!value) return false;
      return value.size <= 5 * 1024 * 1024;
    })
    .test("fileType", "Unsupported format", (value: any) => {
      if (!value) return false;
      return ["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(
        value.type,
      );
    }),
});

export const CreateCollectionSchema = Yup.object({
  itemName: Yup.string()
    .trim()
    .min(3, "Must be at least 3 characters")
    .required("Item name is required"),

  description: Yup.string()
    .trim()
    .min(10, "Must be at least 10 characters")
    .max(500, "Maximum 500 characters")
    .required("Description is required"),
});
