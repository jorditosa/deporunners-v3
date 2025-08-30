import { IonBackButton, IonButton, IonButtons, IonHeader, IonIcon, IonImg, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { formatUTF } from '../../helpers/formatUTF';
import { useRouter } from '../../helpers/navigation';
import { userLogOut } from '../../store/auth/auth.slice';
import { useUserStore } from '../../store/user-store';


interface ContainerProps {
  title: string;
}


const HeaderProfile: React.FC<ContainerProps> = ({ title }) => {
  const { navigate } = useRouter()
  const { loggedOut } = useUserStore()

  const handleLogout = async () => {
    loggedOut()
    navigate('/landing')
  }

  return (
    <IonHeader >
      <IonToolbar color='primary'>
        <IonButtons slot="start">
          <IonBackButton
            color='light'
            text=""
            className='text-sm font-semibold'
          ></IonBackButton>
        </IonButtons>
        <IonTitle className='text-base font-semibold uppercase' color='light'>{formatUTF(title)}</IonTitle>

        <IonButton
          title='Sortir'
          onClick={handleLogout}
          color={'dark'}
          slot='end'
          shape='round'
          className='pe-2'
        >
          <span className='text-xs text-white font-semibold uppercase'>Tancar sessió</span>
        </IonButton>
      </IonToolbar>
    </IonHeader>
  );
};

export default HeaderProfile;
