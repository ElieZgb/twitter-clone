import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import TweetContent from './TweetContent'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TweetFooter from './TweetFooter';
import { Divider } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Tweet({tweet}) {
    return (
        <View style={{marginTop: 15}}>
            {tweet.type.length > 1 ? <View style={{paddingLeft: 60, flexDirection: 'row', alignItems: 'center'}}><FontAwesome name='commenting' size={12} style={{color: '#888', marginRight: 8}}/><Text style={{fontWeight: '500', color: '#888'}}>{tweet.type}</Text></View> : null}
            <View style={{flexDirection: 'row', backgroundColor: '#fff', paddingHorizontal: 20, paddingBottom: 15}}>
                <View>
                    <Image source={{uri: tweet.profile_picture}} style={{width: 50, height: 50, borderRadius: 100}}/>
                </View>
                <View style={{flex: 1, paddingLeft: 10}}>
                    <TweetHeader tweet={tweet}/>
                    <TweetContent tweet={tweet}/>
                    <TweetFooter tweet={tweet}/>
                </View>
            </View>
            <Divider width={1} orientation='vertical' />
        </View>
    )
}

const TweetHeader = ({tweet}) => (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{alignItems: 'center', flexDirection: 'row', overflow: 'hidden', flex: 1, paddingRight: 5}}>
            <Text style={{color: '#000', fontWeight: 'bold'}}>{tweet.user} </Text>
            {tweet.verified ? <MaterialIcons name='verified' size={15} style={{color: 'rgb(0,150,240)', marginRight: 3}}/> : null}
            <Text style={{color: '#888', fontWeight:'300', flex: 1}} numberOfLines={1}>@{tweet.username}</Text>
        </View>
        <TouchableOpacity><Ionicons name='ellipsis-horizontal' size={20} style={{color: '#bbb'}}/></TouchableOpacity>
    </View>
)