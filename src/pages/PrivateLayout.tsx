import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { ReactNode, useEffect } from "react";
import HeaderHome from "../components/Header/HeaderHome";
import { useAuth } from "../hooks/useAuth";
import { APP_ROUTES } from "../constants/endpoints";
import Spinner from "../components/ui/Spinner";
import { identifyUmamiUser } from "../helpers/umami";

interface PrivateLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  contentColor?: string;
  className?: string;
}

export default function PrivateLayout({ 
  children, 
  showHeader = true,
  contentColor,
  className = ""
}: PrivateLayoutProps) {
  const router = useIonRouter();
  const {data, isLoading: isLoadingUser, isError} = useAuth()

  useEffect(() => {
    if (data) identifyUmamiUser(data)
  }, [data])

  if (isError) router.push(APP_ROUTES.PUBLIC_HOME)
  if (isLoadingUser) return <Spinner />
  if (data) return (
    <IonPage className={className}>
      {showHeader && (
        <HeaderHome />
      )}
      
      <IonContent color={contentColor} className="container">
        {children}
      </IonContent>
    </IonPage>
  )
}