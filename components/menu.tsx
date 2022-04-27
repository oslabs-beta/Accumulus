import Login from './login-btn'
import Signup from './signup-btn'

export default function Menu() {
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