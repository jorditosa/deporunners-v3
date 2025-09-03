import { IonContent, IonPage, IonRow, IonSpinner } from '@ionic/react'

export default function Spinner() {
  return (
    <IonPage>
        <IonContent color='secondary'>
            <IonRow>
                <div className='relative w-screen flex justify-center mt-32'>
                    <IonSpinner
                    name='lines-sharp'
                    color='light'
                    style={{ 
                        width: '70px', 
                        height: '70px',
                    }}
                    />
                </div>
            </IonRow>
        </IonContent>
    </IonPage>
  )
}