import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import "./Shipment.css";

const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [logInUser,setLogInUser] = useContext(UserContext);
  const onSubmit = data => console.log(data);

  console.log(watch("example")); 

  return (
    
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue={logInUser.name} {...register("name", { required: true })}  placeholder="name"/>
      {errors.name && <span className="error">This name is required</span>}
      <input defaultValue={logInUser.email} {...register("email", { required: true })}  placeholder="email"/>
      {errors.email && <span className="error">This email is required</span>}
      <input {...register("adress", { required: true })}  placeholder="adress"/>
      {errors.adress && <span className="error">This adress is required</span>}
      <input {...register("phonenumber", { required: true })}  placeholder="phone number"/>
      {errors.phonenumber && <span className="error">This phone number is required</span>}
      
      <input type="submit" />
    </form>
  );
};

export default Shipment;