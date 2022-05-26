import React, { useEffect, useState } from 'react';
import { SignedOutNavigations, SignedInNavigations } from './screens/Navigations';
import { firebase } from './firebase';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(()=> (
    firebase.auth().onAuthStateChanged(user => user ? setCurrentUser(user) : setCurrentUser(null))
  ), [])
  
  return <>{currentUser ? <SignedInNavigations /> : <SignedOutNavigations />}</>
}