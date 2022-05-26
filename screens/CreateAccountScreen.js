import { Formik } from 'formik';
import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet, TextInput, Button, Alert } from 'react-native'
import * as Yup from 'yup';
import Validator from 'email-validator';
import { firebase } from '../firebase';

const createAccountSchema = Yup.object().shape({
    email: Yup.string().email().required('email is required'),
    password: Yup.string().required().min(8, 'Your password has to have at least 8 characters'),
    username: Yup.string().required('username is required'),
    accountName: Yup.string().required('account name is required')
})

const onCreateAccount = async(email, password, username, accountName, navigation) => {
    try{
        const usersCollection = await firebase.firestore().collection('users').get();
        const users = usersCollection.docs.map(doc => doc.data());
        const emailCheck = users.filter(user => user.email === email);
        if(emailCheck.length != 0) throw "This email is already registered";
        
        try{
            const usernameCheck = users.filter(user => user.username === username)
            if(usernameCheck.length != 0) throw "Username is taken!";
            navigation.push('Signup screen', {username: username, email: email, password: password, accountName: accountName});
        }catch(error){
            Alert.alert(error)
        }
    }catch(error){ 
        Alert.alert(error);
    }
}

export default function CreateAccountScreen({navigation}) {
    return (
        <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
            <Header navigation={navigation}/>
            <Text style={{fontSize: 27, fontWeight: '700', marginTop: 50, marginBottom: 20}}>Create your account</Text>
            <FormikCreateAccount navigation={navigation}/>
        </SafeAreaView>
    )
}

const Header = ({navigation}) => (
    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, width: '100%'}}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={{position: 'absolute', left: 20}}><Text style={{color: 'rgb(0,150,240)', fontSize: 17}}>Cancel</Text></TouchableOpacity>
        <Image source={require('../assets/twitter-logo.png')} style={{width: 36, height: 36}}/>
    </View>
)

const FormikCreateAccount = ({navigation}) => (
    <Formik 
        initialValues={{username: '', email: '', password: '', accountName: ''}}
        onSubmit={values => {
            onCreateAccount(values.email, values.password, values.username, values.accountName, navigation);
        }}
        validationSchema = {createAccountSchema}
        validateOnMount={true}
    >
    
        {({handleBlur, handleChange, handleSubmit, values, isValid}) => (
        <View style={{width: '100%', flex: 1}}>
            <View><TextInput 
            style={[styles.textInput, {paddingLeft: 15}]} 
            placeholder='username' 
            autoCapitalize='none'
            keyboardType='default'
            textContentType='username'
            autoFocus={true}
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
            />
            <Text style={{position: 'absolute', top: 21, left: 20, color: '#aaa'}}>@</Text>
            </View>
            <TextInput 
            style={styles.textInput} 
            placeholder="Type your account's name"
            autoCapitalize='none'
            keyboardType='ascii-capable'
            textContentType='name'
            autoFocus={false}
            onChangeText={handleChange('accountName')}
            onBlur={handleBlur('accountName')}
            value={values.accountName}
            />
            <TextInput 
            style={[styles.textInput, {
                borderColor: values.email.length < 1 || Validator.validate(values.email) ? '#eee' : 'red'
            }]} 
            placeholder='Email address' 
            autoCapitalize='none'
            keyboardType='email-address'
            textContentType='emailAddress'
            autoFocus={false}
            secureTextEntry={false}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            />
            <TextInput 
            style={[styles.textInput, {
                borderColor: values.password.length > 0 && values.password.length < 8 ? 'red' : '#eee'
            }]} 
            placeholder='Password' 
            autoCapitalize='none'
            keyboardType='default'
            textContentType='none'
            autoFocus={false}
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            />
            <View style={{position: 'absolute', 
            bottom: 0, 
            borderTopWidth: 1, 
            borderColor: '#eee', 
            width: '100%', 
            alignItems: 'flex-end',
            paddingVertical: 6,
            paddingHorizontal: 15}}>
                <TouchableOpacity onPress={handleSubmit} style={{backgroundColor: isValid ? 'rgb(0,150,240)':'#ccc', borderRadius: 100, paddingVertical: 8, paddingHorizontal: 15}}>
                    <Text style={{color: '#fff', fontWeight: '700'}}>Next</Text>
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