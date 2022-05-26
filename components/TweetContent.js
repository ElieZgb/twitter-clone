import React from 'react'
import { View, Text, Image } from 'react-native'

export default function TweetContent({tweet}) {
    return (
        <View style={{marginTop: -2}}>
            {tweet.tweet_text.length > 1 ? <Text style={{color:'#000'}}>{tweet.tweet_text}</Text> : null}
            {tweet.tweet_picture_url.length > 1 ? <Image source={{uri: tweet.tweet_picture_url}} style={{width: '100%', height: 250, resizeMode: 'center', marginTop: 5, borderRadius: 5}}/> : null}
        </View>
    )
}
