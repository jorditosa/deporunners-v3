import { IonButton, IonCol, IonRow } from '@ionic/react';
import PrivateLayout from '../PrivateLayout';
import { BottleWine, Dumbbell, Footprints } from 'lucide-react';

const ListsPage: React.FC = () => {
  return (
    <PrivateLayout
      title='Llistes'
      headerColor='secondary'
      contentColor='light'
    >
      <IonRow>
        <main className='container'>
          <IonCol>
            <IonButton color='secondary' expand='full' className='flex items-center mb-4'>
              <Dumbbell className='size-10 text-white me-2' />
              <span className='text-white uppercase text-lg'>
                Entrenaments
              </span>
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton color='secondary' expand='full' className='flex items-center mb-4'>
              <Footprints className='size-10 text-white me-2' />
              <span className='text-white uppercase text-lg'>
                Caminades
              </span>
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton color='primary' expand='full' className='flex items-center mb-4'>
              <BottleWine className='size-10 text-white me-2' />
              <span className='text-white uppercase text-lg'>
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
