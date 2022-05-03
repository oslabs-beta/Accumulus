
import LoginForm from '../components/login-form';
import {UserWrapper} from '../context/userContext';

const Login: React.FunctionComponent = () => {
  return (
    <>
      <UserWrapper>
       <LoginForm />
      </UserWrapper>
    </>
  );
};

export default Login;