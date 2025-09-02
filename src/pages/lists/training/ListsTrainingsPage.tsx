import { IonButton, IonCardHeader, IonCardSubtitle, IonRow, IonText, useIonRouter } from '@ionic/react';
import PrivateLayout from '../../PrivateLayout';
import Spinner from '../../../components/ui/Spinner';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { eventsActions } from '../../../actions/eventsActions';
import { listsActions } from '../../../actions/listsActions';
import { Event } from '../../../interfaces/events.interface';
import Heading from '../../../components/ui/Heading';
import { formatDate } from '../../../helpers/formatDate';
import { formatHour } from '../../../helpers/formatHour';
import { formatUTF } from '../../../helpers/formatUTF';
import { Info, ListStart, MapIcon } from 'lucide-react';
import { APP_ROUTES } from '../../../constants/endpoints';

const ListsTrainingsPage: React.FC = () => {
    const router = useIonRouter();
    const queryClient = useQueryClient();
    const cachedEvents = queryClient.getQueryData<Event[]>(['events']);
    const { data: events, isLoading: isLoadingEvents } = useQuery<Event[]>({
        queryKey: ['events'],
        queryFn: eventsActions.getAllEvents,
        enabled: !cachedEvents,
        initialData: cachedEvents
    });

    const { data: trainingsList, isLoading: isLoadingTrainings } = useQuery({
        queryKey: ['trainings-lists'],
        queryFn: listsActions.getAllTrainingsLists,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true
    });

    if (isLoadingTrainings || isLoadingEvents) return <Spinner />
    if (events) {
        const training = events.find((event: Event) =>
            event.categories?.[0]?.name === 'Entrenaments'
        );
        
        return (
            <PrivateLayout
                title='Entrenaments'
                headerColor='secondary'
                contentColor='light'
            >
                <main className='container'>
                    <Heading
                        title='Llista entrenament'
                        variant='h2'
                    />
                    <IonRow>
                        {
                            training
                                ? (
                                    <>
                                        <IonCardHeader className='ion-text-center py-2'>
                                            <h2 className='text-xl font-semibold border-b pb-2'>{formatDate(training.start_date.toString())}
                                            </h2>
                                        </IonCardHeader>
                                        <div className='w-full flex items-center mt-1 px-4 py-1'>
                                            <div className='w-full flex flex-col items-center justify-between'>
                                                <IonText className='text-lg text-center font-semibold'>
                                                    <p>{formatHour(training.start_date.toString()) + 'h'}</p>
                                                </IonText>
                                                <div className='flex items-center gap-1 py-1'>
                                                    <MapIcon />
                                                    <IonCardSubtitle className='my-0 text-lg text-primary'>
                                                        {formatUTF(training.venue.venue)}
                                                    </IonCardSubtitle>
                                                </div>
                                            </div>
                                        </div>
                                        <IonText className='flex items-center gap-1 px-4 py-2'>
                                            <p className='my-0 text-sm text-center'>
                                                {formatUTF(training.title)}
                                            </p>
                                        </IonText>
                                        <IonText className='flex flex-col items-center gap-1 mx-7 border-b pb-4'>
                                            <a
                                                href={training.url}
                                                target="_blank"
                                                className='flex justify-center items-center w-full mx-2 h-10 rounded-full bg-blue-100 text-primary uppercase font-semibold font-sans shadow-md shadow-primary'>
                                                <Info />
                                                Consulta més info al Web
                                            </a>

                                        </IonText>
                                    </>
                                )
                                : (
                                    <>
                                    <p>No està planificat el proper entrenament</p>
                                    <IonButton color='secondary' expand='block' className='w-full' onClick={() => router.push(APP_ROUTES.PRIVATE_LISTS, 'back')}>
                                        <div className='flex items-center gap-2'>
                                            <ListStart className='size-8' color='white'/>
                                            <span className='text-white italic text-base'>Veure llistes</span>
                                        </div>
                                    </IonButton>
                                    </>
                                )
                        }

                    </IonRow>
                </main>

            </PrivateLayout >
        );
    };
};

export default ListsTrainingsPage;
