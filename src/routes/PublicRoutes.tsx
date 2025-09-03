import { Route, Switch } from 'react-router-dom';
import PublicHome from '../pages/publichome/PublicHome';
import LoginPage from '../pages/login/LoginPage';
import RegisterPage from '../pages/register/RegisterPage';
import ConfirmRegisterPage from '../pages/register/ConfirmRegisterPage';
import ForgotPassword from '../pages/forgot-password/ForgotPassword';
import { APP_ROUTES } from '../constants/endpoints';
import ResetPassword from '../pages/reset-password/ResetPassword';


const PublicRoutes: React.FC = () => (
  <>
    <Switch>
      <Route exact path={APP_ROUTES.LOGIN} component={LoginPage} />
      <Route exact path={APP_ROUTES.REGISTER} component={RegisterPage} />
      <Route exact path={APP_ROUTES.REGISTER_CONFIRM} component={ConfirmRegisterPage} />
      <Route exact path={APP_ROUTES.FORGOT_PASSWORD} component={ForgotPassword} />
      <Route exact path={APP_ROUTES.RESET_PASSWORD} component={ResetPassword} />
      <Route path={APP_ROUTES.PUBLIC_HOME} component={PublicHome} />
    </Switch>
  </>
);

export default PublicRoutes;