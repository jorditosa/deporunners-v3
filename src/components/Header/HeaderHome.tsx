import { IonHeader, IonImg, IonToolbar } from '@ionic/react';
import React from 'react';
import { Gift } from 'lucide-react';


const HeaderHome: React.FC = () => {
    return (
        <IonHeader>
            <IonToolbar color='primary' className='bg-secondary py-2'>

                <IonImg src="/lletra-fons-blau.png" className='w-48 ps-1' />
                <a
                    target='_blank'
                    href={'https://deporunners.cat/patrocinadors/'}
                    slot='end'
                    className='text-white p-2'
                    title='patrocinadors'
                >
                    <Gift
                        className='size-10 text-white'
                    />
                </a>

            </IonToolbar>
        </IonHeader>
    );
};

export default HeaderHome;
