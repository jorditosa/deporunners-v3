import { Route, Switch } from 'react-router-dom';
import {
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { CalendarRange, Home, ShoppingCart, User } from 'lucide-react';

import PrivateHome from '../pages/privatehome/PrivateHome';
import ListsPage from '../pages/lists/ListsPage';
import ShopPage from '../pages/shop/ShopPage';
import { APP_ROUTES } from '../constants/endpoints';
import ProfilePage from '../pages/profile/ProfilePage';
import ListsPageEvent from '../pages/lists/ListsPageEvent';

const PrivateRoutes: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Switch>
        <Route exact path={APP_ROUTES.PRIVATE_HOME} component={PrivateHome} />
        <Route exact path={APP_ROUTES.PRIVATE_LISTS} component={ListsPage} />
        <Route exact path={`${APP_ROUTES.PRIVATE_LISTS}/:id`} component={ListsPageEvent} />
        <Route path={APP_ROUTES.PRIVATE_SHOP} component={ShopPage} />
        <Route path={APP_ROUTES.PRIVATE_PROFILE} component={ProfilePage} />
      </Switch>
    </IonRouterOutlet>
    
    <IonTabBar slot="bottom" color='secondary' className='h-16 border-t-2 border-primary'>
      <IonTabButton tab="dashboard" href={APP_ROUTES.PRIVATE_HOME} className='bg-secondary'>
        <Home className='size-10 p-1 text-white'/>
        <IonLabel color='light'>Inici</IonLabel>
      </IonTabButton>
      <IonTabButton tab="lists" href={APP_ROUTES.PRIVATE_LISTS} className='bg-secondary'>
        <CalendarRange className='size-10 p-1 text-white'/>
        <IonLabel color='light'>Llistes</IonLabel>
      </IonTabButton>
      <IonTabButton tab="shop" href={APP_ROUTES.PRIVATE_SHOP} className='bg-secondary'>
        <ShoppingCart className='size-10 p-1 text-white'/>
        <IonLabel color='light'>Botiga</IonLabel>
      </IonTabButton>
      <IonTabButton tab="profile" href={APP_ROUTES.PRIVATE_PROFILE} className='bg-secondary'>
        <User className='size-10 p-1 text-white'/>
        <IonLabel color='light'>Perfil</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default PrivateRoutes;