import { IonContent, IonItem, IonAlert, IonLabel, IonLoading, IonRouterLink, IonInput, IonButton, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from "react-router";
import { signUp, validEntries } from '../utils/index'

import './global.css';

const Signup: React.FC = () => {
    const history = useHistory();
    const [showLoading, setShowLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [email, setEmail] = useState("eve.holt@reqres.in");
    const [password, setPassword] = useState("pistol");

    const attemptSignUp = async () => {
        if (validEntries(email, password)) {
            setShowLoading(true);
            const result = await signUp(email, password)
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
            <IonHeader  >
                <IonToolbar color="primary" >
                    <IonTitle class="ion-text-center">Register</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent class="ion-padding">
                <IonLoading
                    message="Registering"
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
                        <IonButton onClick={() => attemptSignUp()} expand="full" color="primary">Register</IonButton>
                        <IonRouterLink href='/login' class="ion-text-center">Go to Login</IonRouterLink>
                    </div>
                </div>
            </IonContent>
        </IonPage >
    );
};

export default Signup;
