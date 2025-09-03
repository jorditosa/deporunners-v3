import { useIonRouter } from '@ionic/react';
import PublicLayout from '../PublicLayout';
import { APP_ROUTES } from '../../constants/endpoints';
import { LogIn, UserPlus, KeyRound, ArrowRight } from 'lucide-react';

const PublicHome: React.FC = () => {
    const router = useIonRouter();

    const actions = [
        {
            title: 'Iniciar Sessió',
            subtitle: 'Accedeix al teu compte',
            icon: LogIn,
            route: APP_ROUTES.LOGIN,
            gradient: 'from-secondary to-primary',
            bgGradient: 'from-indigo-50 to-purple-50'
        },
        {
            title: 'Primera vegada',
            subtitle: 'Crea el teu compte nou',
            icon: UserPlus,
            route: APP_ROUTES.REGISTER,
            gradient: 'from-secondary to-primary',
            bgGradient: 'from-green-50 to-teal-50'
        },
        {
            title: 'Recuperar contrasenya',
            subtitle: 'Restableix el teu accés',
            icon: KeyRound,
            route: APP_ROUTES.FORGOT_PASSWORD,
            gradient: 'from-secondary to-primary',
            bgGradient: 'from-orange-50 to-red-50'
        }
    ];

    return (
        <PublicLayout>
            <main className='min-h-screen'>
                <div className='container mx-auto px-6 py-12'>
                    
                   
                    {/* Action Cards */}
                    <div className='max-w-4xl mx-auto space-y-6'>
                        {actions.map((action, index) => (
                            <div 
                                key={index}
                                className={`bg-gradient-to-r ${action.bgGradient} rounded-2xl p-1 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300`}
                            >
                                <div className='bg-white rounded-xl p-4 h-full'>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-4'>
                                            <div className={`bg-gradient-to-r ${action.gradient} p-4 rounded-xl shadow-lg`}>
                                                <action.icon className='h-8 w-8 text-white' />
                                            </div>
                                            
                                            <div className='space-y-1'>
                                                <h3 className='text-lg! font-bold text-gray-800 m-0!'>
                                                    {action.title}
                                                </h3>
                                                <p className='text-gray-600'>
                                                    {action.subtitle}
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => router.push(action.route, 'forward')}
                                        >
                                            <ArrowRight className='size-8 text-secondary' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div> 

                </div>
            </main>
        </PublicLayout>
    );
};

export default PublicHome;