import { useState } from 'react';

const useForm = (callback) => {

  const [values, setValues] = useState({});

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    callback();
  };

  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

  const handleIsLogin = (event) => {
    if (event) event.preventDefault();
    setValues(values => ({ ...values, isLogin: !values.isLogin }));
  }

  const setValue = (key, value) => {
    setValues(values => ({ ...values, [key]: value }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    handleIsLogin,
    setValues,
    setValue
  }
};

export default useForm;