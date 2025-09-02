import './privatehome.css';
import { useQuery } from '@tanstack/react-query';
import { eventsActions } from '../../actions/eventsActions';
import Calendar from '../../components/events/calendar/CalendarSwiper';
import { Calendar1, Handshake, Newspaper } from 'lucide-react';
import { postsActions } from '../../actions/postsActions';
import Posts from '../../components/posts/Posts';
import Spinner from '../../components/ui/Spinner';
import PrivateLayout from '../PrivateLayout';
import Heading from '../../components/ui/Heading';
import { IonButton } from '@ionic/react';

const PrivateHome: React.FC = () => {
  const { data: events, isLoading: isLoadingEvents } = useQuery({
    queryKey: ['events'],
    queryFn: eventsActions.getAllEvents
  });

  const { data: posts, isLoading: isLoadingPosts } = useQuery({
    queryKey: ['posts'],
    queryFn: postsActions.getAllPosts
  });

  if (isLoadingEvents || isLoadingPosts) return <Spinner />
  if (events) return (
    <PrivateLayout
      title='Dashboard'
      headerColor='secondary'
      contentColor='light'
    >
      <main className='container'>

        <Heading
          title="el Calendari"
          variant="h1"
          icon={Calendar1}
          iconSize={12}
        />

        <Calendar
          events={events}
        />

        <Heading
          title="notícies"
          variant="h1"
          icon={Newspaper}
          iconSize={12}
        />

        <Posts posts={posts} />

        <Heading
          title="patrocinadors"
          variant="h1"
          icon={Handshake}
          iconSize={12}
        />

        <IonButton
        color='secondary'
        expand='block'
        size='large'
        onClick={() => window.open('https://deporunners.cat/patrocinadors/', '_blank')}
        >
          <span className='text-white capitalize text-base'>Veure beneficis del Club</span>
        </IonButton>

      </main>
    </PrivateLayout>
  );
};

export default PrivateHome;
