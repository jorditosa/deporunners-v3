import { IonButton, IonItem, IonRow, IonText, useIonRouter } from '@ionic/react';
import PrivateLayout from '../../PrivateLayout';
import Spinner from '../../../components/ui/Spinner';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { eventsActions } from '../../../actions/eventsActions';
import { Event } from '../../../interfaces/events.interface';
import Heading from '../../../components/ui/Heading';
import { formatDate } from '../../../helpers/formatDate';
import { formatUTF } from '../../../helpers/formatUTF';
import { Link, ZoomIn } from 'lucide-react';

const ListsRacesPage: React.FC = () => {
    const router = useIonRouter();
    const queryClient = useQueryClient();
    const cachedEvents = queryClient.getQueryData<Event[]>(['events']);
    const { data: racesData, isLoading: isLoadingEvents } = useQuery<Event[]>({
        queryKey: ['races'],
        queryFn: eventsActions.getAllRaces,
        enabled: !cachedEvents,
        initialData: cachedEvents
    });

    console.log(racesData)


    if (isLoadingEvents) return <Spinner />
    if (racesData) {
        return (
            <PrivateLayout
                title='Curses'
                headerColor='secondary'
                contentColor='light'
            >
                <main className='container'>
                    <Heading
                        title='Properes Curses'
                        variant='h2'
                    />
                    <IonRow>
                        {
                            racesData ?
                                (
                                    racesData
                                        .map((race: Event) => (
                                            <IonItem key={race.id} className="w-full flex justify-between items-center" color='light'>

                                                <IonText className='text-secondary py-2'>
                                                    <h3 className="font-semibold line-clamp-1">{formatUTF(race.title)}</h3>
                                                    <p className="text-primary text-sm">{formatDate(race.start_date)}</p>
                                                </IonText>

                                                <IonButton
                                                    onClick={() => router.push(`/curses/${race.id}`, 'forward')}
                                                    color='secondary'
                                                    slot='end'
                                                >
                                                    <ZoomIn className='text-white size-6' />
                                                </IonButton>
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
