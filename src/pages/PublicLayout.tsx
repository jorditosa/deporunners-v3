import { IonButton, IonContent, IonImg, IonPage, useIonRouter } from "@ionic/react";
import { ReactNode } from "react";

interface PublicLayoutProps {
  children: ReactNode;
  headerColor?: string;
  className?: string;
}

export default function PublicLayout({
  children,
  className = ""
}: PublicLayoutProps) {
  const router = useIonRouter();
  return (
    <IonPage className={className} id="home-page">
      <IonContent color='secondary' className="container">
        <div className='container'>
          <IonButton   
          fill='clear' 
          onClick={() => router.push('/', 'forward')}
          className="py-10"
          >
            <IonImg src="/logo.png" className='w-full' />
          </IonButton>
        </div>
        {children}
        <footer className="w-full flex justify-center items-center fixed bottom-4">
          <span className="block text-white font-semibold">
            &copy; Club Esportiu Deporunners {new Date().getFullYear()}
          </span>
        </footer>
      </IonContent>
    </IonPage>
  )
}