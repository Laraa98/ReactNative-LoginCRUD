import React, { useState } from 'react';
import { RegisterAuthUseCase } from '../../../Domain/useCases/auth/RegisterAuth';
import * as ImagePicker from 'expo-image-picker';
import { RegisterWithImageAuthUseCase } from '../../../Domain/useCases/auth/RegisterWithImageAut';
import { SaveUserLocalUseCase } from '../../../Domain/useCases/userLocal/SaveUserLocal';
import { useUserLocal } from '../../hooks/useUserLocal';

const RegisterViewModal = () => {

    const [errorMessage, seterrorMessage] = useState('');
  
    const [values, setValues] = useState({
        name: '',
        lastname: '',
        phone: '',
        email: '',
        image: '',
        password: '',
        confirmPassword: '',
    });

    const [loading, setLoading] = useState(false);

    const [file, setFile] = useState<ImagePicker.ImagePickerAsset>()
    const { user, getUserSession } = useUserLocal();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1
            
        });
        if(!result.canceled){
            onChange('image', result.assets[0].uri);
            setFile(result.assets[0]);
        }
    }
    /*
    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1
            
        });
        if(!result.cancelled){
            onChange('image', result.uri);
            setFile(result);
        }
    }
    */
    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value })
    }

    const register = async () => {
        if (isValidForm()){
            setLoading(true);
            //const response = await RegisterAuthUseCase(values);
            const response = await RegisterWithImageAuthUseCase(values, file!);
            setLoading(false);
            if(response.success){
                await SaveUserLocalUseCase(response.data);
                getUserSession();
                console.log('RESULT:' + JSON.stringify(response));
            }else {
                seterrorMessage(response.message);
            }
        }
    }

    const isValidForm = (): boolean => {
        if(values.name === ''){
            seterrorMessage('Ingresa tu nombre');
            return false;
        }
        if(values.lastname === ''){
            seterrorMessage('Ingresa tu apellido');
            return false;
        }
        if(values.email === ''){
            seterrorMessage('Ingresa tu correo electronico');
            return false;
        }
        if(values.phone === ''){
            seterrorMessage('Ingresa tu telefono');
            return false;
        }
        if(values.password === ''){
            seterrorMessage('Ingresa tu contraseña');
            return false;
        }
        if(values.confirmPassword === ''){
            seterrorMessage('Ingresa tu la confirmación de la contraseña');
            return false;
        }
        if(values.password !== values.confirmPassword){
            seterrorMessage('Las contraseñas no coinciden');
            return false;
        }
        if(values.image === ''){
            seterrorMessage("Seleccione una imagen");
            return false;
        }
        return true;
    }

    return {
        ...values, onChange, register, pickImage, errorMessage, user, loading
    }
}

export default RegisterViewModal;