import { IonButton, IonCard, IonRow, useIonRouter } from "@ionic/react";
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
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const EVENT_COLORS: Record<string, { overlay: string, text: string, badge: string }> = {
    'Entrenaments': {
        overlay: 'bg-sky-800/90',
        text: 'text-white',
        badge: 'bg-white/90 text-sky-800 backdrop-blur-sm'
    },
    'Caminades': {
        overlay: 'bg-blue-800/90',
        text: 'text-white',
        badge: 'bg-white/90 text-blue-700 backdrop-blur-sm'
    },
    'Curses': {
        overlay: 'bg-slate-800/90',
        text: 'text-white',
        badge: 'bg-white/90 text-slate-600 backdrop-blur-sm'
    },
    'Social': {
        overlay: 'bg-yellow-800/90',
        text: 'text-white',
        badge: 'bg-white/90 text-yellow-800 backdrop-blur-sm'
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
                headerColor='secondary'
                contentColor='light'
            >
                <main className='container'>
                    <Heading
                        title='Llistat esdeveniments'
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
                                                    className={`w-full my-1 shadow-xl rounded`}
                                                >
                                                    <div
                                                        className="relative overflow-hidden min-h-[110px] rounded"
                                                        style={{
                                                            backgroundImage: `url(${event.image.url})`,
                                                            backgroundSize: 'cover',
                                                            backgroundPosition: 'center',
                                                            backgroundRepeat: 'no-repeat'
                                                        }}
                                                    >
                                                        <div className={`absolute inset-0 rounded ${colorScheme.overlay}`}></div>

                                                        <div className={`relative z-10 ${colorScheme.text} p-2 rounded`}>
                                                            <h4 className="font-semibold text-base line-clamp-1 truncate mb-2 mt-1!">
                                                                {formatUTF(event.title)}
                                                            </h4>
                                                            <div className='flex items-center justify-between'>
                                                                <span className={`text-xs px-1 py-0.5 font-semibold rounded ${colorScheme.badge}`}>
                                                                    {event.categories[0].name}
                                                                </span>
                                                                <p className="text-base font-medium">
                                                                    {formatDate(event.start_date)}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="relative z-10 rounded">
                                                            <IonButton
                                                                onClick={() => router.push(`${APP_ROUTES.PRIVATE_LISTS}/${event.id}`, 'forward')}
                                                                color='light'
                                                                expand='full'
                                                                className='w-full m-0 rounded-b'
                                                            >
                                                                <div className='flex items-center justify-center gap-2 text-secondary'>
                                                                    <span className='font-semibold'>Llista i Info</span>
                                                                    <ExternalLink className='size-5' />
                                                                </div>
                                                            </IonButton>
                                                        </div>
                                                    </div>
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