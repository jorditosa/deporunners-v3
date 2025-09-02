import { IonButton, IonHeader, IonImg, IonToolbar, useIonRouter } from '@ionic/react';
import React from 'react';
import { LogOut } from 'lucide-react';
import { Preferences } from '@capacitor/preferences';
import { useQueryClient } from '@tanstack/react-query';
import { APP_ROUTES } from '../../constants/endpoints';


const HeaderHome: React.FC = () => {
    const queryClient = useQueryClient();
    const router = useIonRouter();

    return (
        <IonHeader>
            <IonToolbar color='secondary' className='w-full'>

                <div className='flex items-center justify-between'>
                    <IonImg src="/logo.png" className='w-52 ps-1' />
                    <IonButton
                        type='button'
                        fill='clear'
                        className='text-white p-1'
                        title="Tancar Sessió"
                        onClick={async () => {
                            await Preferences.remove({ key: 'depotoken'})
                            await queryClient.invalidateQueries({ queryKey: ['user'] });
                            queryClient.clear();
                            router.push(APP_ROUTES.PUBLIC_HOME)
                        }}
                    >
                        <LogOut
                            className='size-8 text-white'
                        />
                    </IonButton>
                </div>

            </IonToolbar>
        </IonHeader>
    );
};

export default HeaderHome;
