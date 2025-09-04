import { useForm } from 'react-hook-form'
import PublicLayout from '../PublicLayout'
import { IonInput, IonSpinner, useIonRouter } from '@ionic/react'
import { Link } from 'react-router-dom'
import { ForgotFormData } from '../../interfaces/auth.interface'
import { KeyRound, Mail, AlertCircle } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { authActions } from '../../actions/authActions'
import { toast } from 'react-toastify'
import { APP_ROUTES } from '../../constants/endpoints'

export default function ForgotPassword() {
    const router = useIonRouter();
    const { handleSubmit, register, formState: { errors }, reset } = useForm<ForgotFormData>({
        defaultValues: {
            email: '',
        }
    })
    const { mutate, isPending } = useMutation({
        mutationFn: authActions.forgotPassword,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success("Email amb les instruccions enviat")
            reset()
            router.push(APP_ROUTES.RESET_PASSWORD)
        }
    })

    const submitForm = (formData: ForgotFormData) => {
        mutate(formData)
    }

    return (
        <PublicLayout>
            <main className='min-h-full'>
                <div className='container mx-auto px-4 py-8'>


                    <div className='max-w-md mx-auto'>
                        {/* Forgot Password Form Card */}
                        <div className='bg-white rounded-2xl shadow-xl p-6 mb-6'>
                            <div className='mb-8 space-y-4'>
                                <div className='space-y-2'>
                                    <h1 className='text-3xl font-bold text-secondary'>
                                        recuperar Contrasenya
                                    </h1>
                                    <p className='text-gray-600'>
                                        T'enviarem instruccions per restablir-la
                                    </p>
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
                                            placeholder='Introdueix el teu email registrat'
                                            className={`transition-all duration-300 ${errors.email ? 'border-red-300' : 'border-gray-200 focus:border-orange-500'
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

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className='w-full bg-gradient-to-br from-secondary to-primary text-white py-4 px-6  font-semibold hover:from-orange-700 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none rounded! p-4!'
                                >
                                    {isPending ? (
                                        <div className='flex items-center justify-center gap-2'>
                                            <IonSpinner color='light' />
                                            <span>Enviant instruccions...</span>
                                        </div>
                                    ) : (
                                        <div className='flex items-center justify-center gap-2'>
                                            <KeyRound className='size-5' />
                                            <span>Enviar instruccions</span>
                                        </div>
                                    )}
                                </button>

                                {/* Register Link */}
                                <div className='text-center'>
                                    <Link
                                        to={APP_ROUTES.REGISTER}
                                        className='inline-flex items-center gap-2 text-secondary hover:text-orange-800 font-medium transition-colors duration-300'
                                    >
                                        <Mail className='h-4 w-4' />
                                        <span>No estàs registrat? Crea un compte</span>
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