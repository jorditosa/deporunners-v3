import { IonCard, IonRow, IonButton, IonModal, IonHeader, IonToolbar, IonTitle, IonContent, useIonRouter } from '@ionic/react';
import { useAuth } from '../../hooks/useAuth';
import PrivateLayout from '../PrivateLayout';
import Carnet from '../../components/carnet/Carnet';
import { Trash } from 'lucide-react';
import Spinner from '../../components/ui/Spinner';
import { listsActions } from '../../actions/listsActions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ListItem } from '../../interfaces/lists.interface';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Preferences } from '@capacitor/preferences';
import { APP_ROUTES } from '../../constants/endpoints';
import { authActions } from '../../actions/authActions';

const ProfilePage: React.FC = () => {
  const { data, isLoading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useIonRouter();
  const queryClient = useQueryClient();

  const { data: list, isLoading: isLoadingList } = useQuery({
    queryKey: ['list'],
    queryFn: listsActions.getAllList
  });

  const { mutate: deleteUserFn, isPending } = useMutation({
    mutationFn: () => authActions.deleteUser(data.id),
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success("Esborrat/da 🐔!")
      Preferences.remove({ key: 'depotoken' })
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.clear();
      router.push(APP_ROUTES.PUBLIC_HOME)
    }
  })

  const handleDeleteUser = () => {
    deleteUserFn()
    setIsModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading || isLoadingList) return <Spinner />
  if (data && list) {
    const totalNumber = list.filter((item: ListItem) => {
      return item.attributes.name === data.username
    }).length

    return (
      <PrivateLayout
        title='Dashboard'
        headerColor='secondary'
        contentColor='light'
      >
        <main className='container flex flex-col gap-4'>
          <Carnet
            user={data}
          />
          {/* <IonCard color='light' className='ion-padding'>
          <IonRow className='flex items-center justify-between gap-2'>
            <p>Nom:  <span className='font-bold text-primary text-base'>{data.username}</span></p>
            <FilePenLine className='text-primary size-6' />
          </IonRow>
        </IonCard> */}
          <IonCard color='light' className='ion-padding'>
            <IonRow className='flex items-center justify-between gap-2 text-secondary font-semibold'>
              <p>Llistes a les que estàs apuntat/da</p>
              <span className='text-xl font-bold'>{totalNumber}</span>
            </IonRow>
          </IonCard>

          <IonCard color='light' className='ion-padding' onClick={openDeleteModal} style={{ cursor: 'pointer' }}>
            <IonRow className='flex items-center justify-between gap-2'>
              <p className='text-red-500 font-semibold'>Vols eliminar el teu usuari?</p>
              <Trash className='text-red-500 size-6' />
            </IonRow>
          </IonCard>

          {/* Modal de confirmación */}
          <IonModal isOpen={isModalOpen} onDidDismiss={closeModal}>
            <IonHeader>
              <IonToolbar color="danger">
                <IonTitle>Confirmar eliminació</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <div className="flex flex-col gap-4 h-full">
                <div className="flex-1 flex flex-col justify-center items-center text-center">
                  <Trash className="text-red-500 size-16 mb-4" />
                  <h2 className="text-xl font-bold text-red-500 mb-2">
                    Eliminar usuari
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Estàs segur/a que vols eliminar el teu usuari?
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    Aquesta acció no es pot desfer i perdràs totes les teves dades.
                  </p>
                </div>

                <div className="flex gap-3">
                  <IonButton
                    expand="block"
                    fill="outline"
                    color="medium"
                    onClick={closeModal}
                    className="flex-1"
                  >
                    Cancel·lar
                  </IonButton>
                  <IonButton
                    expand="block"
                    color="danger"
                    onClick={handleDeleteUser}
                    className="flex-1"
                  >
                    {isPending ? 'Eliminant...' : 'Eliminar'}
                  </IonButton>
                </div>
              </div>
            </IonContent>
          </IonModal>
        </main>
      </PrivateLayout>

    );
  }
};

export default ProfilePage;