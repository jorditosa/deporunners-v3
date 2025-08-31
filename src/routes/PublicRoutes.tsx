import { Route, Switch } from 'react-router-dom';
import PublicHome from '../pages/publichome/PublicHome';
import LoginPage from '../pages/login/LoginPage';


const PublicRoutes: React.FC = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route path="/" component={PublicHome} />
    </Switch>
  </>
);

export default PublicRoutes;