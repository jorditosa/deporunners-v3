import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { formatDate } from '../../../helpers/formatDate';
import { formatHour } from '../../../helpers/formatHour';
import { formatUTF } from '../../../helpers/formatUTF';
import { Event } from '../../../interfaces/events.interface';
import { Calendar1, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useIonRouter } from '@ionic/react';
import { APP_ROUTES } from '../../../constants/endpoints';

interface Props {
  events: Event[];
}

const Calendar = ({ events }: Props) => {
  const router = useIonRouter();
  
  return (
    <Swiper
      slidesPerView={1}
      className="mySwiper"
      pagination={true}
      modules={[Pagination]}
      spaceBetween={16}
    >
      {events.map((event: Event) => (
        <SwiperSlide key={event.id} >
          <div 
          className="h-full bg-white rounded shadow-lg overflow-hidden cursor-pointer transform hover:scale-[1.01] hover:shadow-xl transition-all duration-300 group mx-1 mb-10"
          onClick={() => router.push(`${APP_ROUTES.PRIVATE_LISTS}/${event.id}`, 'forward')}
          >
            {/* Header with gradient background */}
            <div className="h-[160px] bg-gradient-to-br from-secondary to-primary p-4 text-white relative overflow-hidden">
              <div className="relative z-10 space-y-2">
                {/* Event title */}
                <h3 className="text-base! mt-0! font-bold line-clamp-2 group-hover:text-blue-100 transition-colors duration-300">
                  {formatUTF(event.title)}
                </h3>
                {/* Date and time */}
                <div className="flex items-center gap-2 text-sm">
                  <Calendar1 className="size-4 text-white" />
                  <span className="font-medium">{formatDate(event.start_date)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="size-4 text-white" />
                  <span className="font-medium">{formatHour(event.start_date)} h</span>
                </div>

                {/* Venue */}
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="size-4 text-white" />
                  <span className="capitalize truncate">
                    {formatUTF(event.venue.venue)}
                  </span>
                </div>
              </div>

              {/* Background pattern */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Image section - Flexible height */}
            <div className="relative overflow-hidden flex-1">
              <img
                src={event.image.url}
                alt={event.title}
                className="w-full h-[280px] object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Action button overlay */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                <div className="bg-secondary p-3 rounded-full shadow-xl border border-white/20">
                  <ArrowRight className="size-5 text-white" />
                </div>
              </div>
            </div>

           
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Calendar;