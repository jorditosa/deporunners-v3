import { IonImg } from '@ionic/react';
import PrivateLayout from '../PrivateLayout';
import { ShoppingCart, Store, ExternalLink } from 'lucide-react';
import Heading from '../../components/ui/Heading';

const ShopPage: React.FC = () => {
  const products = [
    {
      id: 'samarreta-dona',
      name: 'Samarreta Dona',
      image: '/shop/samarreta_dona.jpeg',
      url: 'https://deporunners.cat/producto/samarreta-tecnica-dona-tuga-2025/',
      category: 'Samarretes'
    },
    {
      id: 'samarreta-home',
      name: 'Samarreta Home',
      image: '/shop/samarreta.jpeg',
      url: 'https://deporunners.cat/producto/samarreta-tecnica-home-tuga-2025-2/',
      category: 'Samarretes'
    },
    {
      id: 'pantalo-trail',
      name: 'Pantaló Trail',
      image: '/shop/pantalo_trail.jpeg',
      url: 'https://deporunners.cat/producto/samarreta-tecnica-tirants-home-tuga-2025/',
      category: 'Pantalons'
    },
    {
      id: 'pantalo-running',
      name: 'Pantaló Running',
      image: '/shop/pantalo_running.jpeg',
      url: 'https://deporunners.cat/producto/pantalo-running-tuga-2025/',
      category: 'Pantalons'
    },
    {
      id: 'tallavents',
      name: 'Tallavents',
      image: '/shop/tallavents.jpeg',
      url: 'https://deporunners.cat/producto/samarreta-tecnica-home-tuga-2025/',
      category: 'Complements'
    },
    {
      id: 'tirants-home',
      name: 'Tirants Home',
      image: '/shop/tirants_home.jpeg',
      url: 'https://deporunners.cat/producto/samarreta-tecnica-tirants-home-tuga-2025-2/',
      category: 'Samarretes'
    },
    {
      id: 'tirants-dona',
      name: 'Tirants Dona',
      image: '/shop/tirants_dona.jpeg',
      url: 'https://deporunners.cat/producto/samarreta-tecnica-tirants-dona-tuga-2025/',
      category: 'Samarretes'
    }
  ];

  return (
    <PrivateLayout
      contentColor='light'
    >
      <main className='container space-y-6'>
        
        {/* Header Section */}
        <div className='space-y-4'>
          <Heading
            title='La Botiga'
            variant='h1'
            icon={Store}
            iconSize={10}
          />
          <p className='text-gray-600 text-base'>
            Descobreix els nostres productes oficials del club
          </p>
        </div>

        {/* Stats Card */}
        <div className='bg-gradient-to-br from-secondary to-primary rounded-xl shadow-lg p-4 text-white'>
          <div className='flex items-center justify-between'>
            <div className='space-y-1'>
              <p className='text-indigo-100 text-sm'>Productes disponibles</p>
              <p className='text-3xl font-bold'>{products.length}</p>
            </div>
            <div className='bg-white/20 p-3 rounded-full'>
              <ShoppingCart className='h-8 w-8 text-white' />
            </div>
          </div>
        </div>

      {/* Products Grid */}
        <div className='bg-gray-50 rounded-xl'>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div 
                key={product.id}
                className='bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] hover:shadow-xl transition-all duration-300 group'
              >
                {/* Product Image */}
                <div className='relative overflow-hidden'>
                  <IonImg
                    src={product.image}
                    alt={product.name}
                    className='h-56 w-full object-cover group-hover:scale-110 transition-transform duration-500 object-cover'
                  />
                  
                  {/* Overlay gradient */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                            
                </div>

                {/* Product Info */}
                <div className='p-4 space-y-3'>
                  <div className='space-y-1'>
                    <h3 className='font-bold text-gray-800 text-lg group-hover:text-indigo-600 transition-colors duration-300'>
                      {product.name}
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Producte oficial del club
                    </p>
                  </div>

                  {/* Buy Button */}
                  <button
                    onClick={() => window.open(product.url, '_blank')}
                    className='w-full bg-gradient-to-r from-secondary to-primary text-white py-3! rounded! font-medium hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2'
                  >
                    <ShoppingCart className='size-5' />
                    <span>Comprar</span>
                    <ExternalLink className='size-5' />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </PrivateLayout>
  );
};

export default ShopPage;