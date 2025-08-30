import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonImg, IonLabel, IonRow } from '@ionic/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { formatDate } from '../../../helpers/formatDate';
import { formatHour } from '../../../helpers/formatHour';
import { formatUTF } from '../../../helpers/formatUTF';
import './calendar.module.css';
import { locationOutline } from 'ionicons/icons';
import { Event } from '../../../interfaces/events.interface';
import { MapPinIcon } from 'lucide-react';

interface Props {
  calendar: Event[],
  isLoading: boolean
}

const Calendar = ({ calendar, isLoading }: Props) => {
  return (
    <Swiper
      slidesPerView={1}
      className="mySwiper pb-5"
      pagination={true}
      modules={[Pagination]}
    >
      {
        isLoading
          ? <IonRow className="flex justify-center py-2">
            <span>Carregant....</span>
          </IonRow>
          : (
            calendar.map((date: Event) => (
              <SwiperSlide key={date.id}
              >
                <IonCard className="card-modern shadow-md shadow-primary text-light mb-12 rounded-2xl h-[360px]">
                  <IonImg src={date.image.url} alt="event picture" className="w-full h-[260px] object-cover object-center" />
                  <IonCardHeader className="h-[100px] p-4 bg-primary">
                    <IonCardTitle className="flex justify-between items-center font-semibold text-sm text-white">{formatDate(date.start_date)}

                      <IonLabel className="font-semibold">
                        {formatHour(date.start_date) + ' h'}
                      </IonLabel>

                    </IonCardTitle>
                    <div className="card-content">
                      <IonCardSubtitle className="card-subtitle text-sm text-white line-clamp-1 pt-1">
                        {formatUTF(date.title)}
                      </IonCardSubtitle>
                      <div className="flex items-center gap-2 py-1">
                        <IonCardSubtitle className='text-white text-base'>
                          {formatUTF(date.venue.venue)}
                        </IonCardSubtitle>
                        <MapPinIcon className='size-6 text-secondary' />
                      </div>
                    </div>
                  </IonCardHeader>
                </IonCard>
              </SwiperSlide>
            ))
          )
      }
    </Swiper>
  );
}

export default Calendar;
