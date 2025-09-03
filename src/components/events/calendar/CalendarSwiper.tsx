import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonImg, IonLabel } from '@ionic/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { formatDate } from '../../../helpers/formatDate';
import { formatHour } from '../../../helpers/formatHour';
import { formatUTF } from '../../../helpers/formatUTF';
import './calendar.module.css';
import { Event } from '../../../interfaces/events.interface';
import { Calendar1, MapPinIcon } from 'lucide-react';

interface Props {
  events: Event[],
}

const Calendar = ({ events }: Props) => {
  return (
    <Swiper
      slidesPerView={1}
      className="mySwiper"
      pagination={true}
      modules={[Pagination]}
    >
      {
        events.map((event: Event) => (
          <SwiperSlide key={event.id}>
            <IonCard className="card-modern text-light mb-10 h-[400px] mx-1">
              <IonCardHeader className="h-[100px] p-4 bg-secondary">
                <IonCardTitle className="flex items-center gap-4 font-semibold text-sm text-white">
                  <div className='flex items-center gap-2'>
                    <Calendar1 className='size-5 text-white' />
                    {formatDate(event.start_date)}
                  </div>
                  -
                  <IonLabel className="font-semibold">
                    {formatHour(event.start_date) + ' h'}
                  </IonLabel>
                </IonCardTitle>
                <div className="card-content">
                  <IonCardSubtitle className="card-subtitle text-sm text-white line-clamp-1 pt-1">
                    {formatUTF(event.title)}
                  </IonCardSubtitle>
                  <div className="flex items-center gap-2 py-1">
                    <MapPinIcon className='size-5 text-white' />
                    <IonCardSubtitle className='text-white text-base'>
                      {formatUTF(event.venue.venue)}
                    </IonCardSubtitle>
                  </div>
                </div>
              </IonCardHeader>
              <IonImg src={event.image.url} alt="event picture" className="w-full h-[310px] object-cover object-top" />
            </IonCard>
          </SwiperSlide>
        )
        )}
    </Swiper>
  );
}

export default Calendar;
