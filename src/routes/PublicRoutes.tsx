import { Route, Switch } from 'react-router-dom';
import PublicHome from '../pages/publichome/PublicHome';
import LoginPage from '../pages/login/LoginPage';
import RegisterPage from '../pages/register/RegisterPage';
import ConfirmRegisterPage from '../pages/register/ConfirmRegisterPage';


const PublicRoutes: React.FC = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/register-confirm" component={ConfirmRegisterPage} />
      <Route path="/" component={PublicHome} />
    </Switch>
  </>
);

export default PublicRoutes;