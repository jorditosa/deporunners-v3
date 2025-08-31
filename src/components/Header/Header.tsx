import { IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { formatUTF } from '../../helpers/formatUTF';

interface Props {
    title: string;
}

const Header: React.FC<Props> = ({ title }) => {
    return (
        <IonHeader>
        <IonToolbar color='primary'>
          <IonButtons slot="start">
            <IonBackButton
            color='light'
            text=""
            className='text-sm font-semibold'
            ></IonBackButton>
          </IonButtons>
          <IonTitle className='text-base font-semibold uppercase' color='light'>{formatUTF(title)}</IonTitle>
        </IonToolbar>
      </IonHeader>
    );
};

export default Header;
