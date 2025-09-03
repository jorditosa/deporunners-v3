import { IonButton, IonCard, IonImg } from '@ionic/react';
import PrivateLayout from '../PrivateLayout';
import { ShoppingCart } from 'lucide-react';
import Heading from '../../components/ui/Heading';

const ShopPage: React.FC = () => {
  return (
    <PrivateLayout
      contentColor='light'
    >

      <main className='container'>
        <Heading
          title='La Botiga'
          variant='h1'
        />
        <div className="grid grid-cols-2 gap-2">

          <IonCard color='secondary' className='h-[240px]'>
            <p className='text-white text-base text-center py-2'>Samarreta Dona</p>
            <div>
              <IonImg
                src='/shop/samarreta_dona.jpeg'
                className='h-40 object-cover object-bottom'
              />
              <IonButton
              color='light'
              expand='full'
              onClick={() => window.open('https://deporunners.cat/producto/samarreta-tecnica-dona-tuga-2025/', '_blank')}
              >
                <span className='text-secondary me-2'>Comprar</span>
                <ShoppingCart className='size-6 text-secondary' />
              </IonButton>
            </div>
          </IonCard>

          <IonCard color='secondary' className='h-[240px]'>
            <p className='text-white text-base text-center py-2'>Samarreta Home</p>
            <div>
              <IonImg
                src='/shop/samarreta.jpeg'
                className='h-40 object-cover object-bottom'
              />
              <IonButton
              color='light'
              expand='full'
              onClick={() => window.open('https://deporunners.cat/producto/samarreta-tecnica-home-tuga-2025-2/', '_blank')}
              >
                <span className='text-secondary me-2'>Comprar</span>
                <ShoppingCart className='size-6 text-secondary' />
              </IonButton>
            </div>
          </IonCard>

          <IonCard color='secondary' className='h-[240px]'>
            <p className='text-white text-base text-center py-2'>Pantaló Trail</p>
            <div>
              <IonImg
                src='/shop/pantalo_trail.jpeg'
                className='h-40 object-cover object-bottom'
              />
              <IonButton
              color='light'
              expand='full'
              onClick={() => window.open('https://deporunners.cat/producto/samarreta-tecnica-tirants-home-tuga-2025/', '_blank')}
              >
                <span className='text-secondary me-2'>Comprar</span>
                <ShoppingCart className='size-6 text-secondary' />
              </IonButton>
            </div>
          </IonCard>

          <IonCard color='secondary' className='h-[240px]'>
            <p className='text-white text-base text-center py-2'>Pantaló Running</p>
            <div>
              <IonImg
                src='/shop/pantalo_running.jpeg'
                className='h-40 object-cover object-bottom'
              />
              <IonButton
              color='light'
              expand='full'
              onClick={() => window.open('https://deporunners.cat/producto/pantalo-running-tuga-2025/', '_blank')}
              >
                <span className='text-secondary me-2'>Comprar</span>
                <ShoppingCart className='size-6 text-secondary' />
              </IonButton>
            </div>
          </IonCard>

          <IonCard color='secondary' className='h-[240px]'>
            <p className='text-white text-base text-center py-2'>Tallavents</p>
            <div>
              <IonImg
                src='/shop/tallavents.jpeg'
                className='h-40 object-cover object-bottom'
              />
              <IonButton
              color='light'
              expand='full'
              onClick={() => window.open('https://deporunners.cat/producto/samarreta-tecnica-home-tuga-2025/', '_blank')}
              >
                <span className='text-secondary me-2'>Comprar</span>
                <ShoppingCart className='size-6 text-secondary' />
              </IonButton>
            </div>
          </IonCard>

          <IonCard color='secondary' className='h-[240px]'>
            <p className='text-white text-base text-center py-2'>Tirants Home</p>
            <div>
              <IonImg
                src='/shop/tirants_home.jpeg'
                className='h-40 object-cover object-bottom'
              />
              <IonButton
              color='light'
              expand='full'
              onClick={() => window.open('https://deporunners.cat/producto/samarreta-tecnica-tirants-home-tuga-2025-2/', '_blank')}
              >
                <span className='text-secondary me-2'>Comprar</span>
                <ShoppingCart className='size-6 text-secondary' />
              </IonButton>
            </div>
          </IonCard>

          <IonCard color='secondary' className='h-[240px]'>
            <p className='text-white text-base text-center py-2'>Tirants Dona</p>
            <div>
              <IonImg
                src='/shop/tirants_dona.jpeg'
                className='h-40 object-cover object-bottom'
              />
              <IonButton
              color='light'
              expand='full'
              onClick={() => window.open('https://deporunners.cat/producto/samarreta-tecnica-tirants-dona-tuga-2025/', '_blank')}
              >
                <span className='text-secondary me-2'>Comprar</span>
                <ShoppingCart className='size-6 text-secondary' />
              </IonButton>
            </div>
          </IonCard>
         
        </div>
      </main>
    </PrivateLayout>
  );
};

export default ShopPage;
