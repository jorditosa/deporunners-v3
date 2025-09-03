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
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/public-background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        <div className='relative z-10'>
          <IonButton   
          fill='clear' 
          onClick={() => router.push('/', 'forward')}
          className="py-12 bg-gradient-to-b from-secondary via-secondary w-full"
          >
            <IonImg src="/logo.png" className='w-full' />
          </IonButton>
        </div>
        <div className="relative z-10">
          {children}
        </div>
        <footer className="w-full flex justify-center items-center fixed bottom-4 z-20">
          <span className="block text-white font-semibold">
            &copy; Club Esportiu Deporunners {new Date().getFullYear()}
          </span>
        </footer>
      </IonContent>
    </IonPage>
  )
}