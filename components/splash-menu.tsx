import Login from './login-btn'
import Signup from './signup-btn'

export default function Menu() {


  return (
    <>
      <div className="max-w-xs rounded overflow-hidden shadow-lg my-2">
        <h1 className='text green'>
          Accumulus Home Page
        </h1>
        <Login />
        <Signup />
        
      </div>
    </>
  )
}