import RegForm from '../components/reg-form';
import {UserWrapper} from '../context/userContext';

const Registration: React.FunctionComponent = () => {
  return (
    <>
    <UserWrapper>
      <RegForm />
     </UserWrapper>
    </>
  );
};

export default Registration;
