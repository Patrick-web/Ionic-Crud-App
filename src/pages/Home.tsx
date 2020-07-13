import {
  useIonViewWillEnter
  , IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton
} from '@ionic/react';
import React from 'react';
import GetUsers from '../components/GetUsers'
import GetPantones from '../components/GetPantones'
import EmployeeCrud from '../components/EmployeeCrud'
import { useHistory } from "react-router";
import { isLoggedIn } from '../utils/index'
import './global.css';

const Home: React.FC = () => {
  const history = useHistory();
  useIonViewWillEnter(() => {
    if (!isLoggedIn()) {
      history.replace('/login')
    }
  })
  const logOut = () => {
    history.replace('/login');
    localStorage.removeItem('currentUserToken');

  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondary">
          <IonTitle class="ion-text-center"><h1>Users</h1></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent >
        <GetUsers />
        <GetPantones />
        <EmployeeCrud />
        <IonButton expand="full" onClick={() => logOut()} color="danger">Log Out</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
