import { IonButton, IonModal, IonHeader, IonToolbar, IonTitle, IonContent, useIonRouter } from '@ionic/react';
import { useAuth } from '../../hooks/useAuth';
import PrivateLayout from '../PrivateLayout';
import Carnet from '../../components/carnet/Carnet';
import { Trash, User, Calendar, Settings, LogOut, AlertTriangle, Shield } from 'lucide-react';
import Spinner from '../../components/ui/Spinner';
import { listsActions } from '../../actions/listsActions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ListItem } from '../../interfaces/lists.interface';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Preferences } from '@capacitor/preferences';
import { APP_ROUTES } from '../../constants/endpoints';
import { authActions } from '../../actions/authActions';
import Heading from '../../components/ui/Heading';

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
        title='Perfil'
        headerColor='secondary'
        contentColor='light'
      >
        <main className='container space-y-6'>
          
          {/* Header Section */}
          <div className='space-y-4'>
            <Heading
              title='El meu perfil'
              variant='h1'
              icon={User}
              iconSize={10}
            />
            <p className='text-gray-600 text-base'>
              Gestiona la teva informació personal i preferències
            </p>
          </div>

          {/* Carnet Section */}
          <div className='bg-white rounded-xl shadow-lg'>
            <div className='flex items-center gap-3 mb-4 px-4 pt-4'>
              <div className='bg-indigo-100 p-2 rounded-full'>
                <Shield className='h-5 w-5 text-indigo-600' />
              </div>
              <h3 className='text-lg font-semibold text-gray-800'>Carnet del club</h3>
            </div>
            <Carnet user={data} />
          </div>

          {/* Account Settings */}
          <div className='bg-white rounded-xl shadow-lg p-6'>
            <div className='flex items-center gap-3 mb-6'>
              <div className='bg-gray-100 p-2 rounded-full'>
                <Settings className='h-5 w-5 text-gray-600' />
              </div>
              <h3 className='text-lg font-semibold text-gray-800'>Configuració del compte</h3>
            </div>

            <div className='space-y-3'>
              {/* User Info Card */}
              <div className='p-4 bg-gray-50 rounded-lg'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <User className='h-5 w-5 text-indigo-600' />
                    <div>
                      <p className='font-medium text-gray-800'>Nom d'usuari</p>
                      <p className='text-sm text-gray-600'>{data.username}</p>
                    </div>
                  </div>
                  <div className='px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium'>
                    Actiu
                  </div>
                </div>
              </div>

              {/* Events Count Card */}
              <div className='p-4 bg-gray-50 rounded-lg'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <Calendar className='h-5 w-5 text-purple-600' />
                    <div>
                      <p className='font-medium text-gray-800'>Esdeveniments</p>
                      <p className='text-sm text-gray-600'>Llistes a les que estàs apuntat/da</p>
                    </div>
                  </div>
                  <span className='text-2xl font-bold text-purple-600'>{totalNumber}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className='bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='bg-red-100 p-2 rounded-full'>
                <AlertTriangle className='h-5 w-5 text-red-600' />
              </div>
              <h3 className='text-lg font-semibold text-red-700'>Zona perillosa</h3>
            </div>
            
            <div className='space-y-3'>
              <p className='text-gray-600 text-sm'>
                L'eliminació del compte és permanent i no es pot desfer. Totes les teves dades seran eliminades.
              </p>
              
              <button
                onClick={openDeleteModal}
                className='w-full flex items-center justify-center gap-3 p-3! bg-red-50 hover:bg-red-100 text-red-700 rounded-lg! font-medium transition-colors duration-300 border-2 border-red-200 hover:border-red-300'
              >
                <Trash className='size-5' />
                <span>Eliminar el meu compte</span>
              </button>
            </div>
          </div>

          {/* Enhanced Modal */}
          <IonModal isOpen={isModalOpen} onDidDismiss={closeModal}>
            <IonHeader>
              <IonToolbar color="danger">
                <IonTitle>Confirmar eliminació</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <div className="flex flex-col gap-6 h-full bg-gray-50">
                <div className="flex-1 flex flex-col justify-center items-center text-center bg-white rounded-xl p-8 mx-4 mt-4 shadow-lg">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                    <Trash className="text-red-500 h-10 w-10" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-red-600 mb-3">
                    Eliminar compte
                  </h2>
                  
                  <div className="space-y-3 mb-6">
                    <p className="text-gray-700 font-medium">
                      Estàs segur/a que vols eliminar el teu compte?
                    </p>
                    <p className="text-sm text-gray-600">
                      Aquesta acció eliminarà permanentment:
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• El teu perfil d'usuari</li>
                      <li>• Totes les inscripcions a esdeveniments ({totalNumber})</li>
                      <li>• El teu historial d'activitat</li>
                    </ul>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-4">
                      <p className="text-sm text-red-700 font-medium">
                        ⚠️ Aquesta acció no es pot desfer
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 p-4">
                  <IonButton
                    expand="block"
                    fill="outline"
                    color="medium"
                    onClick={closeModal}
                    className="flex-1"
                  >
                    <span className="flex items-center gap-2">
                      <LogOut className="h-4 w-4" />
                      Cancel·lar
                    </span>
                  </IonButton>
                  <IonButton
                    expand="block"
                    color="danger"
                    onClick={handleDeleteUser}
                    className="flex-1"
                    disabled={isPending}
                  >
                    <span className="flex items-center gap-2">
                      <Trash className="size-5" />
                      {isPending ? 'Eliminant...' : 'Eliminar compte'}
                    </span>
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