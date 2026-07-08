import { useIonRouter } from '@ionic/react'
import { Calendar, Clock, Pin, ArrowRight } from 'reicon'
import { Event } from '../../interfaces/events.interface'
import { formatDate } from '../../helpers/formatDate'
import { formatHour } from '../../helpers/formatHour'
import { formatUTF } from '../../helpers/formatUTF'
import { APP_ROUTES } from '../../constants/endpoints'
import Card from '../ui/Card'
import Icon from '../ui/Icon'

interface Props {
  event: Event;
}

export default function EventCard({ event }: Props) {
  const router = useIonRouter()

  return (
    <Card
      onClick={() => router.push(`${APP_ROUTES.PRIVATE_LISTS}/${event.id}`, 'forward')}
      className='cursor-pointer transform hover:scale-[1.02] hover:shadow-xl transition-all duration-300 group'
    >
      <div className='flex items-center p-2'>
        <div className='relative overflow-hidden rounded-lg'>
          <img
            src={event.image.url}
            alt={event.title}
            className='w-16 h-24 object-cover transform group-hover:scale-110 transition-transform duration-300'
          />
        </div>

        <div className='flex-1 ps-4 pe-2 space-y-1'>
          <h3 className='text-base! font-bold line-clamp-2 group-hover:text-secondary transition-colors duration-300 mt-0!'>
            {formatUTF(event.title)}
          </h3>

          <div className='flex items-center gap-2 text-sm text-gray-600'>
            <Icon icon={Calendar} className='h-4 w-4 text-secondary' />
            <span>{formatDate(event.start_date)}</span>
            <Icon icon={Clock} className='h-4 w-4 text-secondary ms-2' />
            <span>{formatHour(event.start_date)}</span>
          </div>

          <div className='flex items-center gap-2 text-sm text-gray-500'>
            <Icon icon={Pin} className='h-4 w-4 text-secondary' />
            <span className='truncate'>{formatUTF(event.venue.venue)}</span>
          </div>
        </div>

        <div className='flex items-center'>
          <Icon icon={ArrowRight} className='size-8 text-secondary' />
        </div>
      </div>
    </Card>
  )
}
