import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import { RoundedButton } from './RoundedButton';

interface Props {
    openGallery: () => void,
    modalUseState: boolean
    setModalUseState: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalPickImage = ({ openGallery, setModalUseState, modalUseState }: Props) => {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalUseState}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalUseState(!modalUseState);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>Seleccióna una opcion</Text>
              <View style={styles.buttonContainer}>
                <RoundedButton onPress={ () => { openGallery(); setModalUseState(false)}} text='Galeria' />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      width: 250,
      height: 220,
      margin: 200,
      backgroundColor: 'white',
      borderRadius: 20,
      paddingTop: 35,
      paddingLeft: 25,
      paddingRight: 25,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    buttonContainer: {
        width: '100%',
        marginTop: 8
    }
  });

