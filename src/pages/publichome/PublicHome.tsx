import { IonButton, useIonRouter } from '@ionic/react';
import PublicLayout from '../PublicLayout';
import { APP_ROUTES } from '../../constants/endpoints';
import { LogIn, UserPlus, KeyRound, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';

const PublicHome: React.FC = () => {
    const router = useIonRouter();

    const actions = [
        {
            title: 'Iniciar Sessió',
            subtitle: 'Accedeix al teu compte',
            icon: LogIn,
            route: APP_ROUTES.LOGIN,
            gradient: 'from-secondary to-secondary/60',
        },
        {
            title: 'Primera vegada',
            subtitle: 'Crea el teu compte nou',
            icon: UserPlus,
            route: APP_ROUTES.REGISTER,
            gradient: 'from-secondary to-secondary/60',
        },
        {
            title: 'Recuperar contrasenya',
            subtitle: 'Restableix el teu accés',
            icon: KeyRound,
            route: APP_ROUTES.FORGOT_PASSWORD,
            gradient: 'from-secondary to-secondary/60',
        }
    ];

    useEffect(() => {
        const checkOnBoardingDone = async () => {
            try {
                const onBoardingDone = await Preferences.get({
                    key: 'deporunner-onboarding-done',
                })

                if (!onBoardingDone.value || onBoardingDone.value !== 'true') {
                    router.push(APP_ROUTES.ONBOARDING, 'forward')
                }
            } catch (error) {
                console.error('Error checking onboarding status:', error)
                router.push(APP_ROUTES.ONBOARDING, 'forward')
            }
        }
        checkOnBoardingDone()
    }, [router])

    return (
        <PublicLayout>
            <main className='min-h-full'>
                <div className='container mx-auto px-6 py-12'>


                    {/* Action Cards */}
                    <div className='w-full mx-auto space-y-6'>
                        {actions.map((action, index) => (
                            <div
                                key={index}
                                className='bg-white rounded-xl! shadow! shadow-primary'
                            >
                                <IonButton
                                    fill='clear'
                                    expand='full'
                                    onClick={() => router.push(action.route, 'forward')}
                                    className='w-full flex items-start justify-between gap-4'>
                                    <div className='w-full flex items-center justify-start text-start gap-4'>
                                        <div className={`bg-gradient-to-r ${action.gradient} p-4 rounded-xl shadow-lg`}>
                                            <action.icon className='size-8 text-white' />
                                        </div>

                                        <div className='space-y-1'>
                                            <h3 className='text-lg! capitalize font-bold text-gray-800 m-0!'>
                                                {action.title}
                                            </h3>
                                            <p className='text-gray-600 capitalize'>
                                                {action.subtitle}
                                            </p>
                                        </div>
                                    </div>

                                    <ArrowRight className='size-8 text-secondary' />
                                </IonButton>
                            </div>
                        ))}
                    </div>

                </div>
            </main>
        </PublicLayout>
    );
};

export default PublicHome;