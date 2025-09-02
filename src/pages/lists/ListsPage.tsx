import { IonButton, IonCard, IonCol, IonRow, IonText, useIonRouter } from "@ionic/react";
import { eventsActions } from "../../actions/eventsActions";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { ExternalLink } from "lucide-react";
import Spinner from "../../components/ui/Spinner";
import { APP_ROUTES } from "../../constants/endpoints";
import { formatDate } from "../../helpers/formatDate";
import { formatUTF } from "../../helpers/formatUTF";
import PrivateLayout from "../PrivateLayout";
import Heading from "../../components/ui/Heading";
import { Event } from "../../interfaces/events.interface";


const EVENT_COLORS: Record<string, string> = {
  'Entrenaments': 'primary',
  'Caminades': 'medium',
  'Curses': 'danger',
  'Social': 'warning'
};

const ListsPage: React.FC = () => {
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
                                            <IonCol 
                                                key={event.id}
                                                size="12"
                                                className={`w-full shadow shadow-black rounded my-1`}
                                            
                                            >
                                                <IonCard 
                                                color={EVENT_COLORS[event.categories[0]?.name] || 'medium'} 
                                                className="w-full flex flex-col items-start">
                                                    <IonText 
                                                    color={EVENT_COLORS[event.categories[0]?.name] || 'medium'} 
                                                    className='w-full'>
                                                        <h4 className="font-semibold line-clamp-1 my-1! p-1 text-white  truncate">{formatUTF(event.title)}</h4>
                                                        <div className='flex items-center justify-between p-1'>
                                                            <p className="text-base text-white">{formatDate(event.start_date)}</p>
                                                            <span className='block text-xs font-bold bg-white p-1 rounded-2xl'>Categoria: {event.categories[0].name}</span>
                                                        </div>
                                                    </IonText>

                                                    <IonButton
                                                        onClick={() => router.push(`${APP_ROUTES.PRIVATE_LISTS}/${event.id}`, 'forward')}
                                                        color='light'
                                                        expand='full'
                                                        className='w-full flex flex-col justify-between'
                                                    >
                                                        <span className='capitalize me-2'>Llistes i Info</span>
                                                        <ExternalLink className='size-6' />
                                                    </IonButton>
                                                </IonCard>
                                            </IonCol>
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

export default ListsPage;
