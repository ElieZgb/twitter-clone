import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, ScrollView, Text } from 'react-native'
import BottomTab from '../components/BottomTab';
import Header from '../components/Header';
import Tweet from '../components/Tweet'
import local_tweets from '../data/tweets';
import { db } from '../firebase';

export default function HomeScreen({navigation}) {
    const [tweets, setTweets] = useState(local_tweets);

    useEffect(()=>{
        db.collectionGroup('tweets').onSnapshot(snapshot => {
            console.log(snapshot.docs.map(doc => doc.data()));
            setTweets(snapshot.docs.map(doc => doc.data()))
        })
    }, [])

    return (
        <View style={{backgroundColor: '#fff', flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
            <Header />
            <ScrollView vertical showsVerticalScrollIndicator={false} style={{backgroundColor: '#fff'}}>
                {tweets.map((tweet, index) => (<Tweet tweet={tweet} key={index} />))}
            </ScrollView>
            <BottomTab navigation={navigation}/>
        </SafeAreaView>
        </View>
    )
}
