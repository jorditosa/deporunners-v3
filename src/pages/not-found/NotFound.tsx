import { IonButton, IonCol, IonContent, IonPage, IonRow, useIonRouter } from '@ionic/react'

export const NotFound = () => {
    const router = useIonRouter();

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonRow className='h-full'>
                    <IonCol className='bg-gradient-to-b from-primary to-secondary flex flex-col justify-center items-center text-white p-8 gap-y-8'>
                        <h1 className='text-3xl' >T'has perdut ?</h1>
                        <p>Recorda a dur sempre una bruixola, mapa i xiulet a sobre per si et perds a la muntanya.</p>

                        <IonButton
                            color='light'
                            onClick={() => router.push('/')}
                        >
                            Tornar a l'inici
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    )
}
