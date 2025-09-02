import { IonAvatar, IonButton, IonCardContent, IonCardHeader, IonCardSubtitle, IonImg, IonLabel, IonList, IonRow, IonText, useIonRouter } from '@ionic/react';
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
import { Info, ListStart, MapIcon, MapPin } from 'lucide-react';
import { APP_ROUTES } from '../../../constants/endpoints';
import { formatName } from '../../../helpers/formatName';
import AddToList from '../../../components/lists/AddToList';
import { UserList } from '../../../interfaces/user.interface';

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

    const { data: otherEventsLists, isLoading } = useQuery({
        queryKey: ['other-lists'],
        queryFn: listsActions.getAllTrainingsLists,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true
    });

    
    if (isLoading || isLoadingEvents) return <Spinner />
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
                        title='Properes Curses'
                        variant='h2'
                    />
                    <IonRow>
                        {
                            training
                                ? (
                                    <>
                                        <IonCardHeader className='ion-text-center'>
                                            <h2 className='text-base font-semibold text-secondary text-start'>{formatDate(training.start_date.toString())}
                                            </h2>
                                            <IonRow className='w-full'>
                                                <IonButton
                                                    href={training.url}
                                                    fill='outline'
                                                    color='secondary'
                                                    expand='block'
                                                    className='w-full flex items-center'>
                                                    <span className='text-secondary me-1'>Consulta més info al Web</span>
                                                    <Info className='size-6 text-secondary' />
                                                </IonButton>
                                            </IonRow>
                                            <div className='w-full flex flex-col items-center py-1'>
                                                <div className='w-full flex justify-center items-start gap-4'>
                                                    <div className='flex items-start gap-1 py-1'>
                                                        <MapPin className='size-6 text-primary' />
                                                        <p className='text-primary'>{formatHour(training.start_date.toString()) + 'h'}</p>
                                                    </div>
                                                    <div className='flex items-start gap-1 py-1'>
                                                        <MapIcon className='size-6 text-primary' />
                                                        <IonCardSubtitle className='my-0 text-primary'>
                                                            {formatUTF(training.venue.venue)}
                                                        </IonCardSubtitle>
                                                    </div>
                                                </div>
                                                <p className='my-0 text-sm text-center text-primary'>
                                                    {formatUTF(training.title)}
                                                </p>
                                            </div>
                                        </IonCardHeader>

                                        <IonCardContent className='w-full p-0!'>
                                            {
                                                !isLoadingTrainings &&
                                                <IonRow className='w-full py-4'>
                                                    <AddToList
                                                        list={'TRAINING_LIST'}
                                                        event={training} />
                                                </IonRow>
                                            }
                                            <IonList className='w-full bg-transparent!' >
                                                {!trainingsList
                                                    ? <Spinner />
                                                    : trainingsList
                                                        .filter((user: UserList) => user.attributes.entreno_id === training.id.toString())
                                                        .map((user: UserList, id: number) => (
                                                            <IonRow key={user.id} className={`bg-gradient-to-r ${id % 2 === 0 ? 'from-secondary/50' : 'from-white'} w-full ion-align-items-center ion-justify-content-between`}>
                                                                <div className={`flex items-center gap-2 p-1`}>
                                                                    <IonLabel className='text-base text-primary w-6 font-semibold'>{id + 1}</IonLabel>
                                                                    <IonAvatar
                                                                        className='flex items-center w-8 h-8'
                                                                    >
                                                                        <IonImg src={user.attributes.avatar} />
                                                                    </IonAvatar>
                                                                    <IonText className='text-primary font-semibold text-sm'>{formatName(user.attributes.username)}</IonText>
                                                                </div>
                                                                {/* {
                                                                                            user.attributes.username === userLogged?.username
                                                                                                ? <DeleteToList id={user.id} list={'TRAINING_LIST'} />
                                                                                                : null
                                                                                        } */}
                                                            </IonRow>
                                                        ))}
                                            </IonList>
                                        </IonCardContent>

                                    </>
                                )
                                : (
                                    <>
                                        <p>No està planificat el proper entrenament</p>
                                        <IonButton color='secondary' expand='block' className='w-full' onClick={() => router.push(APP_ROUTES.PRIVATE_LISTS, 'back')}>
                                            <div className='flex items-center gap-2'>
                                                <ListStart className='size-8' color='white' />
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

export default ListsRacesPage;
