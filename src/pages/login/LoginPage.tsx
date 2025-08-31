import { useForm } from 'react-hook-form'
import PublicLayout from '../PublicLayout'
import { IonRow, IonCol, IonCard, IonCardHeader, IonCardContent, IonInput, IonInputPasswordToggle, IonButton, IonSpinner } from '@ionic/react'
import { Link } from 'react-router-dom'
import { LoginFormData } from '../../interfaces/auth.interface'
import Heading from '../../components/ui/Heading'
import { LogIn } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { authActions } from '../../actions/authActions'

export default function LoginPage() {
    const { handleSubmit, register, formState: { errors }, reset } = useForm<LoginFormData>({
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const { mutate, isPending } = useMutation({
        mutationFn: authActions.login,
        onError: (error) => {
            console.log(error.message)
        },
        onSuccess: (response) => {
            console.log(response)
            
        }
    })

    const submitForm = (formData: LoginFormData) => {
        console.log(formData)
        mutate(formData)

    }
    return (
        <PublicLayout>
            <IonRow>
                <IonCol size="12" className="p-4">
                    <IonRow className="block m-auto max-w-lg">
                        <IonCard color={"light"} className="block shadow-md shadow-slate-600 rounded-xl bg-white/90">
                            <IonCardHeader className='container'>
                                <Heading
                                    title="iniciar Sessió"
                                    variant="h1"
                                    icon={LogIn}
                                    iconSize={12}
                                />
                            </IonCardHeader>

                            <IonCardContent>
                                <form onSubmit={handleSubmit(submitForm)}>
                                    <div className="form-group mb-2">
                                        <IonInput
                                            color={"secondary"}
                                            label="Email"
                                            fill="outline"
                                            type="email"
                                            {...register("email", { required: true })}
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
                                            fill="outline"
                                            type="password"
                                            {...register("password", { required: true })}
                                            required
                                        >
                                            <IonInputPasswordToggle color={"secondary"} slot="end"></IonInputPasswordToggle>
                                        </IonInput>
                                        {errors.password && (
                                            <span className="text-red-500">
                                                Ups, el password no és correcte.
                                            </span>
                                        )}
                                    </div>

                                    <IonRow>
                                        <IonButton color="secondary" expand='full' type="submit" className='w-full'>
                                            {
                                                isPending
                                                    ? <IonSpinner color='light' />
                                                    : <span className='text-white'>Accedir</span>
                                            }
                                        </IonButton>
                                    </IonRow>

                                </form>

                                {/* <IonAlert
                                    header={msg}
                                    isOpen={isAlert}
                                    onDidDismiss={() => setIsAlert(false)}
                                    buttons={["Ok"]}
                                ></IonAlert> */}
                            </IonCardContent>
                        </IonCard>
                    </IonRow>
                    <IonRow>
                        <Link to={'/forgot-landing'} className='w-full my-4'>
                            <IonButton expand='full' color='light' fill='clear'>
                                Has oblidat contrasenya?
                            </IonButton>
                        </Link>
                    </IonRow>
                </IonCol>
            </IonRow>
        </PublicLayout>
    )
}
