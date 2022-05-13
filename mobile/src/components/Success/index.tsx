import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import successImg from '../../assets/success.png'

import { Copyright } from '../Copyright';

import { styles } from './styles';

interface Props{
  onRequestNewFeedback: ()=>void;
}

export function Success({onRequestNewFeedback}:Props){
  return(
    <View style={styles.container}>
      <Image source={successImg} style={styles.image}/>
      <Text style={styles.title}>
        Agradecemos o feedback
      </Text>
      <TouchableOpacity onPress={onRequestNewFeedback} style={styles.button}>
        <Text style={styles.buttonTitle}>
          Quero enviar outro
        </Text>
      </TouchableOpacity>
      <Copyright/>
    </View>
  )
}