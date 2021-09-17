import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Animated, Easing } from 'react-native'
import LottieView from 'lottie-react-native'

import checkJson from '../../assets/check.json'
import submitJson from '../../assets/submit.json'

export interface HomeScreenProps {
}

const size = Dimensions.get('window').width * 0.5

const HomeScreen = () => {
    const [repeating, setRepeating] = useState(false)
    const animation = useRef<LottieView>(null)
    const progress = useRef(new Animated.Value(0)).current

    useEffect(() => {
        animation.current?.play()
    }, [])

    const startRepeating = () => {
        if (!repeating) {
            setRepeating(true)
            animation.current?.reset()
            animation.current?.play(75, 120)
        }
    }

    const send = () => {
        Animated.timing(progress, {
            toValue: 1,
            duration: 12000,
            useNativeDriver: false,
            easing: Easing.bezier(0.33, 1, 0.68, 1)
        }).start()
    }

    return (
        <View style={styles.container}>
            <LottieView source={checkJson} ref={animation} style={{width: size, height: size}} 
                 loop={repeating} onAnimationFinish={startRepeating} resizeMode='contain' />
            <TouchableOpacity onPress={send}>
                <LottieView source={submitJson} progress={progress} style={{width: size, height: size}} 
                     resizeMode='contain' />
            </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default HomeScreen