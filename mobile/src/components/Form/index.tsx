import React, { useState } from 'react';
import { View,TextInput,Image,Text,TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot'
import * as FileSystem from 'expo-file-system';

import {api} from '../../libs/api'

import { FeedbackType } from '../Widget'

import { theme } from '../../theme';
import { styles } from './styles';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';

interface Props{
  feedbackType: FeedbackType;
  onFeedbackCanceled: ()=>void;
  onFeedbackSent: ()=>void;
}

export function Form({feedbackType,onFeedbackCanceled,onFeedbackSent}:Props) {
  const [ comment, setComment ] = useState("")
  const [ isSendingFeedback, setIsSendFeedback ] = useState(false)
  const [screenshot,setScreenshot] = useState<string | null>(null)

  const feedbackTypeInfo = feedbackTypes[feedbackType]

  function handleScreenshot(){
    captureScreen({
      format: 'jpg',
      quality: 0.8
    })
    .then(uri => setScreenshot(uri))
    .catch(error => console.log(error))
  }

  function handleScreenshotRemove(){
    setScreenshot(null)
  }

  async function handleSendFeedback(){
    if(isSendingFeedback)
      return

    setIsSendFeedback(true);

    const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot,{encoding:'base64'});

    try{
      await api.post('feedbacks',{
        type: feedbackType,
        screenshot:`data:image/png;base64,${screenshotBase64}`,
        comment
      })

      onFeedbackSent();
    }catch(error){
      console.log(error);
      setIsSendFeedback(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image 
            style={styles.image}
            source={feedbackTypeInfo.image}
          />
          <Text style={styles.titleText}>
            {feedbackTypeInfo.title}
          </Text>
        </View>
      </View>

      <TextInput
        multiline
        style={styles.input}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
        onChangeText={setComment}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          onTakenShot={handleScreenshot}
          onRemoveShot={handleScreenshotRemove}
          screenshot={screenshot}
        />
        <Button onPress={handleSendFeedback} isLoading={isSendingFeedback} />
      </View>

    </View>
  )
}