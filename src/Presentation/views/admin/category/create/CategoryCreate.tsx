import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator, ToastAndroid,  } from 'react-native'
import styles from './styles';
import { CustomTextInput } from '../../../../components/CustomTextInput';
import useviewModel from './ViewModel';
import { RoundedButton } from '../../../../components/RoundedButton';
import { ModalPickImage } from '../../../../components/ModalPickImage';
import { MyColors, MyStyles } from '../../../../theme/AppTheme';

export const AdminCategoryCreateScreen = () => {

    const { name, description, image, loading, responseMessage, pickImage, onChange, createCategory } = useviewModel();
    const [ modalVisible, setModalVisible ] = useState(false);

    useEffect(() => {
      if(responseMessage != ''){
        ToastAndroid.show(responseMessage, ToastAndroid.LONG);
      }
    }, [responseMessage])
    

  return (
    <View style={ styles.container }>
        <TouchableOpacity style={ styles.imageContainer } onPress={() => setModalVisible(true)}>
            { image == '' 
                ? <Image style={ styles.image} source={ require('../../../../../../assets/image_new.png') }/>
                : <Image source={{ uri: image }} style={ styles.image } />
            }
        </TouchableOpacity>
        <View style={ styles.form }>
            <CustomTextInput 
                placeholder='Nombre de la categoria'
                image={ require('../../../../../../assets/categories.png') }
                keyboardType='default'
                property='name'
                value={ name }
                onChangeText={ onChange }
            />
            <CustomTextInput 
                placeholder='Descripcion'
                image={ require('../../../../../../assets/description.png') }
                keyboardType='default'
                property='description'
                value={ description }
                onChangeText={ onChange }
            />
        </View>
        <View style={ styles.buttonContainer }>
            <RoundedButton text='CREAR CATEGORIA' onPress={() => createCategory()}/>
        </View>
        <ModalPickImage openGallery={ pickImage } modalUseState={ modalVisible } setModalUseState={ setModalVisible }/>
          {
            loading &&
            <ActivityIndicator style={MyStyles.loading} size="large" color={ MyColors.primary } />
          }
    </View>
  );
}
