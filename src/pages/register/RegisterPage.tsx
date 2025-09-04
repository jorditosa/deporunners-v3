import { useForm } from 'react-hook-form'
import PublicLayout from '../PublicLayout'
import { IonInput, IonInputPasswordToggle, IonSpinner, useIonRouter } from '@ionic/react'
import { Link } from 'react-router-dom'
import { RegisterFormData } from '../../interfaces/auth.interface'
import { UserPlus, Mail, Lock, AlertCircle, Shield } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { authActions } from '../../actions/authActions'
import { toast } from 'react-toastify'
import { APP_ROUTES } from '../../constants/endpoints'

export default function RegisterPage() {
    const router = useIonRouter()
    const { handleSubmit, register, formState: { errors }, reset, watch } = useForm<RegisterFormData>({
        defaultValues: {
            email: '',
            password: '',
            repeatPassword: ''
        }
    })

    const watchPassword = watch("password");

    const { mutate, isPending } = useMutation({
        mutationFn: authActions.createAccount,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success("Alta feta correctament, ja pots iniciar sessió")
            reset()
            router.push(APP_ROUTES.LOGIN, 'forward')
        }
    })

    const submitForm = (formData: RegisterFormData) => {
        mutate(formData)
    }

    return (
        <PublicLayout>
            <main className='min-h-full'>
                <div className='container mx-auto px-4 py-8'>

                    <div className='max-w-md mx-auto'>
                        {/* Register Form Card */}
                        <div className='bg-white rounded-2xl shadow-xl p-6 mb-6'>
                            <div className='mb-8 space-y-4'>
                                <div className='space-y-2'>
                                    <h1 className='text-3xl font-bold text-secondary'>
                                        dona't d'Alta
                                    </h1>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit(submitForm)} noValidate className='space-y-6'>

                                {/* Email Field */}
                                <div className='space-y-2'>
                                    <label htmlFor="email" className='flex items-center gap-2 text-sm font-semibold text-gray-700'>
                                        <Mail className='h-4 w-4 text-secondary' />
                                        Correu electrònic
                                    </label>
                                    <div className='relative'>
                                        <IonInput
                                            color={"secondary"}
                                            type="email"
                                            fill='outline'
                                            placeholder='nom@exemple.com'
                                            className={`transition-all duration-300 ${errors.email ? 'border-red-300' : 'border-gray-200 focus:border-green-500'
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
                                            <AlertCircle className='h-4 w-4' />
                                            <span>{errors.email.message}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div className='space-y-2'>
                                    <label htmlFor="password" className='flex items-center gap-2 text-sm font-semibold text-gray-700'>
                                        <Lock className='h-4 w-4 text-secondary' />
                                        Contrasenya
                                    </label>
                                    <div className='relative'>
                                        <IonInput
                                            color={"secondary"}
                                            type="password"
                                            fill='outline'
                                            placeholder='Mínim 6 caràcters'
                                            className={`transition-all duration-300 ${errors.password ? 'border-red-300' : 'border-gray-200 focus:border-green-500'
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
                                            <AlertCircle className='h-4 w-4' />
                                            <span>{errors.password.message}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Repeat Password Field */}
                                <div className='space-y-2'>
                                    <label htmlFor="repeatPassword" className='flex items-center gap-2 text-sm font-semibold text-gray-700'>
                                        <Lock className='h-4 w-4 text-secondary' />
                                        Confirmar contrasenya
                                    </label>
                                    <div className='relative'>
                                        <IonInput
                                            color={"secondary"}
                                            type="password"
                                            fill='outline'
                                            placeholder='Repeteix la contrasenya'
                                            className={`transition-all duration-300 ${errors.repeatPassword ? 'border-red-300' : 'border-gray-200 focus:border-green-500'
                                                }`}
                                            {...register("repeatPassword", {
                                                required: "Cal confirmar la contrasenya",
                                                validate: (value) =>
                                                    value === watchPassword || "Les contrasenyes no coincideixen"
                                            })}
                                            required
                                        >
                                            <IonInputPasswordToggle color={"secondary"} slot="end"></IonInputPasswordToggle>
                                        </IonInput>
                                    </div>
                                    {errors.repeatPassword && (
                                        <div className="flex items-center gap-2 text-red-500 text-sm">
                                            <AlertCircle className='h-4 w-4' />
                                            <span>{errors.repeatPassword.message}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className='w-full bg-gradient-to-r from-secondary to-primary text-white py-4 px-6  font-semibold hover:from-green-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none p-4! rounded!'
                                >
                                    {isPending ? (
                                        <div className='flex items-center justify-center gap-2'>
                                            <IonSpinner color='light' />
                                            <span>Creant compte...</span>
                                        </div>
                                    ) : (
                                        <div className='flex items-center justify-center gap-2'>
                                            <UserPlus className='size-5' />
                                            <span>Crear compte</span>
                                        </div>
                                    )}
                                </button>

                                {/* Login Link */}
                                <div className='text-center'>
                                    <Link
                                        to={APP_ROUTES.LOGIN}
                                        className='inline-flex items-center gap-2 text-secondary hover:text-blue-800 font-medium transition-colors duration-300'
                                    >
                                        <UserPlus className='size-5' />
                                        <span>Ja tens compte? Inicia sessió</span>
                                    </Link>
                                </div>

                            </form>
                        </div>

                        {/* Terms Notice */}
                        <div className='bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-6 text-center border border-green-100'>
                            <div className='space-y-3'>
                                <div className='flex items-center justify-center gap-2 text-blue-700'>
                                    <Shield className='h-5 w-5' />
                                    <span className='font-semibold'>Informació important</span>
                                </div>
                                <p className='text-gray-600 text-sm'>
                                    En crear el teu compte, acceptes les nostres condicions d'ús i
                                    política de privacitat. Les teves dades estaran protegides.
                                </p>
                            </div>
                        </div>


                    </div>
                </div>
            </main>
        </PublicLayout >
    )
}