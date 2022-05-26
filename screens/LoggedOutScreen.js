import React from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'

export default function LoggedOut({navigation}) {
    return (
        <SafeAreaView style={{alignItems: 'center', justifyContent: 'space-between', flex: 1}}>
            <Image source={require('../assets/twitter-logo.png')} style={{width: 36, height: 36, marginTop: 10}}/>
            <View style={{marginHorizontal: 15}}>
                <Text style={{fontSize: 36, fontWeight: '600'}}>See what's happening in the world right now.</Text>
                <TouchableOpacity onPress={()=>navigation.push('Create account screen')} style={{backgroundColor: 'rgb(0,150,240)', borderRadius: 100, paddingVertical: 15, marginTop: 30}}>
                    <Text style={{fontSize: 20, color: '#fff', fontWeight: '700', textAlign: 'center'}}>Create account</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 30, paddingLeft: 30, width: '100%'}}>
                <Text>Have an account already?</Text>
                <TouchableOpacity onPress={()=>navigation.push('Login screen')}><Text style={{fontWeight: '600', color: 'rgb(0,150,240)'}}> Log in</Text></TouchableOpacity>
            </View>                

        </SafeAreaView>
    )
}
