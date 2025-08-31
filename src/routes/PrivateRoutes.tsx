import { Route, Switch } from 'react-router-dom';
import {
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { ClipboardList, Home, ShoppingCart, User } from 'lucide-react';

import PrivateHome from '../pages/privatehome/PrivateHome';
import Tab4 from '../pages/profile/Tab4';
import ListsPage from '../pages/lists/ListsPage';
import ShopPage from '../pages/shop/ShopPage';

const PrivateRoutes: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Switch>
        <Route exact path="/app/dashboard" component={PrivateHome} />
        <Route exact path="/app/lists" component={ListsPage} />
        <Route path="/app/shop" component={ShopPage} />
        <Route path="/app/profile" component={Tab4} />
      </Switch>
    </IonRouterOutlet>
    
    <IonTabBar slot="bottom" color='secondary' className='h-16 border-t-2 border-primary'>
      <IonTabButton tab="dashboard" href="/app/dashboard" className='bg-secondary'>
        <Home className='size-10 p-1 text-white'/>
        <IonLabel color='light'>Inici</IonLabel>
      </IonTabButton>
      <IonTabButton tab="lists" href="/app/lists" className='bg-secondary'>
        <ClipboardList className='size-10 p-1 text-white'/>
        <IonLabel color='light'>Llistes</IonLabel>
      </IonTabButton>
      <IonTabButton tab="shop" href="/app/shop" className='bg-secondary'>
        <ShoppingCart className='size-10 p-1 text-white'/>
        <IonLabel color='light'>Botiga</IonLabel>
      </IonTabButton>
      <IonTabButton tab="profile" href="/app/profile" className='bg-secondary'>
        <User className='size-10 p-1 text-white'/>
        <IonLabel color='light'>Perfil</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default PrivateRoutes;