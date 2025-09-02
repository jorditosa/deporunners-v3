import { IonCard, IonRow } from '@ionic/react';
import { useAuth } from '../../hooks/useAuth';
import PrivateLayout from '../PrivateLayout';
import Carnet from '../../components/carnet/Carnet';
import { FilePenLine, Trash } from 'lucide-react';
import Spinner from '../../components/ui/Spinner';

const ProfilePage: React.FC = () => {
  const { data, isLoading } = useAuth();

  if (isLoading) return <Spinner />
  if (data) return (
    <PrivateLayout
      title='Dashboard'
      headerColor='secondary'
      contentColor='secondary'
    >
      <main className='container flex flex-col gap-4'>
        <Carnet
          user={data}
        />
        <IonCard color='light' className='ion-padding'>
          <IonRow className='flex items-center justify-between gap-2'>
            <p>Nom:  <span className='font-bold text-primary text-base'>{data.username}</span></p>
            <FilePenLine className='text-primary size-6' />
          </IonRow>
        </IonCard>
        <IonCard color='light' className='ion-padding'>
           <IonRow className='flex items-center justify-between gap-2'>
            <p className='text-red-500'>Vols eliminar el teu usuari?</p>
            <Trash className='text-red-500 size-6' />
          </IonRow>
        </IonCard>
      </main>
    </PrivateLayout>

  );
};

export default ProfilePage;
