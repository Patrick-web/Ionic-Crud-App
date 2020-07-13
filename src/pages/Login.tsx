import { IonContent, IonItem, IonInput, IonButton, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonLoading, IonRouterLink, IonAlert, useIonViewWillEnter } from '@ionic/react';
import React, { useState } from 'react';
import './global.css';
import { login, validEntries, isLoggedIn } from '../utils/index'
import { useHistory } from "react-router";
const Login: React.FC = () => {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [showLoading, setShowLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const history = useHistory();

  useIonViewWillEnter(() => {
    if (isLoggedIn()) {
      history.replace('/home')
    }
  })

  const attemptlogin = async () => {
    if (validEntries(email, password)) {
      setShowLoading(true);
      let result = await login({ email: email, password: password });
      if (result) {
        setShowLoading(false);
        history.replace("/home");
      } else {
        setShowLoading(false);
      }
    } else {
      setShowAlert(true);

    }
  }
  return (
    <IonPage>
      <IonHeader >
        <IonToolbar color="primary">
          <IonTitle class="ion-text-center">Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonLoading
          message="Logging In"
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
        />

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Alert'}
          message={'Please enter valid email and password'}
          buttons={[{ text: 'Ok', role: 'cancel' }]}
        />

        <div className="flex col between">
          <div>
            <IonItem class="ion-margin-bottom ion-margin-top">

              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                type="email"
                value={email}
                name="email"
                onIonChange={e => setEmail(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem class="ion-margin-top" >
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                type="password"
                value={password}
                name="password"
                placeholder="Must be more than 4 characters"
                onIonChange={e => setPassword(e.detail.value as any)} clearInput>
              </IonInput>
            </IonItem>
          </div>
          <div className="flex col center shrink">
            <IonButton onClick={() => attemptlogin()} expand="full" color="primary">Login</IonButton>
            <IonRouterLink href='/signup' class="ion-text-center">Register insted</IonRouterLink>
          </div>
        </div>
      </IonContent>
    </IonPage >
  );
};

export default Login;
