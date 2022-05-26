import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, StyleSheet, Alert } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Validator from 'email-validator';
import { firebase } from '../firebase';

const LoginFormSchema = Yup.object().shape({
    email_username: Yup.string().required().min(5, 'Username or email is required'),
    password: Yup.string().required().min(8, 'Your password has to have at least 8 characters')
})

const onLogin = async (email_username, password) => {
    try{
        if(Validator.validate(email_username)){
            await firebase.auth().signInWithEmailAndPassword(email_username, password);
            console.log("Logged in with email🔥")
        }else{
            try{
                const usersCollection = await firebase.firestore().collection('users').get();
                const users = usersCollection.docs.map(doc => doc.data());
                const userCheck = users.filter(user => user.username === email_username);
                if(userCheck.length == 0) throw "Username does not exist!";
                try{
                    await firebase.auth().signInWithEmailAndPassword(userCheck[0].email, password)
                    console.log("Logged in with username🔥")
                }catch(error){
                    Alert.alert(error.message)
                }
            }catch(error){
                Alert.alert(error)
                console.log("Username error 👤")
            }
        }
    }catch(error){
        Alert.alert(error.message)
        console.log("Email error 📧")
    }
}

export default function LoginScreen({navigation}) {
    return (
        <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
            <Header navigation={navigation}/>
            <Text style={{fontSize: 27, fontWeight: '700', marginTop: 50, marginBottom: 20}}>Log in to Twitter</Text>
            <FormikLogin />
        </SafeAreaView>
    )
}

const Header = ({navigation}) => (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, width: '100%'}}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={{marginLeft: 20, width: 53}}><Text style={{color: 'rgb(0,150,240)', fontSize: 17}}>Cancel</Text></TouchableOpacity>
        <Image source={require('../assets/twitter-logo.png')} style={{width: 36, height: 36}}/>
        <TouchableOpacity style={{marginRight: 20, width: 50, alignItems:'flex-end'}}><Ionicons name='ellipsis-horizontal' size={20} style={{color: 'rgb(0,150,240)'}}/></TouchableOpacity>
    </View>
)

const FormikLogin = () => (
    <Formik 
        initialValues={{email_username: '', password: ''}}
        onSubmit={values => {
            onLogin(values.email_username, values.password);
        }}
        validationSchema = {LoginFormSchema}
        validateOnMount={true}
    >

    {({handleChange, handleBlur, handleSubmit, values, isValid}) => (
        <View style={{width: '100%', flex: 1}}>
            <TextInput 
            style={[styles.textInput, {
                borderColor: values.email_username.length < 5 && values.email_username.length > 0 ? 'red' : '#eee'
            }]} 
            placeholder='Email or username' 
            autoCapitalize='none'
            keyboardType='email-address'
            textContentType='emailAddress'
            autoFocus={true}
            onChangeText={handleChange('email_username')}
            onBlur={handleBlur('email_username')}
            value={values.email_username}
            />
            <TextInput 
            style={[styles.textInput, {borderColor: values.password.length < 8 && values.password.length > 0 ? 'red' : '#eee'}]} 
            placeholder='Password' 
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={true}
            textContentType='password'
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            />

            <View style={{position: 'absolute', 
            bottom: 0, 
            borderTopWidth: 1, 
            borderColor: '#eee', 
            width: '100%', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            flexDirection: 'row',
            paddingVertical: 6,
            paddingHorizontal: 15}}>
                <TouchableOpacity>
                    <Text style={{color: 'rgb(0,150,240)', fontSize: 15}}>Forgot password?</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={handleSubmit} style={{backgroundColor: isValid ? 'rgb(0,150,240)':'#ccc', borderRadius: 100, paddingVertical: 8, paddingHorizontal: 15}}>
                    <Text style={{color: '#fff', fontWeight: '700'}}>Log in</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )}
    </Formik>
)

const styles = StyleSheet.create({
    textInput: {
        marginTop: 20,
        fontSize: 15,
        borderBottomWidth: 1,
        marginHorizontal: 20,
        borderColor: '#eee',
        paddingBottom: 10,
    }
})