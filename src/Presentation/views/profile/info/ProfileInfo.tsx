import React, { useEffect } from 'react'
import { Button, Text, View, Image, Pressable } from 'react-native'
import useViewModel from './ViewModel';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigator/MainStackNavigator';
import styles from './Styles';
import { useNavigation } from '@react-navigation/native';
import { RoundedButton } from '../../../components/RoundedButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const ProfileInfoScreen = () => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { removeUserSession, user } = useViewModel();

  useEffect(() => {
    if(user.idUsers == ''){
      navigation.replace('HomeScreen');
    }
  }, [user])
  

  return (
  <View style={ styles.container }>
    <Image source={ require('../../../../../assets/chef.jpg') } style={ styles.imageBackground }/>

    <Pressable 
      style={ styles.logout } 
      onPress={ () => { 
        removeUserSession(); 
      }}>
      <Image source={ require('../../../../../assets/logout.png') } style={ styles.logoutImage }/>
    </Pressable>
    
    <View style={ styles.logoContainer }>
      { user?.image !== '' && 
        <Image source={{ uri: user?.image }} style={ styles.logoImage } />
      }
    </View>

    <View style={ styles.form }>
      <View style={ styles.formInfo }>
        <Image source={ require('../../../../../assets/user.png') } style={ styles.formImage }/>
        <View style={ styles.formContent }>
          <Text>{ user?.name } { user?.lastname }</Text>
          <Text style={ styles.formTextDescription }>Nombre del usuario</Text>
        </View>
      </View>

      <View style={ {...styles.formInfo, marginTop: 25} }>
        <Image source={ require('../../../../../assets/email.png') } style={ styles.formImage }/>
        <View style={ styles.formContent }>
          <Text>{ user?.email }</Text>
          <Text style={ styles.formTextDescription }>Correo electronico</Text>
        </View>
      </View>

      <View style={ {...styles.formInfo, marginTop: 25, marginBottom: 70} }>
        <Image source={ require('../../../../../assets/phone.png') } style={ styles.formImage }/>
        <View style={ styles.formContent }>
          <Text>{ user?.phone }</Text>
          <Text style={ styles.formTextDescription }>Telefono</Text>
        </View>
      </View>

      <RoundedButton onPress={() => { navigation.navigate('ProfileUpdateScreen', { user: user! }) }} text='Actualizar Informacion'/>
    </View>

  </View>
  )
}

    {/*</View><Button title='Cerrar Sesion' onPress={() => {
      removeSession();
      navigation.navigate('HomeScreen');
    }} />*/}
