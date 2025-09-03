import { IonButton, IonCard, IonCardTitle, IonRow, useIonRouter } from "@ionic/react";
import { eventsActions } from "../../actions/eventsActions";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import Spinner from "../../components/ui/Spinner";
import { APP_ROUTES } from "../../constants/endpoints";
import { formatDate } from "../../helpers/formatDate";
import { formatUTF } from "../../helpers/formatUTF";
import PrivateLayout from "../PrivateLayout";
import Heading from "../../components/ui/Heading";
import { Event } from "../../interfaces/events.interface";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const EVENT_COLORS: Record<string, { overlay: string, text: string, badge: string }> = {
    'Entrenaments': {
        overlay: 'bg-sky-800/95',
        text: 'text-white',
        badge: 'bg-white/95 text-sky-800 backdrop-blur-sm'
    },
    'Caminades': {
        overlay: 'bg-blue-800/95',
        text: 'text-white',
        badge: 'bg-white/95 text-blue-700 backdrop-blur-sm'
    },
    'Curses': {
        overlay: 'bg-slate-800/95',
        text: 'text-white',
        badge: 'bg-white/95 text-slate-600 backdrop-blur-sm'
    },
    'Social': {
        overlay: 'bg-yellow-800/95',
        text: 'text-white',
        badge: 'bg-white/95 text-yellow-800 backdrop-blur-sm'
    }
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
                title='Llistat esdeveniments'
                contentColor='light'
            >
                <main className='container'>
                    <Heading
                        title='Llistat calendari'
                        variant='h2'
                    />
                    <IonRow>
                        {
                            events ?
                                (
                                    events
                                        .map((event: Event) => {
                                            const colorScheme = EVENT_COLORS[event.categories[0]?.name] || EVENT_COLORS['Curses'];
                                            return (
                                                <IonCard
                                                    key={event.id}
                                                    className={`w-full my-1 shadow rounded`}
                                                >
                                                    <div
                                                        className="relative overflow-hidden min-h-[70px] rounded"
                                                        style={{
                                                            backgroundImage: `url(${event.image.url})`,
                                                            backgroundSize: 'cover',
                                                            backgroundPosition: 'center',
                                                            backgroundRepeat: 'no-repeat'
                                                        }}
                                                    >
                                                        <div className={`absolute inset-0 rounded ${colorScheme.overlay}`}></div>

                                                        <IonCardTitle className={`relative z-10 ${colorScheme.text} p-2 rounded`}>
                                                            <h5 className="text-base line-clamp-1 mb-2 mt-1!">
                                                                {formatUTF(event.title)}
                                                            </h5>
                                                            <div className='flex items-center justify-between'>
                                                                <p className="text-base font-medium">
                                                                    {formatDate(event.start_date)}
                                                                </p>
                                                                <span className={`text-xs px-1 py-0.5 font-bold rounded ${colorScheme.badge}`}>
                                                                    {event.categories[0].name}
                                                                </span>
                                                            </div>
                                                        </IonCardTitle>
                                                    </div>
                                                    <IonButton
                                                        onClick={() => router.push(`${APP_ROUTES.PRIVATE_LISTS}/${event.id}`, 'forward')}
                                                        color='secondary'
                                                        expand='full'
                                                        size="small"
                                                        className='w-full m-0 rounded-b' 
                                                    >
                                                        <div className='flex items-center justify-center gap-2 py-1 text-secondary'>
                                                            <span className='font-semibold text-white'>veure Llista i Info</span>
                                                            <ArrowRight className='size-5 text-white' />
                                                        </div>
                                                    </IonButton>
                                                </IonCard>
                                            )
                                        }))
                                : (
                                    <Spinner />
                                )
                        }
                    </IonRow>
                </main>
            </PrivateLayout>
        );
    };
};

export default ListsPage;