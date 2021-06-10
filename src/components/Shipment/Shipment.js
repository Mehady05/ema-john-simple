import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import './Shipment.css';


const Shipment = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const onSubmit = data => console.log(data);
    
    return (
      <form className='ship_form' onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue={loggedInUser.name} {...register("name", { required: true })} />
        {errors.name && <span className='error'>Name is required</span>}
        <input defaultValue={loggedInUser.email} {...register("email", { required: true })} />
        {errors.email && <span className='error'>Email is required</span>}
        <input {...register("address", { required: true })} />
        {errors.address && <span className='error'>Address is required</span>}
        <input {...register("phone", { required: true })} />
        {errors.phone && <span className='error'>Phone Number is required</span>}
        
        <input type="submit" />
      </form>
    );
};

export default Shipment;