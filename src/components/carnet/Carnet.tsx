import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonImg, IonRow, IonText } from '@ionic/react';
import { User } from '../../interfaces/user.interface';
import { hashNames } from '../../helpers/hashNames';

interface CarnetProps {
  user: User;
}

const Carnet: React.FC<CarnetProps> = ({user}) => {

  if (!user) return
  return (
    <IonCard
      className="w-full bg-gradient-to-b from-primary via-primary to-tertiary text-white m-0 y-2"
      color='light'
    >
      <IonRow className='mx-4'>
        <IonImg src="/lletra-fons-blau.png" className='w-full py-4' />
      </IonRow>
      <IonCardHeader className='p-0'>
        <IonCardTitle>
          <IonCardTitle className='ion-text-center text-xl m-0'>{user.username}</IonCardTitle>
          <IonCardSubtitle className='ion-text-center text-base mt-1 font-semibold lowercase'>
            {user.email}
          </IonCardSubtitle>
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent className='relative'>
        <IonText className='flex justify-between'>
          <p className='ion-text-start ion-padding-top text-2xl uppercase font-semibold'>
            Temporada {new Date().getFullYear()}
          </p>
          <p className='ion-text-end ion-padding-top'>
            núm. soci/sòcia
            <span className='font-bold ion-padding-start text-base'>{user.soci_id}</span>
          </p>
        </IonText>
        <IonText>
          <span className='text-[8px] text-center'>{hashNames(user.username)}</span>
        </IonText>
      </IonCardContent>
    </IonCard>
  )
}
export default Carnet
