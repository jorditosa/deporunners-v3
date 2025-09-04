import { useForm } from 'react-hook-form'
import PublicLayout from '../PublicLayout'
import { IonInput, IonInputPasswordToggle, IonSpinner, useIonRouter } from '@ionic/react'
import { Link } from 'react-router-dom'
import { ResetFormData } from '../../interfaces/auth.interface'
import { RefreshCw, Key, Lock, AlertCircle, Mail } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { authActions } from '../../actions/authActions'
import { toast } from 'react-toastify'
import { APP_ROUTES } from '../../constants/endpoints'

export default function ResetPassword() {
    const router = useIonRouter();
    const { handleSubmit, register, formState: { errors }, reset, watch } = useForm<ResetFormData>({
        defaultValues: {
            code: '',
            password: '',
            repeatPassword: ''
        }
    })

    const watchPassword = watch("password");

    const { mutate, isPending } = useMutation({
        mutationFn: authActions.resetPassword,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success("Contrasenya modificada correctament")
            reset()
            router.push(APP_ROUTES.LOGIN)
        }
    })

    const submitForm = (formData: ResetFormData) => {
        mutate(formData)
    }

    return (
        <PublicLayout>
            <main className='min-h-full'>
                <div className='container mx-auto px-4 py-8'>

                    <div className='max-w-md mx-auto'>
                        {/* Reset Password Form Card */}
                        <div className='bg-white rounded-2xl shadow-xl p-6 mb-6'>
                            {/* Header Section */}
                            <div className='mb-8 space-y-4'>
                                <div className='space-y-2'>
                                    <h1 className='text-3xl font-bold text-secondary'>
                                        nova Contrasenya
                                    </h1>
                                    <p className='text-gray-600'>
                                        Introdueix el codi i la teva nova contrasenya
                                    </p>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit(submitForm)} noValidate className='space-y-6'>

                                {/* Code Field */}
                                <div className='space-y-2'>
                                    <label htmlFor="code" className='flex items-center gap-2 text-sm font-semibold text-gray-700'>
                                        <Key className='h-4 w-4 text-secondary' />
                                        Codi de recuperació
                                    </label>
                                    <div className='relative'>
                                        <IonInput
                                            color={"secondary"}
                                            type="text"
                                            fill='outline'
                                            placeholder='Introdueix el codi rebut per email'
                                            className={`transition-all duration-300 ${errors.code ? 'border-red-300' : 'border-gray-200 focus:border-secondary'
                                                }`}
                                            {...register("code", {
                                                required: "El codi de recuperació és obligatori",
                                                minLength: {
                                                    value: 4,
                                                    message: "El codi ha de tenir almenys 4 caràcters"
                                                }
                                            })}
                                            required
                                        />
                                    </div>
                                    {errors.code && (
                                        <div className="flex items-center gap-2 text-red-500 text-sm">
                                            <AlertCircle className='h-4 w-4' />
                                            <span>{errors.code.message}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div className='space-y-2'>
                                    <label htmlFor="password" className='flex items-center gap-2 text-sm font-semibold text-gray-700'>
                                        <Lock className='h-4 w-4 text-secondary' />
                                        Nova contrasenya
                                    </label>
                                    <div className='relative'>
                                        <IonInput
                                            color={"secondary"}
                                            type="password"
                                            fill='outline'
                                            placeholder='Mínim 6 caràcters'
                                            className={`transition-all duration-300 ${errors.password ? 'border-red-300' : 'border-gray-200 focus:border-secondary'
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
                                            placeholder='Repeteix la nova contrasenya'
                                            className={`transition-all duration-300 ${errors.repeatPassword ? 'border-red-300' : 'border-gray-200 focus:border-secondary'
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
                                    className='w-full bg-gradient-to-br from-secondary to-primary text-white py-4 px-6  font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none rounded! p-4!'
                                >
                                    {isPending ? (
                                        <div className='flex items-center justify-center gap-2'>
                                            <IonSpinner color='light' />
                                            <span>Actualitzant contrasenya...</span>
                                        </div>
                                    ) : (
                                        <div className='flex items-center justify-center gap-2'>
                                            <RefreshCw className='h-5 w-5' />
                                            <span>Actualitzar contrasenya</span>
                                        </div>
                                    )}
                                </button>

                                {/* Forgot Password Link */}
                                <div className='text-center'>
                                    <Link
                                        to={APP_ROUTES.FORGOT_PASSWORD}
                                        className='inline-flex items-center gap-2 text-secondary hover:text-purple-800 font-medium transition-colors duration-300'
                                    >
                                        <Mail className='size-5' />
                                        <span>No has rebut el codi? Torna a enviar</span>
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