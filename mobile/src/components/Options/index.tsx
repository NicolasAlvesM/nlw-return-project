import React from 'react';
import { View, Text } from 'react-native'
import { Copyright } from '../Copyright';
import { Option } from '../Option';

import {feedbackTypes} from '../../utils/feedbackTypes'
import { styles } from './styles';
import { FeedbackType } from '../Widget';

interface Props{
  onFeedbacktypeChanged:(feedbackType: FeedbackType)=>void;
}

export function Options({ onFeedbacktypeChanged }:Props){
  return(
    <View style={styles.container}>
      <Text style={styles.title}>
        Deixe seu feedback
      </Text>
      <View style={styles.options}>
        {
          Object.entries(feedbackTypes).map(([key, value]) => (
            <Option onPress={()=>onFeedbacktypeChanged(key as FeedbackType)} title={value.title} image={value.image} key={key} />
          ))
        }
      </View>
      <Copyright/>
    </View>
  )
}