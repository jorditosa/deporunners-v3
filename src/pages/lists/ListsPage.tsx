import { eventsActions } from "../../actions/eventsActions";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";
import EventCard from "../../components/events/EventCard";
import { groupEventsByDate } from "../../helpers/groupEventsByDate";
import PrivateLayout from "../PrivateLayout";
import Heading from "../../components/ui/Heading";
import Icon from "../../components/ui/Icon";
import { Event } from "../../interfaces/events.interface";
import { useState } from "react";
import { Calendar, Filter, CalendarX, Search } from 'reicon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

const ListsPage: React.FC = () => {
    const queryClient = useQueryClient();
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const cachedEvents = queryClient.getQueryData<Event[]>(['events']);
    const { data: events, isLoading: isLoadingEvents, isError: isEventsError, refetch: refetchEvents } = useQuery<Event[]>({
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

    const eventGroups = groupEventsByDate(filteredEvents);

    const renderListView = () => (
        <div className="space-y-6">
            {eventGroups.map(group => (
                <div key={group.label} className="space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-wide text-gray-500 px-1">
                        {group.label}
                    </h4>
                    {group.events.map((event: Event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            ))}
        </div>
    );

    if (isLoadingEvents) return <Spinner />
    if (isEventsError) return (
        <PrivateLayout contentColor='light'>
            <main className='container'>
                <EmptyState
                    icon={CalendarX}
                    title="No s'han pogut carregar els esdeveniments"
                    description="Comprova la connexió i torna-ho a provar."
                    actionLabel="Reintentar"
                    onAction={() => refetchEvents()}
                />
            </main>
        </PrivateLayout>
    )
    if (events) {
        return (
            <PrivateLayout
                contentColor='light'
            >
                <main className='container space-y-6'>
                    
                    {/* Header Section */}
                    <div className='space-y-4'>
                        <Heading
                            title='Llistat Calendari'
                            variant='h1'
                            icon={Calendar}
                            iconSize={10}
                        />
                    </div>

                    {/* Search Bar */}
                    <div className='bg-white rounded-xl shadow-lg p-2'>
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <Icon icon={Search} className='h-5 w-5 text-gray-400' />
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
                            <Icon icon={Filter} className='size-6 text-secondary' />
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
                                <Icon icon={Calendar} className='h-8 w-8 text-white' />
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className='bg-gray-50 rounded-xl'>
                        {filteredEvents.length > 0 ? (
                            renderListView()
                        ) : (
                            <EmptyState
                                icon={CalendarX}
                                title="No s'han trobat esdeveniments"
                                description="Prova a seleccionar una altra categoria o modifica la cerca"
                                actionLabel="Netejar filtres"
                                onAction={() => {
                                    setSelectedCategory('all');
                                    setSearchText('');
                                }}
                            />
                        )}
                    </div>

                </main>
            </PrivateLayout>
        );
    }
};

export default ListsPage;