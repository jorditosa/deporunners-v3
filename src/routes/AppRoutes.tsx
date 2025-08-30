import { Redirect, Route } from 'react-router-dom';
import PrivateHome from '../pages/PrivateHome';
import Tab2 from '../pages/Tab2';
import Tab3 from '../pages/Tab3';
import Tab4 from '../pages/Tab4';


const AppRoutes: React.FC = () => (
  <>
    <Route exact path="/tab1">
      <PrivateHome />
    </Route>
    <Route exact path="/tab2">
      <Tab2 />
    </Route>
    <Route path="/tab3">
      <Tab3 />
    </Route>
    <Route path="/tab4">
      <Tab4 />
    </Route>
    <Route exact path="/">
      <Redirect to="/tab1" />
    </Route>
  </>
);

export default AppRoutes;