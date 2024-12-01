import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'

import type { PropsWithChildren } from 'react'

type CurrencyBtnProps = PropsWithChildren< {
    name: string, 
    flag: string, 
    symbol: string, 
    value: number
}>

const CurrencyButton = (props: CurrencyBtnProps): JSX.Element => {
    return (
        <View style={styles.buttonContainer}>
            <Text style={styles.flag}>{props.flag}</Text>
            <Text style={styles.name}>{props.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center'
    }, 
    flag: {
        fontSize: 28, 
        color: '#ffffff', 
        marginBottom: 8
    }, 
    name: {
        fontSize: 16, 
        color: '#000000', 
        textAlign: 'center'
    }
})

export default CurrencyButton