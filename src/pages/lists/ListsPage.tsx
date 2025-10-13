import {
    IonIcon, useIonRouter
} from "@ionic/react";
import {
    calendar, search
} from 'ionicons/icons';
import { eventsActions } from "../../actions/eventsActions";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import Spinner from "../../components/ui/Spinner";
import { APP_ROUTES } from "../../constants/endpoints";
import { formatDate } from "../../helpers/formatDate";
import { formatUTF } from "../../helpers/formatUTF";
import PrivateLayout from "../PrivateLayout";
import Heading from "../../components/ui/Heading";
import { Event } from "../../interfaces/events.interface";
import { useState } from "react";
import { Calendar1, Filter, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

const ListsPage: React.FC = () => {
    const router = useIonRouter();
    const queryClient = useQueryClient();
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const cachedEvents = queryClient.getQueryData<Event[]>(['events']);
    const { data: events, isLoading: isLoadingEvents } = useQuery<Event[]>({
        queryKey: ['events'],
        queryFn: eventsActions.getAllEvents,
        enabled: !cachedEvents,
        initialData: cachedEvents
    });

    // Filtrar eventos
    const filteredEvents = events?.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchText.toLowerCase());
        const matchesCategory = selectedCategory === 'all' ||
            event.categories.some(cat => cat.name === selectedCategory);
        return matchesSearch && matchesCategory;
    }) || [];

    const categories = ['all', ...new Set(events?.flatMap(event =>
        event.categories.map(cat => cat.name)
    ) || [])];

    const renderListView = () => (
        <div className="space-y-3">
            {filteredEvents.map((event: Event) => {
                return (
                    <div
                        key={event.id}
                        onClick={() => router.push(`${APP_ROUTES.PRIVATE_LISTS}/${event.id}`, 'forward')}
                        className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-[1.02] hover:shadow-xl transition-all duration-300 group"
                    >
                        <div className="flex items-center p-2">
                            <div className="relative overflow-hidden rounded-lg">
                                <img
                                    src={event.image.url}
                                    alt={event.title}
                                    className="w-16 h-24 object-cover transform group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            <div className="flex-1 ps-4 pe-2 space-y-1">
                                <h3 className="text-base! font-bold line-clamp-2 group-hover:text-secondary transition-colors duration-300 mt-0!">
                                    {formatUTF(event.title)}
                                </h3>
                                
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar1 className="h-4 w-4 text-secondary" />
                                    <span>{formatDate(event.start_date)}</span>
                                </div>

                                {/* Categories badges */}
                                <div className="flex flex-wrap gap-1">
                                    {event.categories.slice(0, 2).map((category, idx) => (
                                        <span key={idx} className="py-1 bg-white text-secondary text-sm font-medium">
                                            {category.name}
                                        </span>
                                    ))}
                                    {event.categories.length > 2 && (
                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                            +{event.categories.length - 2}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="rounded-full group-hover:bg-indigo-200 transition-colors duration-300">
                                    <ArrowRight className="size-8 text-secondary" />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );

    if (isLoadingEvents) return <Spinner />
    if (events) {
        return (
            <PrivateLayout
                title='Llistat Calendari'
                contentColor='light'
            >
                <main className='container space-y-6'>
                    
                    {/* Header Section */}
                    <div className='space-y-4'>
                        <Heading
                            title={`Llistat Calendari (${filteredEvents.length})`}
                            variant='h1'
                            icon={Calendar1}
                            iconSize={10}
                        />
                    </div>

                    {/* Search Bar */}
                    <div className='bg-white rounded-xl shadow-lg p-2'>
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <IonIcon icon={search} className='h-5 w-5 text-gray-400' />
                            </div>
                            <input
                                type="text"
                                placeholder="Buscar esdeveniments..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className='block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300'
                            />
                        </div>
                    </div>

                    {/* Filters Section */}
                    <div className='bg-white rounded-xl shadow-lg p-2'>
                        <div className='flex items-center gap-2 mb-3'>
                            <Filter className='size-6 text-secondary' />
                            <span className='font-semibold text-gray-800'>Filtrar per categoria</span>
                        </div>

                        {/* Categories Swiper for mobile */}
                        <div className='md:hidden'>
                            <Swiper
                                modules={[FreeMode, Mousewheel]}
                                spaceBetween={8}
                                slidesPerView="auto"
                                freeMode={true}
                                mousewheel={true}
                                className="pb-2"
                            >
                                {categories.map(category => (
                                    <SwiperSlide key={category} className="!w-auto">
                                        <button
                                            onClick={() => setSelectedCategory(category)}
                                            className={`text-xs font-medium transition-all duration-300 whitespace-nowrap p-1! rounded! ${
                                                selectedCategory === category
                                                    ? 'bg-secondary text-white'
                                                    : 'bg-white text-gray-700'
                                            }`}
                                        >
                                            {category === 'all' ? 'Tots' : category}
                                        </button>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>

                    {/* Stats Card */}
                    <div className='bg-gradient-to-br from-secondary to-primary rounded-xl shadow-lg p-2 text-white'>
                        <div className='flex items-center justify-between'>
                            <div className='space-y-1'>
                                <p className='text-white text-sm'>Esdeveniments trobats</p>
                                <p className='text-3xl font-bold'>{filteredEvents.length}</p>
                            </div>
                            <div className='bg-white/20 p-3 rounded-full'>
                                <Calendar1 className='h-8 w-8 text-white' />
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className='bg-gray-50 rounded-xl'>
                        {filteredEvents.length > 0 ? (
                            renderListView()
                        ) : (
                            <div className='text-center py-12 space-y-4'>
                                <div className='mx-auto w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center'>
                                    <IonIcon
                                        icon={calendar}
                                        className='text-gray-400 text-4xl'
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <h3 className='text-lg font-semibold text-gray-700'>
                                        No s'han trobat esdeveniments
                                    </h3>
                                    <p className='text-gray-500'>
                                        Prova a seleccionar una altra categoria o modifica la cerca
                                    </p>
                                </div>
                                <button
                                    onClick={() => {
                                        setSelectedCategory('all');
                                        setSearchText('');
                                    }}
                                    className='px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300'
                                >
                                    Netejar filtres
                                </button>
                            </div>
                        )}
                    </div>

                </main>
            </PrivateLayout>
        );
    }
};

export default ListsPage;