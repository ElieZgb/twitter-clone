import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Divider } from 'react-native-elements'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export default function BottomTab({navigation}) {
    return (
        <View style={{zIndex: 500}}>
            <CreateTweetBtn navigation={navigation} />
            <Divider width={1} orientation='vertical' />
            <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, backgroundColor: '#fff'}}>
                <Icon name='home' />
                <Icon name='search' />
                <Icon name='bell' />
                <View>
                    <Icon name='mail' />
                    <View style={{position: 'absolute', top:-5, right: -7,backgroundColor: 'rgb(0,150,240)', borderRadius: 100, width: 20, height: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#fff'}}><Text style={{color: '#fff', fontWeight: '700'}}>1</Text></View>
                </View>
            </View>
        </View>
    )
}

const Icon = ({name}) => (
    <Feather name={name} size={27} style={{color: '#000'}} />
)

const CreateTweetBtn = ({navigation}) => (
    <TouchableOpacity activeOpacity={1} onPress={()=>navigation.push('Tweet upload screen')}>
        <View style={[styles.newTweetBtn, styles.shadowProp]}>
            <FontAwesome5 name='plus' size={11} style={{color: '#fff', position: 'absolute', top: 18, left: 15}}/>
            <Image source={require('../assets/feather.png')} style={{width: 36, height: 36, resizeMode: 'contain', position: 'absolute', top: 15, right: 8}} />
        </View>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    newTweetBtn: {
        width: 60, 
        height: 60, 
        backgroundColor: 'rgb(0,150,240)', 
        borderRadius: 100, 
        position: 'absolute', 
        top: -70, 
        right: 10, 
        zIndex: 1000, 
        alignItems: 'center',
        justifyContent: 'center'  
    },
    shadowProp: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 4,
      }
})