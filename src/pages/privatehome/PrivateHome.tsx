import './privatehome.css';
import { useQuery } from '@tanstack/react-query';
import { eventsActions } from '../../actions/eventsActions';
import Calendar from '../../components/events/calendar/CalendarSwiper';
import { Calendar1, Handshake, Newspaper, ExternalLink } from 'lucide-react';
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
          <div className='h-full bg-white rounded-3xl shadow-xl p-2 backdrop-blur-sm border border-white/20 transform hover:shadow-2xl transition-all duration-500'>
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
              <div className='inset-0 rounded'></div>
              <Calendar events={events} />
            </div>
          </div>
        </section>

        {/* News Section */}
        <section className='container mx-auto'>
          <div className='bg-white rounded-3xl shadow-xl p-2 backdrop-blur-sm border border-white/20 transform hover:shadow-2xl transition-all duration-500'>
            <div className='flex items-center justify-between mb-4'>
              <Heading
                title="notícies"
                variant="h1"
                icon={Newspaper}
                iconSize={10}
              />
            </div>
            
            <div className='relative'>
              <div className='absolute inset-0 rounded'></div>
              <Posts posts={posts} />
            </div>
          </div>
        </section>

        {/* Sponsors Section */}
        <section className='container mx-auto'>
          <div className='bg-gradient-to-br from-blue-50 to-secondary/10 rounded-3xl shadow-xl p-4 backdrop-blur-sm transform hover:shadow-2xl transition-all duration-500'>
            <div className='flex items-center justify-between mb-4'>
              <Heading
                title="patrocinadors"
                variant="h1"
                icon={Handshake}
                iconSize={10}
              />
            </div>
            
            <div className='space-y-6'>
              <p className='text-gray-600 text-lg leading-relaxed'>
                Descobreix tots els avantatges i descomptes exclusius que tenim per a tu com a membre del club.
              </p>
              
              {/* Enhanced Button */}
              <div className='relative group'>
                <div className='absolute -inset-0.5 bg-gradient-to-br from-secondary to-tertiary rounded group-hover:opacity-100 transition duration-300'></div>
                <IonButton
                  expand='block'
                  fill='clear'
                  className='relative text-white rounded-xl px-8 shadow-lg transform hover:scale-105 transition-all duration-300'
                  onClick={() => window.open('https://deporunners.cat/patrocinadors/', '_blank')}
                >
                  <div className='flex items-center justify-between w-full'>
                    <span className='text-white capitalize font-semibold text-sm truncate'>
                      Beneficis del Club
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