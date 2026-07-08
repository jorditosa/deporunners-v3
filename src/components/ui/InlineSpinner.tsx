import { IonSpinner } from '@ionic/react'

export default function InlineSpinner() {
    return (
        <div className='flex justify-center py-8'>
            <IonSpinner name='lines-sharp' color='secondary' style={{ width: '36px', height: '36px' }} />
        </div>
    )
}
