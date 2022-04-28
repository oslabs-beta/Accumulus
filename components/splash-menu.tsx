import Login from './login-btn'
import Signup from './signup-btn'

export default function Menu() {
  //is this where we set state to 'is logged in?'

  return (
    <>
      <div id="nav">
        <h1>
          Accumulus Home Page
        </h1>
        <Login />
        <Signup />
        
      </div>
    </>
  )
}