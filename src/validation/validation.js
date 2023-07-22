import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .test(
      "no-leading-trailing-spaces",
      "Name should not have leading or trailing spaces",
      (value) => {
        if (value && value !== value.trim()) {
          return false;
        }
        return true;
      }
    )
    .min(2, "Name must be at least 2 characters")
    .max(10, "Name must be at most 10 characters")
    .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),

  mobile: Yup.string()
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Mobile number is not valid")
    .required("Mobile number is required"),
});


 
export const packageSchema=Yup.object().shape({
  cat: Yup.string()
      .notOneOf(['Select Category'], 'Please select a category')
      .required('Category is required'),
    name: Yup.string().required("Name is required"),
    price: Yup.number().required("Price is requied"),
     day: Yup.number().required("Day is requied"),
        night: Yup.number().required("night is requied"),
    endDate: Yup.date().required("Date is requied"),
    startDate: Yup.date().required("Date is requied"),
    details: Yup.string().required("Details is required"),
    disname: Yup.string().required("District name is required"),
       selected: Yup.array().of(Yup.string()).required("required"),


    file: Yup.mixed()
      .required("Image is required")
      .test("fileFormat", "Invalid image format", (value) => {
        if (!value) return false;
        const supportedFormats = ["image/jpeg", "image/jpg", "image/png"];
        return supportedFormats.includes(value.type);
    }),

})


export const profileNameSchema = Yup.object().shape({
  selected: Yup.array().min(1, "Please select at least one tourist place"),

  name: Yup.string()
    .required("Name is required")
    .test(
      "no-leading-trailing-spaces",
      "Name should not have leading or trailing spaces",
      (value) => {
        if (value && value !== value.trim()) {
          return false;
        }
        return true;
      }
    )
    .min(2, "Name must be at least 2 characters")
    .max(10, "Name must be at most 10 characters")
    .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
});

export const otpValidationSchema = Yup.object().shape({
  otp: Yup.string()
    .required("OTP is required")
    .matches(
      /^[0-9]{6}$/,
      "OTP must be 6 digits long and contain only numbers"
    ),
});

export const loginvalidationSchema = Yup.object().shape({
  mobile: Yup.string()
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Mobile number is not valid")
    .required("Mobile number is required"),
});

export const addCycleValidationSchema = Yup.object().shape({
  speed: Yup.string()
    .matches(/^\d{1,4}$/, "Speed be a number with no more than 4 digits")
    .min(0, "Speed must be positive")
    .required(" Speed isrequired"),

  type: Yup.string()
    .required("Type is required")
    .test(
      "no-leading-trailing-spaces",
      "Type should not have leading or trailing spaces",
      (value) => {
        if (value && value !== value.trim()) {
          return false;
        }
        return true;
      }
    )
    .min(2, "Type must be at least 2 characters")
    .max(10, "Type must be at most 10 characters")
    .matches(/^[a-zA-Z\s]+$/, "Type can only contain letters and spaces"),

  names: Yup.string()
    .required("Name is required")
    .test(
      "no-leading-trailing-spaces",
      "Name should not have leading or trailing spaces",
      (value) => {
        if (value && value !== value.trim()) {
          return false;
        }
        return true;
      }
    )
    .min(2, "Name must be at least 2 characters")
    .max(10, "Name must be at most 10 characters")
    .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),

  breake: Yup.string()
    .required("Break is required")
    .test(
      "no-leading-trailing-spaces",
      "Break should not have leading or trailing spaces",
      (value) => {
        if (value && value !== value.trim()) {
          return false;
        }
        return true;
      }
    )
    .min(2, "Break must be at least 2 characters")
    .max(10, "Break must be at most 10 characters")
    .matches(/^[a-zA-Z\s]+$/, "Break can only contain letters and spaces"),

  tyresize: Yup.string()
    .matches(
      /^\d{1,4}$/,
      "Tyre size must be a number with no more than 4 digits"
    )
    .min(0, "Tyre size must be positive")
    .required(" Tyre size is required"),

  quantity: Yup.string()
    .matches(
      /^\d{1,4}$/,
      "Quantity must be a number with no more than 4 digits"
    )
    .min(0, "Quantity must be positive")
    .required("Quantity is required"),

  priceinclude: Yup.string()
    .required("Price include items is required")
    .test(
      "no-leading-trailing-spaces",
      "Price include items should not have leading or trailing spaces",
      (value) => {
        if (value && value !== value.trim()) {
          return false;
        }
        return true;
      }
    )
    .min(2, "Price include items must be at least 2 characters")
    .max(10, "Price include items must be at most 10 characters")
    .matches(
      /^[a-zA-Z\s]+$/,
      "Price include items can only contain letters and spaces"
    ),

  securitydeposit: Yup.string()
    .matches(/^\d{1,4}$/, "Must be a number with no more than 4 digits")
    .min(0, "Number must be positive")
    .required("required"),

  terms: Yup.string()
    .required("Terms and condition is required")
    .test(
      "no-leading-trailing-spaces",
      "Terms adn condition should not have leading or trailing spaces",
      (value) => {
        if (value && value !== value.trim()) {
          return false;
        }
        return true;
      }
    )
    .min(2, "Terms and condition must be at least 2 characters")
    .matches(
      /^[a-zA-Z\s]+$/,
      "Terms and condition can only contain letters and spaces"
    ),

  price: Yup.string()
    .matches(/^\d{1,4}$/, "Price must be a number with no more than 4 digits")
    .min(0, "Price must be positive")
    .required("Price is required"),
});

export const imageValidationSchema = Yup.object().shape({
  image: Yup.mixed()
    .required("Image is required")
    .test("fileType", "Invalid file type (jpeg , png , jpeg)", (value) => {
      if (!value) return true;
      return (
        value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
      );
    })
    .test("fileSize", "File size is too large size must be 5MB", (value) => {
      if (!value) return true;
      return value && value.size <= 5000000;
    }),
});

export const accessoriesValidationSchema = Yup.object().shape({
  names: Yup.string()
    .required("Name is required")
    .test(
      "no-leading-trailing-spaces",
      "Name should not have leading or trailing spaces",
      (value) => {
        if (value && value !== value.trim()) {
          return false;
        }
        return true;
      }
    )
    .min(2, "Name must be at least 2 characters")
    .max(10, "Name must be at most 10 characters")
    .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),

  size: Yup.string()
    .matches(/^\d{1,4}$/, "size must be a number with no more than 4 digits")
    .min(0, "Size must be positive")
    .required("Size is required"),

  quantity: Yup.string()
    .matches(
      /^\d{1,4}$/,
      "Quantity must be a number with no more than 4 digits"
    )
    .min(0, "Quantity must be positive")
    .required("Quantity is Required"),

  price: Yup.string()
    .matches(/^\d{1,4}$/, "PricemMust be a number with no more than 4 digits")
    .min(0, "Price must be positive")
    .required("Price is required"),
});

export const chatSchema = Yup.object().shape({
  inputField: Yup.string().required("There is no message"),
});