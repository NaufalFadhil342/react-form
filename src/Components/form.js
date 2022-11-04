import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const Form = () => {
  const schema = yup.object().shape({
    fullName: yup.string().required('Your input full name is empty!'),
    email: yup.string().email().required(),
    age: yup.number().positive().integer().min(13).required(),
    password: yup.string().min(5).max(15).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], "Passwords don't match")
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Full name..." {...register('fullName')} />
      <p style={{ margin: '4px 0', color: 'red' }}>{errors.fullName?.message}</p>
      <input placeholder="Email..." {...register('email')} />
      <p style={{ margin: '4px 0', color: 'red' }}>{errors.email?.message}</p>
      <input type="number" placeholder="Age..." {...register('age')} />
      <p style={{ margin: '4px 0', color: 'red' }}>{errors.age?.message}</p>
      <input type="password" placeholder="Password..." {...register('password')} />
      <p style={{ margin: '4px 0', color: 'red' }}>{errors.password?.message}</p>
      <input type="password" placeholder="Confirm password..." {...register('confirmPassword')} />
      <p style={{ margin: '4px 0', color: 'red' }}>{errors.confirmPassword?.message}</p>
      <input className="submit" type="submit" />
    </form>
  );
};

export default Form;
