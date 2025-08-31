import { IonContent, IonPage, IonRow, IonSpinner } from '@ionic/react'

export default function Spinner() {
  return (
    <IonPage>
        <IonContent color='secondary'>
            <IonRow>
                <div className='w-full flex justify-center mt-20'>
                    <IonSpinner
                    name='lines-sharp'
                    color='light'
                    style={{ 
                        width: '80px', 
                        height: '80px',
                    }}
                    />
                </div>
            </IonRow>
        </IonContent>
    </IonPage>
  )
}