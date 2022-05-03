import Login from './login-btn'
import Signup from './signup-btn'
import { useUserContext } from '../context/userContext';
import { useDataContext } from '../context/dataContext';

export default function Menu() {
  // const { user, setUser } = useUserContext();
  // const USERRESULT = JSON.stringify(user);
  // const { data, receivedData } = useDataContext();
  // const DATARESULT = JSON.stringify(data);

  return (
    <>
      <div>
        <h3>
          Accumulus Home Nav Menu
        </h3>
        <Login />
        <Signup />
        {/* <h4>{USERRESULT}</h4>
        <h4>{DATARESULT}</h4> */}
      </div>
    </>
  )
}