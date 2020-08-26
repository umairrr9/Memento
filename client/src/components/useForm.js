import { useState } from "react";

const useForm = (callback) => {
  const passwordPattern = new RegExp(
    "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@#$£%^&+=])(?=.*[a-z]).{8,}$"
  );

  const [values, setValues] = useState({});

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    callback();
  };

  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleIsLogin = (event) => {
    if (event) event.preventDefault();
    setValues((values) => ({ ...values, isLogin: !values.isLogin }));
  };

  const setValue = (key, value) => {
    setValues((values) => ({ ...values, [key]: value }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    handleIsLogin,
    setValues,
    setValue,
    passwordPattern,
  };
};

export default useForm;