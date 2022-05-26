import React, { useEffect, useState } from 'react'
import { View, Image, TouchableOpacity, Alert } from 'react-native'
import { Divider } from 'react-native-elements'
import { firebase } from '../firebase'

const onSignOut = async () => {
    try{
        await firebase.auth().signOut();
        console.log("Signed out!")
    }catch(error){
        Alert.alert(error.message)
    }
}

export default function Header() {
    const [profilePicture, setProfilePicture] = useState(null);

    const getProfilePicture = async () => {
        const usersCollection = await firebase.firestore().collection('users').get();
        const users = usersCollection.docs.map(doc => doc.data())
        const profile_picture = users.find(user => user.email === firebase.auth().currentUser.email).profile_picture;
        setProfilePicture(profile_picture)
    }

    useEffect(()=>{ getProfilePicture() }, [])

    return (
        <View style={{backgroundColor: '#fff', zIndex: 500}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 5, paddingHorizontal: 20}}>
                <Image source={profilePicture ? {uri: profilePicture} : require('../assets/placeholder.png')} style={{width: 35, height: 35, borderRadius: 100}}/>
                <Image source={require('../assets/twitter-logo.png')} style={{width: 40, height: 40, resizeMode: 'contain'}}/>
                <TouchableOpacity onPress={onSignOut}><Image source={require('../assets/sparkle-blue.png')} style={{width: 25, height: 25, resizeMode: 'contain'}}/></TouchableOpacity>
            </View>
            <Divider width={1} orientation='vertical' />
        </View>
    )
}
