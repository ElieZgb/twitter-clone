import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function TweetFooter({tweet}) {
    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
            <Icon name='comment' value={tweet.comments} />
            <Icon name='retweet' value={tweet.retweet} />
            <Icon name='heart' value={tweet.likes} />
            <Icon name='share' />
        </View>
    )
}

const Icon = ({name, value}) => (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity>
            <FontAwesome5 name={name} size={20} style={{color: '#bbb'}}/>
        </TouchableOpacity>
        <Text style={{color: '#bbb', marginLeft: 5}}>{value}</Text>
    </View>
)