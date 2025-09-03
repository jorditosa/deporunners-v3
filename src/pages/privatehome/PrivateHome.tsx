import './privatehome.css';
import { useQuery } from '@tanstack/react-query';
import { eventsActions } from '../../actions/eventsActions';
import Calendar from '../../components/events/calendar/CalendarSwiper';
import { Calendar1, Handshake, Newspaper, Star, ExternalLink } from 'lucide-react';
import { postsActions } from '../../actions/postsActions';
import Posts from '../../components/posts/Posts';
import Spinner from '../../components/ui/Spinner';
import PrivateLayout from '../PrivateLayout';
import Heading from '../../components/ui/Heading';
import { IonButton } from '@ionic/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';

const PrivateHome: React.FC = () => {
  const { data: events, isLoading: isLoadingEvents } = useQuery({
    queryKey: ['events'],
    queryFn: eventsActions.getAllEvents
  });

  const { data: posts, isLoading: isLoadingPosts } = useQuery({
    queryKey: ['posts'],
    queryFn: postsActions.getAllPosts
  });

  if (isLoadingEvents || isLoadingPosts) return <Spinner />
  if (events) return (
    <PrivateLayout
      title='Dashboard'
      headerColor='secondary'
      contentColor='light'
    >
      <main className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'>
        
        

        {/* Calendar Section */}
        <section className='container mx-auto'>
          <div className='bg-white rounded-3xl shadow-xl p-4 backdrop-blur-sm border border-white/20 transform hover:shadow-2xl transition-all duration-500'>
            <div className='flex items-center justify-between mb-4'>
              <Heading
                title="el Calendari"
                variant="h1"
                icon={Calendar1}
                iconSize={10}
                className='text-transparent bg-clip-text'
              />
            </div>
            
            <div className='relative'>
              <div className='absolute inset-0 rounded'></div>
              <Calendar events={events} />
            </div>
          </div>
        </section>

        {/* News Section */}
        <section className='container mx-auto'>
          <div className='bg-white rounded-3xl shadow-xl p-4 backdrop-blur-sm border border-white/20 transform hover:shadow-2xl transition-all duration-500'>
            <div className='flex items-center justify-between mb-4'>
              <Heading
                title="notícies"
                variant="h1"
                icon={Newspaper}
                iconSize={10}
                className='text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600'
              />
              <div className='hidden md:flex items-center gap-2 text-sm text-gray-500'>
                <div className='flex space-x-1'>
                  <div className='w-2 h-2 bg-blue-400 rounded-full animate-bounce'></div>
                  <div className='w-2 h-2 bg-blue-400 rounded-full animate-bounce' style={{animationDelay: '0.1s'}}></div>
                  <div className='w-2 h-2 bg-blue-400 rounded-full animate-bounce' style={{animationDelay: '0.2s'}}></div>
                </div>
                <span>Actualitzant...</span>
              </div>
            </div>
            
            <div className='relative'>
              <div className='absolute inset-0 rounded'></div>
              <Posts posts={posts} />
            </div>
          </div>
        </section>

        {/* Sponsors Section */}
        <section className='container mx-auto'>
          <div className='bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl shadow-xl p-4 backdrop-blur-sm border border-orange-100 transform hover:shadow-2xl transition-all duration-500'>
            <div className='flex items-center justify-between mb-4'>
              <Heading
                title="patrocinadors"
                variant="h1"
                icon={Handshake}
                iconSize={10}
                className='text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600'
              />
              <div className='hidden md:block'>
                <div className='flex items-center gap-2 px-3 py-1 bg-orange-100 rounded-full text-orange-700 text-sm font-medium'>
                  <Star className='h-4 w-4' />
                  <span>Exclusiu</span>
                </div>
              </div>
            </div>
            
            <div className='space-y-6'>
              <p className='text-gray-600 text-lg leading-relaxed'>
                Descobreix tots els avantatges i descomptes exclusius que tenim per a tu com a membre del club.
              </p>
              
              {/* Enhanced Button */}
              <div className='relative group'>
                <div className='absolute -inset-0.5 bg-gradient-to-br from-secondary to-primary rounded group-hover:opacity-100 transition duration-300'></div>
                <IonButton
                  expand='block'
                  fill='clear'
                  className='relative text-white rounded-xl px-8 shadow-lg transform hover:scale-105 transition-all duration-300'
                  onClick={() => window.open('https://deporunners.cat/patrocinadors/', '_blank')}
                >
                  <div className='flex items-center justify-between w-full'>
                    <span className='text-white capitalize font-semibold text-lg'>
                      Veure beneficis del Club
                    </span>
                    <div className='flex items-center gap-2'>
                      <ExternalLink className='size-6 text-white group-hover:translate-x-1 transition-transform duration-300' />
                    </div>
                  </div>
                </IonButton>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PrivateLayout>
  );
};

export default PrivateHome;