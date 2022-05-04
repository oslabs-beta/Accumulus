import Login from './login-btn';
import Signup from './signup-btn';
import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks';


export default function Menu() {

  return (
    <>
      <h3>Accumulus Home Nav Menu</h3>
      <Login />
      <Signup />
    </>
  )
}