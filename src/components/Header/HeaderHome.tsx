import { IonHeader, IonImg, IonToolbar } from '@ionic/react';
import React from 'react';
import { ExternalLink } from 'lucide-react';


const HeaderHome: React.FC = () => {
    return (
        <IonHeader>
            <IonToolbar color='secondary' className='py-1'>

                <IonImg src="/logo.png" className='w-60 ps-1' />
                <a
                    target='_blank'
                    href={'https://deporunners.cat/patrocinadors/'}
                    slot='end'
                    className='text-white p-2'
                    title="Visita la web"
                >
                    <ExternalLink
                        className='size-10 text-white'
                    />
                </a>

            </IonToolbar>
        </IonHeader>
    );
};

export default HeaderHome;
