import { useQuery } from '@tanstack/react-query';
import PrivateLayout from '../PrivateLayout';
import { eventsActions } from '../../actions/eventsActions';
import { useParams } from 'react-router';
import Spinner from '../../components/ui/Spinner';
import Heading from '../../components/ui/Heading';
import { IonCol, IonRow } from '@ionic/react';
import AddToList from '../../components/lists/AddToList';
import { listsActions } from '../../actions/listsActions';
import { ListItem } from '../../interfaces/lists.interface';
import { formatDate } from '../../helpers/formatDate';
import { ExternalLink, MapPin } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import DeleteToList from '../../components/lists/DeleteToList';
import BackBtn from '../../components/ui/BackBtn';

export default function ListsPageEvent() {
  const { id } = useParams<{ id: string }>();
  const { data: user } = useAuth();

  const { data: event, isLoading } = useQuery({
    queryKey: ['events', id],
    queryFn: () => eventsActions.geteventById(id)
  });
  const { data: list, isLoading: isLoadingList } = useQuery({
    queryKey: ['list'],
    queryFn: listsActions.getAllList
  });

  if (isLoading || isLoadingList) return <Spinner />
  if (event && list) return (
    <PrivateLayout
      contentColor='light'
    >
      <main className='container'>
        <BackBtn />

        <IonRow className='bg-white rounded-t mb-4'>
          <div className='p-2'>
            <Heading
              title={event.title}
              variant='h3'
            />
            <p className='text-secondary font-bold flex items-center gap-1'>
              <MapPin className='size-6 text-primary' />
              <span>{formatDate(event.date)}</span>
            </p>
            <a href={event.url} target="_blank" rel="noopener noreferrer" className='flex items-center gap-1'>
              <ExternalLink className='size-6 text-primary' />
              <span className='font-bold text-secondary'>Consulta més info</span>
            </a>
          </div>
          <AddToList
            event={event}
          />
        </IonRow>

        <IonRow>
          {
            list.filter((item: ListItem) => +item.attributes.cursa_id === +event.id)
              .map((item: ListItem, i: number) => (
                <IonCol key={item.id} size='12'>
                  <div className={`bg-gradient-to-r ${i % 2 !== 0 ? 'from-secondary/25' : ''} p-1 flex items-center justify-between gap-1`}>
                    <div className='flex items-center'>
                      <span className='block w-6 text-primary font-semibold'>{i + 1}</span>
                      <p className='text-primary text-sm font-semibold'>{item.attributes.name}</p>
                    </div>
                    {
                      user.username === item.attributes.name && <DeleteToList id={item.id} />
                    }
                  </div>
                </IonCol>
              ))
          }
        </IonRow>
      </main>

    </PrivateLayout>
  )
}
