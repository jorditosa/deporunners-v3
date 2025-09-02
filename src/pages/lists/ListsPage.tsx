import { IonButton, IonCol, IonRow, useIonRouter } from '@ionic/react';
import PrivateLayout from '../PrivateLayout';
import { BottleWine, Dumbbell, Footprints } from 'lucide-react';
import { APP_ROUTES } from '../../constants/endpoints';
import Heading from '../../components/ui/Heading';

const ListsPage: React.FC = () => {
  const router = useIonRouter();

  return (
    <PrivateLayout
      title='Llistes'
      headerColor='secondary'
      contentColor='light'
    >
      <IonRow>
        <main className='container'>
          <Heading
          title='Llistes'
          variant='h2'
          />
          <IonCol>
            <IonButton 
            color='secondary' 
            expand='full' 
            className='flex items-center mb-4'
            onClick={() => router.push(APP_ROUTES.PRIVATE_LISTS_TRAININGS, 'forward')}
            >
              <Dumbbell className='size-8 text-white me-2' />
              <span className='text-white uppercase text-base italic'>
                Entrenaments
              </span>
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton 
            color='secondary' 
            expand='full' 
            className='flex items-center mb-4'
            >
              <Footprints className='size-8 text-white me-2' />
              <span className='text-white uppercase text-base italic'>
                Caminades
              </span>
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton 
            color='primary' 
            expand='full' 
            className='flex items-center mb-4'
            >
              <BottleWine className='size-8 text-white me-2' />
              <span className='text-white uppercase text-base italic'>
                Actes Socials
              </span>
            </IonButton>
          </IonCol>

        </main>
      </IonRow>

    </PrivateLayout>
  );
};

export default ListsPage;
