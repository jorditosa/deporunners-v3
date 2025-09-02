import { IonButton, IonItem, IonRow, IonText, useIonRouter } from '@ionic/react';
import PrivateLayout from '../../PrivateLayout';
import Spinner from '../../../components/ui/Spinner';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { eventsActions } from '../../../actions/eventsActions';
import { Event } from '../../../interfaces/events.interface';
import Heading from '../../../components/ui/Heading';
import { formatDate } from '../../../helpers/formatDate';
import { formatUTF } from '../../../helpers/formatUTF';
import { ZoomIn } from 'lucide-react';
import { APP_ROUTES } from '../../../constants/endpoints';

const EVENT_COLORS: Record<string, string> = {
  'Entrenaments': 'primary',
  'Caminades': 'secondary',
  'Curses': 'success',
  'Social': 'warning'
};

const ListsRacesPage: React.FC = () => {
    const router = useIonRouter();
    const queryClient = useQueryClient();
    const cachedEvents = queryClient.getQueryData<Event[]>(['events']);
    const { data: events, isLoading: isLoadingEvents } = useQuery<Event[]>({
        queryKey: ['events'],
        queryFn: eventsActions.getAllEvents,
        enabled: !cachedEvents,
        initialData: cachedEvents
    });

    if (isLoadingEvents) return <Spinner />
    if (events) {
        return (
            <PrivateLayout
                title='Calendari'
                headerColor='secondary'
                contentColor='light'
            >
                <main className='container'>
                    <Heading
                        title='Calendari'
                        variant='h2'
                    />
                    <IonRow>
                        {
                            events ?
                                (
                                    events
                                        .map((event: Event) => (
                                            <IonItem
                                                key={event.id}
                                                color='light'
                                                className='w-full mb-1'
                                            >
                                                <div className="w-full flex flex-col items-start pb-1">
                                                    <IonText 
                                                    color={EVENT_COLORS[event.categories[0]?.name] || 'medium'} 
                                                    className='w-full'>
                                                        <h4 className="font-semibold line-clamp-1 my-1!">{formatUTF(event.title)}</h4>
                                                        <div className='flex justify-between'>
                                                            <p className="text-primary text-sm">{formatDate(event.start_date)}</p>
                                                            <span className='block text-sm'>{event.categories[0].name}</span>
                                                        </div>
                                                    </IonText>

                                                    <IonButton
                                                        onClick={() => router.push(`${APP_ROUTES.PRIVATE_LISTS_RACES}/${event.id}`, 'forward')}
                                                        color={EVENT_COLORS[event.categories[0]?.name]}
                                                        expand='full'
                                                        fill='solid'
                                                        className='w-full flex flex-col justify-between'
                                                    >
                                                        <span className='capitalize text-white me-2'>Llistes i Info</span>
                                                        <ZoomIn className='text-white size-6' />
                                                    </IonButton>
                                                </div>
                                            </IonItem>
                                        )))
                                : (
                                    <Spinner />
                                )
                        }

                    </IonRow>
                </main>

            </PrivateLayout >
        );
    };
};

export default ListsRacesPage;
