import { Route } from 'react-router-dom';
import PublicHome from '../pages/publichome/PublicHome';


const PublicRoutes: React.FC = () => (
  <>
    <Route exact path="/">
      <PublicHome />
    </Route>
  </>
);

export default PublicRoutes;