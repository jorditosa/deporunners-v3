import { IonButton } from '@ionic/react';
import { ArrowLeft } from 'lucide-react';
import React from 'react'
import { useHistory } from 'react-router';

export default function BackBtn() {
    const history = useHistory();

    return (
        <div className='mb-4'>
            <IonButton
            color='light'
                onClick={() => history.goBack()}
                className='flex items-center gap-2 text-primary hover:text-primary/80 transition-colors'
            >
                <ArrowLeft className='size-5 text-secondary me-1' />
                <span className='font-semibold text-secondary'>Enrere</span>
            </IonButton>
        </div>
    )
}
