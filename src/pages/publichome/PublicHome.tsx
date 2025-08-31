import { IonButton, IonCol, IonContent, IonHeader, IonImg, IonPage, IonRow } from '@ionic/react';
import Header from '../../components/Header/Header';
import { Link } from 'react-router-dom';
import styles from './public-home.module.css'

const PublicHome: React.FC = () => {
    return (
        <IonPage className={styles.initPage} id='Public Home'>
            <Header title='Home' />
            <IonContent fullscreen color='secondary' className='relative'>
                <IonHeader collapse="condense">

                    <div className='container'>
                        <IonImg src="/lletra-blanca.png" className='w-full ps-1' />
                    </div>

                    <IonRow className='container'>
                        <IonCol size='12' className='flex flex-col gap-y-6'>

                            <Link to={'/login'}>
                                <IonButton expand='full' color='light'>Iniciar Sessió</IonButton>
                            </Link>


                            <Link to={'/register'}>
                                <IonButton expand='full' color='light'>Primera vegada</IonButton>
                            </Link>

                            <Link to={'/forgot-landing'}>
                                <IonButton expand='full' color='light'>Has oblidat la password?</IonButton>
                            </Link>
                        </IonCol>
                    </IonRow>

                </IonHeader>
            </IonContent>
        </IonPage>
    );
};

export default PublicHome;
