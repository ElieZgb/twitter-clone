import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Divider } from 'react-native-elements';
import { firebase, db } from '../firebase';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FormikTweetUploader from '../components/FormikTweetUploader'
import { Formik } from 'formik'
import * as Yup from 'yup'

const FormikSchema = Yup.object().shape({
    photo: Yup.string().url()
})

const onTweetUpload = async (values, navigation) => {
    if(values.text.length == 0 && values.photo.length == 0) return;

    const usersColl = await firebase.firestore().collection('users').get();
    const users = usersColl.docs.map(doc => doc.data())
    const currentUser = users.find(user => user.email === firebase.auth().currentUser.email)

    db.collection('users').doc(firebase.auth().currentUser.email).collection('tweets').add({
        user: currentUser.user,
        username: currentUser.username,
        verified: currentUser.verified,
        profile_picture: currentUser.profile_picture,
        tweet_picture_url: values.photo,
        tweet_text: values.text,
        likes: 0,
        comments: 0,
        retweet: 0,
        type: 'Testing'
    }).then(()=>{navigation.goBack()})
}

export default function TweetUploadScreen({navigation}) {
    const [profilePicture, setProfilePicture] = useState(null);

    const getProfilePicture = async () => {
        const usersCollection = await firebase.firestore().collection('users').get();
        const users = usersCollection.docs.map(doc => doc.data());
        const profile_picture = users.find(user => user.email === firebase.auth().currentUser.email).profile_picture;
        setProfilePicture(profile_picture);
        return profile_picture;
    }

    useEffect(()=>{
        getProfilePicture()
    }, [])

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <Formik initialValues={{text: '', photo: ''}}
            onSubmit={values => {
                onTweetUpload(values, navigation)
            }}
            validationSchema={FormikSchema}
            >
            {({handleBlur, handleSubmit, handleChange, values, isValid})=>(
                <>
            <Header handleSubmit={handleSubmit} isValid={isValid} values={values} navigation={navigation}/>
            <Divider width={1} orientation='vertical' />
            <ScrollView>
                <View style={{flexDirection: 'row'}}>
                    <View style={{paddingLeft: 20, paddingTop: 10}}>
                        <Image source={{uri: profilePicture }}  style={{width: 50, height: 50, borderRadius: 100}} />
                    </View>
                    <FormikTweetUploader handleBlur={handleBlur} handleChange={handleChange} values={values}/>
                </View>
            </ScrollView>
            </>)}
            </Formik>
            <TweetUploadBottomTab />
        </SafeAreaView>
    )
}



//////////// COMPONENTS ////////////

const Header = ({handleSubmit, isValid, values, navigation}) => (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 20}}>
        <TouchableOpacity onPress={()=>navigation.goBack()}><Text style={{fontSize: 18}}>Cancel</Text></TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit} style={{borderRadius: 100, backgroundColor: isValid && (values.text.length > 0 || values.photo.length > 0) ? 'rgb(0,150,240)' : '#ccc', paddingVertical: 7, paddingHorizontal: 15}}><Text style={{fontSize: 15, color: '#fff', fontWeight: '600'}}>Tweet</Text></TouchableOpacity>
    </View>
)

const TweetUploadBottomTab = () => (
    <View>
        <Divider width={1} orientation='vertical' />
        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', flex: 2, alignItems: 'center'}}>
                <Image source={require('../assets/photos-icon.png')} style={{width: 32, height: 32, resizeMode: 'contain'}}/>
                <Image source={require('../assets/chart-icon.png')} style={{width: 27, height: 27, transform: [{rotate: '90deg'}], resizeMode: 'contain'}}/>
                <Ionicons name='location-outline' size={32} style={{color: 'rgb(0,150,240)'}}/>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'flex-end', flex: 1, paddingRight: 20}}>
                <AntDesign name='pluscircle' size={32} style={{color: 'rgb(0,150,240)'}}/>
            </View>
        </View>
    </View>
)