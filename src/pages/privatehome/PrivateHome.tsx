import { IonContent, IonPage } from '@ionic/react';
import './privatehome.css';
import HeaderHome from '../../components/Header/HeaderHome';
import { useQuery } from '@tanstack/react-query';
import { eventsActions } from '../../actions/eventsActions';
import Calendar from '../../components/events/calendar/CalendarSwiper';
import { Calendar1, Newspaper } from 'lucide-react';
import { postsActions } from '../../actions/postsActions';
import Posts from '../../components/posts/Posts';
import Spinner from '../../components/ui/Spinner';

const PrivateHome: React.FC = () => {
  const { data: events, isLoading: isLoadingEvents } = useQuery({
    queryKey: ['events'],
    queryFn: eventsActions.getAllEvents
  });

  const { data: posts, isLoading: isLoadingPosts } = useQuery({
    queryKey: ['posts'],
    queryFn: postsActions.getAllPosts
  });

  if (isLoadingEvents || isLoadingPosts ) return <Spinner />
  if (events ) return (
    <IonPage>
      <HeaderHome />
      <IonContent fullscreen color="light">

        <main className='container'>
          <div className='flex items-center gap-4'>
            <Calendar1 className=" size-10 text-secondary" />
            <h2 className='text-2xl text-secondary'>el Calendari</h2>
          </div>

          <Calendar
            events={events}
          />

          <div className='flex items-center gap-4'>
            <Newspaper className=" size-10 text-secondary" />
            <h2 className='text-2xl text-secondary'>notícies</h2>
          </div>

          <Posts posts={posts} />

        </main>
      </IonContent>
    </IonPage>
  );
};

export default PrivateHome;
