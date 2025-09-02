import { IonButton, IonCol, IonRow, useIonRouter } from '@ionic/react';
import PublicLayout from '../PublicLayout';
import { APP_ROUTES } from '../../constants/endpoints';

const PublicHome: React.FC = () => {
    const router = useIonRouter();

    return (
        <PublicLayout>
            <IonRow >
                <main className='container'>
                    <IonCol>
                        <IonButton
                            color='light'
                            expand='full'
                            className='flex items-center mb-4 italic text-base'
                            onClick={() => router.push(APP_ROUTES.LOGIN, 'forward')}>
                            <p className='text-secondary'>
                                Iniciar Sessió
                            </p>
                        </IonButton>

                    </IonCol>

                    <IonCol>
                        <IonButton
                            color='light'
                            expand='full'
                            className='flex items-center mb-4 italic text-base'
                            onClick={() => router.push(APP_ROUTES.REGISTER, 'forward')}>
                            <p className='text-secondary'>
                                Primara vegada
                            </p>
                        </IonButton>
                    </IonCol>

                    <IonCol>
                        <IonButton
                            color='light'
                            expand='full'
                            className='flex items-center mb-4 italic text-base'
                            onClick={() => router.push(APP_ROUTES.FORGOT_PASSWORD, 'forward')}>
                            <p className='text-secondary'>
                                Recuperar contrasenya
                            </p>
                        </IonButton>
                    </IonCol>
                </main>
            </IonRow>
        </PublicLayout>
    );
};

export default PublicHome;
