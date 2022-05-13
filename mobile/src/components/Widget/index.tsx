import React, { useRef,useState } from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native'
import BottomSheet from '@gorhom/bottom-sheet'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

import {styles} from './styles';
import { theme } from '../../theme';
import { Options } from '../Options';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Form } from '../Form';
import { Success } from '../Success';


export type FeedbackType = keyof typeof feedbackTypes;

function Widget(){
  const [ feedbackType,setFeedbacktype ] = useState<null | FeedbackType>(null);
  const  [ feedbackSent,setFeedbackSent ] = useState(false)

  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpen(){
    bottomSheetRef.current?.expand();
  }

  function handleRestartFeedback(){
    setFeedbacktype(null);
    setFeedbackSent(false);
  }
  
  function handleFeedbackSent(){
    setFeedbackSent(true);
  }

  return(
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={handleOpen}
      >
        <ChatTeardropDots
          size={24}
          color={theme.colors.text_on_brand_color}
          weight={'bold'}
        />
      </TouchableOpacity>
      <BottomSheet 
      ref={bottomSheetRef}
      snapPoints={[1,280]}
      backgroundStyle={styles.modal}
      handleIndicatorStyle={styles.indicator}
      >
        {
          feedbackSent 
          ?
            <Success onRequestNewFeedback={handleRestartFeedback}/>
          :
            feedbackType 
            ?
              <Form onFeedbackSent={handleFeedbackSent} onFeedbackCanceled={handleRestartFeedback} feedbackType={feedbackType}/>
            :
              <Options onFeedbacktypeChanged={setFeedbacktype} />
        }
      </BottomSheet>
    </>
  )
}

export default gestureHandlerRootHOC(Widget);