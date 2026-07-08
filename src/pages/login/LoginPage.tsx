import { useForm } from 'react-hook-form'
import PublicLayout from '../PublicLayout'
import { IonInput, IonInputPasswordToggle, IonSpinner, useIonRouter } from '@ionic/react'
import { Link } from 'react-router-dom'
import { LoginFormData } from '../../interfaces/auth.interface'
import { Login, Envelope, Lock, AlertCircle } from 'reicon'
import Icon from '../../components/ui/Icon'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authActions } from '../../actions/authActions'
import { toast } from 'react-toastify'
import { APP_ROUTES } from '../../constants/endpoints'

export default function LoginPage() {
    const router = useIonRouter();
    const queryClient = useQueryClient();
    const { handleSubmit, register, formState: { errors }, reset } = useForm<LoginFormData>({
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const { mutate, isPending } = useMutation({
        mutationFn: authActions.login,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: async () => {
            toast.success("Login correcte")
            reset()
            await queryClient.invalidateQueries({ queryKey: ['user'] });
            router.push(APP_ROUTES.PRIVATE_HOME, 'forward')
        }
    })

    const submitForm = (formData: LoginFormData) => {
        mutate(formData)
    }

    return (
        <PublicLayout>
            <main className='min-h-full'>
                <div className='container mx-auto px-4 py-8'>

                    <div className='max-w-md mx-auto'>
                        {/* Login Form Card */}
                        <div className='bg-white rounded-2xl shadow-xl p-6 mb-6'>
                            {/* Header Section */}
                            <div className='mb-8 space-y-4'>
                                <div className='space-y-2'>
                                    <h1 className='text-3xl font-bold text-secondary'>
                                        Iniciar Sessió
                                    </h1>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit(submitForm)} noValidate className='space-y-6'>

                                {/* Email Field */}
                                <div className='space-y-2'>
                                    <label htmlFor="email" className='flex items-center gap-2 text-sm font-semibold text-gray-700'>
                                        <Icon icon={Envelope} className='h-4 w-4 text-secondary' />
                                        Correu electrònic
                                    </label>
                                    <div className='relative'>
                                        <IonInput
                                            color={"secondary"}
                                            type="email"
                                            fill='outline'
                                            placeholder='nom@exemple.com'
                                            className={`transition-all duration-300 ${errors.email ? 'border-red-300' : 'border-gray-200 focus:border-indigo-500'
                                                }`}
                                            {...register("email", {
                                                required: "L'email és obligatori",
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Format d'email no vàlid"
                                                }
                                            })}
                                            required
                                        />
                                    </div>
                                    {errors.email && (
                                        <div className="flex items-center gap-2 text-red-500 text-sm">
                                            <Icon icon={AlertCircle} className='h-4 w-4' />
                                            <span>{errors.email.message}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div className='space-y-2'>
                                    <label htmlFor="password" className='flex items-center gap-2 text-sm font-semibold text-gray-700'>
                                        <Icon icon={Lock} className='h-4 w-4 text-secondary' />
                                        Contrasenya
                                    </label>
                                    <div className='relative'>
                                        <IonInput
                                            color={"secondary"}
                                            type="password"
                                            fill='outline'
                                            placeholder='Introdueix la teva contrasenya'
                                            className={`transition-all duration-300 ${errors.password ? 'border-red-300' : 'border-gray-200 focus:border-indigo-500'
                                                }`}
                                            {...register("password", {
                                                required: "La contrasenya és obligatòria",
                                                minLength: {
                                                    value: 6,
                                                    message: "La contrasenya ha de tenir almenys 6 caràcters"
                                                }
                                            })}
                                            required
                                        >
                                            <IonInputPasswordToggle color={"secondary"} slot="end"></IonInputPasswordToggle>
                                        </IonInput>
                                    </div>
                                    {errors.password && (
                                        <div className="flex items-center gap-2 text-red-500 text-sm">
                                            <Icon icon={AlertCircle} className='h-4 w-4' />
                                            <span>{errors.password.message}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className='w-full bg-gradient-to-br from-secondary to-primary text-white py-4 px-6 font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none rounded! p-4!'
                                >
                                    {isPending ? (
                                        <div className='flex items-center justify-center gap-2'>
                                            <IonSpinner color='light' />
                                            <span>Accedint...</span>
                                        </div>
                                    ) : (
                                        <div className='flex items-center justify-center gap-2 '>
                                            <Icon icon={Login} className='size-6' />
                                            <span>Accedir</span>
                                        </div>
                                    )}
                                </button>

                                {/* Forgot Password Link */}
                                <div className='text-center'>
                                    <Link
                                        to={APP_ROUTES.FORGOT_PASSWORD}
                                        className='inline-flex items-center gap-2 text-secondary hover:text-indigo-800 font-medium transition-colors duration-300'
                                    >
                                        <Icon icon={Lock} className='h-4 w-4' />
                                        <span>Has oblidat la contrasenya?</span>
                                    </Link>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </PublicLayout>
    )
}