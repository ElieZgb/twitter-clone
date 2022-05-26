import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet, Alert, TextInput } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { firebase, db } from '../firebase';

const PLACEHOLDER = 'https://www.pngkey.com/png/full/950-9501315_buzzfeed-png.png'

const onSignup = async(username, email, password, accountName, pp) => {
    if(!validURL(pp) && pp.length > 0) return console.log("Invalid url");
    try{
        const authUser = await firebase.auth().createUserWithEmailAndPassword(email, password);
        
        console.log("Account Created: ");
        console.log(`Email: ${email},\tPassword: ${password}`);
    
        db.collection('users').doc(authUser.user.email).set({
            owner_uid: authUser.user.uid,
            user: accountName,
            username: username,
            email: authUser.user.email,
            profile_picture: pp === '' ? PLACEHOLDER : pp,
            verified: false
        })
    }catch(error){
        Alert.alert(error.message);
    }
}

export default function SignUpScreen({navigation, route}) {
    const {username, email, password, accountName} = route.params;
    const [profile_picture, setProfile_picture] = useState('');

    return (
        <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
            <Header navigation={navigation}/>
            <Text style={{fontSize: 27, fontWeight: '700', marginTop: 50, marginBottom: 20}}>Create your account</Text>
            <Results email={email} username={username} accountName={accountName} pp={profile_picture} setPP={setProfile_picture}/>
            <View style={{marginHorizontal: 20, marginTop: 30}}>
                <Text style={{fontSize: 13}}>By signing up, you agree to the <Text style={{color: 'rgb(0,150,240)'}}>Terms of Service</Text> and <Text style={{color: 'rgb(0,150,240)'}}>Privacy Policy</Text>, including <Text style={{color: 'rgb(0,150,240)'}}>Cookie Use</Text>. 
                Others will be able to find you by email or phone number when provided • <Text style={{color: 'rgb(0,150,240)'}}>Privacy Options</Text></Text>
            </View>
            <View style={{position: 'absolute', bottom: 0, width: '100%', marginBottom: 15}}>
                <TouchableOpacity style={{
                    backgroundColor: profile_picture.length < 1 || validURL(profile_picture) ? 'rgb(0,150,240)':'#ccc', 
                    borderRadius: 100,
                    marginHorizontal: 20,
                    paddingVertical: 12,
                    }}
                    onPress={()=> onSignup(username, email, password, accountName, profile_picture)}>
                    <Text style={{textAlign: 'center', color: '#fff', fontWeight: '700', fontSize: 16}}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const Header = ({navigation}) => (
    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, width: '100%'}}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={{position: 'absolute', left: 20}}><Ionicons name='chevron-back' size={30} style={{color: 'rgb(0,150,240)'}}/></TouchableOpacity>
        <Image source={require('../assets/twitter-logo.png')} style={{width: 36, height: 36}}/>
    </View>
)

const Results = (props) => (
    <View style={{width: '100%'}}>
        <View style={{justifyContent: 'center', alignItems: 'center', marginVertical: 10}}>
            <Image source={{uri: validURL(props.pp) ? props.pp : PLACEHOLDER}} style={{width: 50, height: 50, borderRadius: 100}} />
        </View>
        <View style={styles.results}><Text style={{color: 'rgb(0,150,240)'}}>@{props.username}</Text></View>
        <View style={styles.results}><Text style={{color: 'rgb(0,150,240)'}}>{props.accountName}</Text></View>
        <View style={styles.results}><Text style={{color: 'rgb(0,150,240)'}}>{props.email}</Text></View>
        <View style={styles.results}>
            <TextInput placeholder='Enter profile picture url or leave it as default'
                autoFocus={false}
                onChange={e => props.setPP(e.nativeEvent.text)}
            />
        </View>
    </View>
)

const styles = StyleSheet.create({
    results: {
        marginTop: 20,
        fontSize: 15,
        borderBottomWidth: 1,
        marginHorizontal: 20,
        borderColor: '#eee',
        paddingBottom: 10,
    }
})


function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }