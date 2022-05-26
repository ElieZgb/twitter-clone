import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Image } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function FormikTweetUploader({handleBlur, handleChange, values}) {
    const [uploadPhoto, setUploadPhoto] = useState(null)

    return (
        <View style={{paddingLeft: 10, paddingTop: 10, flex: 1, paddingRight: 15}}>
            <TextInput 
                style={styles.tweetText}
                placeholder="What's happening?"
                placeholderTextColor='#999'
                autoFocus={false}
                multiline={true}
                onChangeText={handleChange('text')}
                onBlur={handleBlur('text')}
                value={values.text}
            />
            <TextInput
                onChange={(e) => {setUploadPhoto(e.nativeEvent.text)}}
                style={styles.tweetText}
                placeholder='Insert photo url here'
                placeholderTextColor='#999'
                autoFocus={false}
                onChangeText={handleChange('photo')}
                onBlur={handleBlur('photo')}
                value={values.photo}
            />
            {validURL(uploadPhoto) ? <PictureSection uploadPhoto={uploadPhoto}/> : null}
        </View>
    )
}

const PictureSection = ({uploadPhoto}) => (
    <View style={{marginTop: 15}}>
        {/* <Image source={{uri: 'https://picsum.photos/1000/500'}} style={{width: '100%', height: 400, borderRadius: 12, resizeMode: 'cover'}}/> */}
        <Image source={{uri: uploadPhoto}} style={{width: '100%', height: 400, borderRadius: 12, resizeMode: 'cover'}} />

        <View style={{position: 'absolute', right: 10, top: 10, backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: 100, width: 30, height: 30, alignItems: 'center', justifyContent: 'center', transform: [{rotate: '45deg'}]}}><Feather name='plus' size={22} style={{color: '#fff'}}/></View>
        <View style={{position: 'absolute', bottom: 5, right: 5, backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 100, width: 35, height: 35, alignItems: 'center', justifyContent: 'center'}}><Entypo name='brush' size={20} style={{color: '#fff'}}/></View>
        <View style={{position: 'absolute', bottom: 5, right: 45, backgroundColor: 'rgba(0,0,0,0.6)', width: 50, height: 35, borderRadius: 100, alignItems: 'center', justifyContent: 'center'}}><Text style={{color: '#fff', fontWeight: 'bold', fontSize: 12}}>+ALT</Text></View>
        <View style={{position: 'absolute', bottom: -25, flexDirection: 'row', alignItems: 'center'}}>
            <Image source={require('../assets/user-o.png')} style={{width: 22, height: 22, resizeMode: 'contain'}} />
            <Text style={{color: 'rgb(0,150,240)', fontSize: 16, marginLeft: 3, fontWeight: '500'}}>Who's in this photo?</Text>
        </View>
    </View>
)

const styles = StyleSheet.create({
    tweetText: {
        fontSize: 20,
        marginTop: 10,
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