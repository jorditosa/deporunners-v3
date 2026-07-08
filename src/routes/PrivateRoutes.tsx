import { Route, Switch } from 'react-router-dom';
import {
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { CalendarDays, Home, CartShopping, User } from 'reicon';
import Icon from '../components/ui/Icon';

import PrivateHome from '../pages/privatehome/PrivateHome';
import ListsPage from '../pages/lists/ListsPage';
import ShopPage from '../pages/shop/ShopPage';
import { APP_ROUTES } from '../constants/endpoints';
import ProfilePage from '../pages/profile/ProfilePage';
import ListsPageEvent from '../pages/lists/ListsPageEvent';

const PrivateRoutes: React.FC = () => (
  <>

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

      <IonTabBar
        slot='bottom'
        color='secondary'
        className='h-14 pb-2'
      >
        <IonTabButton tab="home" href={APP_ROUTES.PRIVATE_HOME}>
          <Icon icon={Home} className='size-9 p-1 text-white' />
        </IonTabButton>
        <IonTabButton tab="lists" href={APP_ROUTES.PRIVATE_LISTS}>
          <Icon icon={CalendarDays} className='size-9 p-1 text-white' />
        </IonTabButton>
        <IonTabButton tab="shop" href={APP_ROUTES.PRIVATE_SHOP}>
          <Icon icon={CartShopping} className='size-9 p-1 text-white' />
        </IonTabButton>
        <IonTabButton tab="profile" href={APP_ROUTES.PRIVATE_PROFILE}>
          <Icon icon={User} className='size-9 p-1 text-white' />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </>
);

export default PrivateRoutes;