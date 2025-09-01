import { IonButton, IonCol, IonRow } from '@ionic/react';
import { Link } from 'react-router-dom';
import PublicLayout from '../PublicLayout';

const PublicHome: React.FC = () => {
    return (
        <PublicLayout>
            <IonRow >
                <main className='container'>
                    <IonCol>
                        <Link to={'/login'}>
                            <IonButton color='light' expand='full' className='flex items-center mb-4'>
                                Iniciar Sessió
                            </IonButton>
                        </Link>

                    </IonCol>

                    <IonCol>
                        <Link to={'/register'}>
                            <IonButton color='light' expand='full' className='flex items-center mb-4'>
                                Primera vegada
                            </IonButton>
                        </Link>
                    </IonCol>

                    <IonCol>
                        <Link to={'/forgot-password'}>
                            <IonButton color='light' expand='full' className='flex items-center mb-4'>
                                Has oblidat la password?
                            </IonButton>
                        </Link>
                    </IonCol>
                </main>
            </IonRow>
        </PublicLayout>
    );
};

export default PublicHome;
