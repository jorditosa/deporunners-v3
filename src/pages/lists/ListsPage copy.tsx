import { IonButton, IonCol, IonRow, useIonRouter } from '@ionic/react';
import PrivateLayout from '../PrivateLayout';
import { BottleWine, Dumbbell, Footprints, Medal } from 'lucide-react';
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
              className='mb-6'
              onClick={() => router.push(APP_ROUTES.PRIVATE_LISTS_TRAININGS, 'forward')}
            >
              <div className='w-full flex justify-between items-center'>
                <span className='text-white uppercase text-base italic'>
                  Entrenaments
                </span>
                <Dumbbell className='size-8 text-primary me-2' />
              </div>
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton
              color='secondary'
              expand='full'
              className='mb-6'
              onClick={() => router.push(APP_ROUTES.PRIVATE_LISTS_TREKKINGS, 'forward')}
            >
              <div className='w-full flex justify-between items-center'>
                <span className='text-white uppercase text-base italic'>
                  Caminades
                </span>
                <Footprints className='size-8 text-primary me-2' />
              </div>
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton
              color='primary'
              expand='full'
              className='mb-6'
              onClick={() => router.push(APP_ROUTES.PRIVATE_LISTS_RACES, 'forward')}
            >
              <div className='w-full flex justify-between items-center'>
                <span className='text-white uppercase text-base italic'>
                  Curses
                </span>
                <Medal className='size-8 text-secondary me-2' />
              </div>
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton
              color='primary'
              expand='full'
              className='mb-6'
              onClick={() => router.push(APP_ROUTES.PRIVATE_LISTS_SOCIAL, 'forward')}
            >
              <div className='w-full flex justify-between items-center'>
                <span className='text-white uppercase text-base italic'>
                  Actes Socials
                </span>
                <BottleWine className='size-8 text-secondary me-2' />
              </div>
            </IonButton>
          </IonCol>
        </main>
      </IonRow>

    </PrivateLayout>
  );
};

export default ListsPage;
