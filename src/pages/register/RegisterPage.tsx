import { useForm } from 'react-hook-form'
import PublicLayout from '../PublicLayout'
import { IonRow, IonCol, IonCard, IonCardHeader, IonCardContent, IonInput, IonInputPasswordToggle, IonButton, IonSpinner, useIonRouter } from '@ionic/react'
import { Link } from 'react-router-dom'
import { RegisterFormData } from '../../interfaces/auth.interface'
import Heading from '../../components/ui/Heading'
import { FilePenLine } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { authActions } from '../../actions/authActions'
import { toast } from 'react-toastify'

export default function RegisterPage() {
    const router = useIonRouter()
    const { handleSubmit, register, formState: { errors }, reset } = useForm<RegisterFormData>({
        defaultValues: {
            email: '',
            password: '',
            repeatPassword: ''
        }
    })
    const { mutate, isPending } = useMutation({
        mutationFn: authActions.createAccount,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (response) => {
            console.log(response)
            reset()
            router.push("/register-confirm")
        }
    })

    const submitForm = (formData: RegisterFormData) => {
        console.log(formData)
        mutate(formData)

    }
    return (
        <PublicLayout>
            <IonRow>
                <IonCol size="12" className="p-4">
                    <IonRow className="block m-auto max-w-lg">
                        <IonCard color={"light"} className="block shadow-md shadow-slate-600 rounded-xl bg-white">
                            <IonCardHeader className='container'>
                                <Heading
                                    title="Donar-se d'Alta"
                                    variant="h1"
                                    icon={FilePenLine}
                                    iconSize={12}
                                />
                            </IonCardHeader>

                            <IonCardContent>
                                <form onSubmit={handleSubmit(submitForm)}>
                                      <div className="form-group mb-2">
                                        <IonInput
                                            color={"secondary"}
                                            label="Email"
                                            type="email"
                                            {...register("email", { 
                                                required: "L'email és obligatori",
                                             })}
                                            required
                                        />
                                        {errors.email && (
                                            <span className="text-red-500">
                                                Ups, l'email no és correcte.
                                            </span>
                                        )}
                                    </div>
                                    <div className="form-group mb-2">
                                        <IonInput
                                            color={"secondary"}
                                            label="Password"
                                            type="password"
                                            {...register("password", { 
                                                required: "El password és obligatori",
                                             })}
                                            required
                                        >
                                            <IonInputPasswordToggle color={"secondary"} slot="end"></IonInputPasswordToggle>
                                        </IonInput>
                                        {errors.password && (
                                            <span className="text-red-500">
                                                Ups, el password és correcte.
                                            </span>
                                        )}
                                    </div>
                                    <div className="form-group mb-2">
                                        <IonInput
                                            color={"secondary"}
                                            label="Repeteix Password"
                                            type="text"
                                            {...register("repeatPassword", { 
                                                required: "El password és obligatori",
                                             })}
                                            required
                                        >
                                            <IonInputPasswordToggle color={"secondary"} slot="end"></IonInputPasswordToggle>
                                        </IonInput>
                                        {errors.repeatPassword && (
                                            <span className="text-red-500">
                                                Ups, les contrasenyes no coincideixen.
                                            </span>
                                        )}
                                    </div>


                                    <IonRow>
                                        <IonButton color="secondary" expand='full' type="submit" className='w-full'>
                                            {
                                                isPending
                                                    ? <IonSpinner color='light' />
                                                    : <span className='text-white'>Dona't d'Alta</span>
                                            }
                                        </IonButton>
                                    </IonRow>

                                </form>
                            </IonCardContent>
                        </IonCard>
                    </IonRow>
                    <IonRow>
                        <Link to={'/login'} className='w-full my-4'>
                            <IonButton expand='full' color='light' fill='clear'>
                                Ja tens compte?
                            </IonButton>
                        </Link>
                    </IonRow>
                </IonCol>
            </IonRow>
        </PublicLayout>
    )
}
