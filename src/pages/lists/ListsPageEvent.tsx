import { useQuery } from '@tanstack/react-query';
import PrivateLayout from '../PrivateLayout';
import { eventsActions } from '../../actions/eventsActions';
import { useParams } from 'react-router';
import Spinner from '../../components/ui/Spinner';
import Heading from '../../components/ui/Heading';
import AddToList from '../../components/lists/AddToList';
import { listsActions } from '../../actions/listsActions';
import { ListItem } from '../../interfaces/lists.interface';
import { formatDate } from '../../helpers/formatDate';
import { ExternalLink, MapPin, Users, Trophy, Calendar1 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import DeleteToList from '../../components/lists/DeleteToList';
import BackBtn from '../../components/ui/BackBtn';

export default function ListsPageEvent() {
  const { id } = useParams<{ id: string }>();
  const { data: user } = useAuth();

  const { data: event, isLoading } = useQuery({
    queryKey: ['events', id],
    queryFn: () => eventsActions.geteventById(id),
    enabled: !!id
  });
  const { data: list, isLoading: isLoadingList } = useQuery({
    queryKey: ['list'],
    queryFn: listsActions.getAllList
  });

  const eventParticipants =
  list && event
    ? list.filter((item: ListItem) => +item.attributes.cursa_id === +event.id)
    : [];


  if (isLoading || isLoadingList) return <Spinner />
  if (event && list) return (
    <PrivateLayout
      contentColor='light'
    >
      <main className='container space-y-6'>
        <BackBtn />

        {/* Event Header Card */}
        <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
          {/* Event Image (if available) */}
          {event.image && (
            <div className='relative h-52 overflow-hidden'>
              <img 
                src={event.image.url} 
                alt={event.title}
                className='w-full h-full object-cover object-top transform hover:scale-105 transition-transform duration-500'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent'></div>
            </div>
          )}

          <div className='p-4 space-y-4'>
            {/* Title (if no image) */}
            {!event.image && (
              <Heading
                title={event.title}
                variant='h1'
                icon={Trophy}
                iconSize={8}
              />
            )}

            {/* Event Info */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
              <div className='flex items-center gap-3 p-2 bg-gray-50 rounded-lg'>
                <div className='bg-indigo-100 p-2 rounded-full'>
                  <Calendar1 className='h-5 w-5 text-secondary' />
                </div>
                <div>
                  <p className='text-sm text-gray-600'>Data de l'esdeveniment</p>
                  <p className='font-semibold text-gray-800'>{formatDate(event.start_date)}</p>
                </div>
              </div>

              <div className='flex items-center gap-3 p-2 bg-gray-50 rounded-lg'>
                <div className='bg-blue-100 p-2 rounded-full'>
                  <MapPin className='h-5 w-5 text-primary' />
                </div>
                <div>
                  <p className='text-sm text-gray-600'>Lloc de l'esdeveniment</p>
                  <p className='font-semibold text-gray-800'>{event.venue.venue}</p>
                </div>
              </div>              

              <div className='flex items-center gap-3 p-2 bg-gray-50 rounded-lg'>
                <div className='bg-green-100 p-2 rounded-full'>
                  <Users className='h-5 w-5 text-green-600' />
                </div>
                <div>
                  <p className='text-sm text-gray-600'>Participants apuntats</p>
                  <p className='font-semibold text-gray-800'>{eventParticipants.length}</p>
                </div>
              </div>
            </div>

            {/* External Link */}
            <a 
              href={event.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className='flex w-full items-center gap-2 p-4 bg-gray-50! rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
            >
              <ExternalLink className='size-6' />
              <span>Més informació al Web</span>
            </a>

            {/* Add to List Component */}
            <div className='pt-4 border-t border-gray-200'>
              <AddToList event={event} />
            </div>
          </div>
        </div>

        {/* Participants Section - SIMPLE LIST */}
        <div className='bg-white rounded-xl shadow-lg p-4'>
          <div className='flex items-center justify-between mb-6'>
            <Heading
              title={`Llista de participants (${eventParticipants.length})`}
              variant='h2'
              icon={Users}
              iconSize={6}
            />
          </div>

          {/* SIMPLE PARTICIPANT LIST */}
          {eventParticipants.length > 0 ? (
            <div className='space-y-1'>
              {eventParticipants.map((item: ListItem, i: number) => {
                const position = i + 1;
                const isCurrentUser = user.username === item.attributes.name;
                
                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-3 ${
                      i % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    } hover:bg-gray-100 transition-colors duration-200`}
                  >
                    <div className='flex items-center gap-3'>
                      <span className='text-sm font-medium text-gray-600 w-6'>
                        {position}
                      </span>
                      <p className={`font-medium ${
                        isCurrentUser ? 'text-indigo-700' : 'text-gray-800'
                      }`}>
                        {item.attributes.name}
                        {isCurrentUser && (
                          <span className='ml-2 px-2 py-1 bg-indigo-200 text-indigo-800 text-xs rounded-full font-medium'>
                            Tu
                          </span>
                        )}
                      </p>
                    </div>

                    {isCurrentUser && (
                      <DeleteToList id={item.id} />
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className='text-center py-12 space-y-4'>
              <div className='mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center'>
                <Users className='h-8 w-8 text-gray-400' />
              </div>
              <div className='space-y-2'>
                <h3 className='text-lg font-semibold text-gray-700'>
                  Encara no hi ha participants
                </h3>
                <p className='text-gray-500'>
                  Sigues el primer a apuntar-te a aquest esdeveniment!
                </p>
              </div>
            </div>
          )}
        </div>

      </main>
    </PrivateLayout>
  )
}