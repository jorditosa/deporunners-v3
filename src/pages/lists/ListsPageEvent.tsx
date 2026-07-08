import { useQuery } from '@tanstack/react-query';
import PrivateLayout from '../PrivateLayout';
import { eventsActions } from '../../actions/eventsActions';
import { useParams } from 'react-router';
import Spinner from '../../components/ui/Spinner';
import Heading from '../../components/ui/Heading';
import EmptyState from '../../components/ui/EmptyState';
import AddToList from '../../components/lists/AddToList';
import { listsActions } from '../../actions/listsActions';
import { ListItem } from '../../interfaces/lists.interface';
import { formatDate } from '../../helpers/formatDate';
import { LinkSquare, Pin, Users, Trophy, Calendar, Group2, WifiOff } from 'reicon';
import Icon from '../../components/ui/Icon';
import { useAuth } from '../../hooks/useAuth';
import DeleteToList from '../../components/lists/DeleteToList';
import BackBtn from '../../components/ui/BackBtn';

export default function ListsPageEvent() {
  const { id } = useParams<{ id: string }>();
  const { data: user } = useAuth();

  const { data: event, isLoading, isError: isEventError, refetch: refetchEvent } = useQuery({
    queryKey: ['events', id],
    queryFn: () => eventsActions.geteventById(id),
    enabled: !!id
  });
  const { data: list, isLoading: isLoadingList, isError: isListError, refetch: refetchList } = useQuery({
    queryKey: ['list'],
    queryFn: listsActions.getAllList
  });

  const eventParticipants =
    list && event
      ? list
        .filter((item: ListItem) => +item.attributes.cursa_id === +event.id)
        .sort((a, b) => a.id - b.id)
      : [];

  const currentUserEntry = eventParticipants.find(item => item.attributes.name === user?.username);

  if (isLoading || isLoadingList) return <Spinner />
  if (isEventError || isListError) return (
    <PrivateLayout contentColor='light'>
      <main className='container'>
        <BackBtn />
        <EmptyState
          icon={WifiOff}
          title="No s'ha pogut carregar l'esdeveniment"
          description="Comprova la connexió i torna-ho a provar."
          actionLabel="Reintentar"
          onAction={() => { refetchEvent(); refetchList(); }}
        />
      </main>
    </PrivateLayout>
  )
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
            <div className='relative h-16 overflow-hidden'>
              <img
                src={event.image.url}
                alt={event.title}
                className='w-full h-full object-cover object-center'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent'></div>
              <p className='absolute bottom-1 left-2 right-2 text-white font-semibold text-sm truncate'>
                {event.title}
              </p>
            </div>
          )}

          <div className='p-3 space-y-3'>
            {/* Title (if no image) */}
            {!event.image && (
              <Heading
                title={event.title}
                variant='h2'
                icon={Trophy}
                iconSize={6}
              />
            )}

            {/* Event Info */}
            <div className='space-y-1.5'>
              <div className='space-y-1 text-sm text-gray-700'>
                <span className='flex items-center gap-1.5'>
                  <Icon icon={Calendar} className='size-4 text-secondary shrink-0' />
                  <span className='font-medium'>{formatDate(event.start_date)}</span>
                </span>
                <span className='flex items-center gap-1.5'>
                  <Icon icon={Pin} className='size-4 text-secondary shrink-0' />
                  <span className='font-medium'>{event.venue.venue}</span>
                </span>
              </div>

              <div className='flex items-center justify-between gap-3'>
                <span className='flex items-center gap-1.5 text-sm text-green-700 font-semibold'>
                  <Icon icon={Users} className='size-4 shrink-0' />
                  {eventParticipants.length} apuntats
                </span>
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='flex items-center gap-1.5 text-sm text-secondary font-semibold hover:underline'
                >
                  <Icon icon={LinkSquare} className='size-4 shrink-0' />
                  Més info
                </a>
              </div>
            </div>

            {/* Add to List Component */}
            <AddToList event={event} />
          </div>
        </div>

        {/* Participants Section - LIST */}
        <div className='bg-white rounded-xl shadow-lg py-4 px-2'>
          <div className='w-full flex items-center justify-center mb-4'>
            <Heading
              title={`${eventParticipants.length} apuntats`}
              variant='h3'
              icon={Users}
              iconSize={6}
            />
          </div>

          {eventParticipants.length > 0 ? (
            <div className='space-y-1'>
              {eventParticipants.map((item: ListItem) => {
                const isCurrentUser = item.id === currentUserEntry?.id;
                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between gap-3 p-2 rounded-lg ${isCurrentUser ? 'bg-secondary/10' : ''}`}
                  >
                    <div className='flex items-center gap-3 min-w-0'>
                      <img
                        src={item.attributes.avatar}
                        alt={item.attributes.name}
                        className='size-10 rounded-full object-cover border-2 border-secondary/30 shrink-0'
                      />
                      <span className={`truncate ${isCurrentUser ? 'font-semibold text-secondary' : 'text-gray-800'}`}>
                        {item.attributes.name}
                      </span>
                    </div>

                    {isCurrentUser && <DeleteToList id={item.id} />}
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              icon={Group2}
              title="Encara no hi ha participants"
              description="Sigues el primer a apuntar-te a aquest esdeveniment!"
            />
          )}
        </div>

      </main >
    </PrivateLayout >
  )
}