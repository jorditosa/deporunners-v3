import './privatehome.css';
import { useQuery } from '@tanstack/react-query';
import { eventsActions } from '../../actions/eventsActions';
import EventCard from '../../components/events/EventCard';
import { Calendar, Handshake, FileText, LinkSquare, CalendarX } from 'reicon';
import Icon from '../../components/ui/Icon';
import { postsActions } from '../../actions/postsActions';
import Posts from '../../components/posts/Posts';
import Spinner from '../../components/ui/Spinner';
import EmptyState from '../../components/ui/EmptyState';
import PrivateLayout from '../PrivateLayout';
import Heading from '../../components/ui/Heading';
import { IonButton, useIonRouter } from '@ionic/react';
import { APP_ROUTES } from '../../constants/endpoints';

const PrivateHome: React.FC = () => {
  const router = useIonRouter();
  const { data: events, isLoading: isLoadingEvents, isError: isEventsError, refetch: refetchEvents } = useQuery({
    queryKey: ['events'],
    queryFn: eventsActions.getAllEvents
  });

  const { data: posts, isLoading: isLoadingPosts } = useQuery({
    queryKey: ['posts'],
    queryFn: postsActions.getAllPosts
  });

  const upcomingEvents = events
    ? [...events]
        .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
        .slice(0, 3)
    : [];

  if (isLoadingEvents || isLoadingPosts) return <Spinner />
  if (events) return (
    <PrivateLayout
      contentColor='light'
    >
      <main className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'>

        {/* Calendar Section */}
        <section className='container mx-auto'>
          <div className='flex items-center justify-between mb-4'>
            <Heading
              title="Pròxims esdeveniments"
              variant="h1"
              icon={Calendar}
              iconSize={10}
              className='text-transparent bg-clip-text'
            />
          </div>

          {isEventsError ? (
            <EmptyState
              icon={CalendarX}
              title="No s'han pogut carregar els esdeveniments"
              description="Comprova la connexió i torna-ho a provar."
              actionLabel="Reintentar"
              onAction={() => refetchEvents()}
            />
          ) : upcomingEvents.length > 0 ? (
            <div className='space-y-3'>
              {upcomingEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
              <button
                onClick={() => router.push(APP_ROUTES.PRIVATE_LISTS, 'forward')}
                className='w-full py-3 text-secondary font-semibold hover:underline'
              >
                Veure calendari complet
              </button>
            </div>
          ) : (
            <EmptyState
              icon={CalendarX}
              title="No hi ha esdeveniments propers"
              description="Torna més endavant per veure nous entrenos i curses."
            />
          )}
        </section>

        {/* News Section */}
        <section className='container mx-auto'>
          <div className='bg-white rounded shadow-xl p-2 backdrop-blur-sm border border-white/20 transform hover:shadow-2xl transition-all duration-500'>
            <div className='flex items-center justify-between mb-4'>
              <Heading
                title="notícies"
                variant="h1"
                icon={FileText}
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
                <div className='absolute -inset-0.5 bg-gradient-to-br from-secondary to-primary rounded group-hover:opacity-100 transition duration-300'></div>
                <IonButton
                  expand='block'
                  fill='clear'
                  className='relative text-white rounded-xl  shadow-lg transform hover:scale-105 transition-all duration-300'
                  onClick={() => window.open('https://deporunners.cat/patrocinadors/', '_blank')}
                >
                  <div className='flex items-center justify-between w-full'>
                    <span className='text-white capitalize font-semibold text-sm truncate'>
                      Beneficis del Club
                    </span>
                    <div className='flex items-center gap-2'>
                      <Icon icon={LinkSquare} className='size-6 text-white group-hover:translate-x-1 transition-transform duration-300' />
                    </div>
                  </div>
                </IonButton>
              </div>
            </div>
        </section>
      </main>
    </PrivateLayout>
  );
};

export default PrivateHome;