import React, { useState, useContext } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { CreateCategoryUseCase } from '../../../../../Domain/useCases/category/CreateCategory';
import { CategoryContext } from '../../../../context/CategoryContext';

export const AdminCategoryCreateViewModel = () => {

    const [responseMessage, setResponseMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<ImagePicker.ImagePickerAsset>();
    const { create } = useContext(CategoryContext)
  
    const [values, setValues] = useState({
        name: '',
        description: '',
        image: ''
    });

    const onChange = (propierty: string, value: any) => {
        setValues({ ...values, [propierty]: value })
    }

    const createCategory = async () => {
        if(isValidForm()){
            setLoading(true);
            const response = await create(values, file!)
            setLoading(false);
            if(response.success){
                setResponseMessage(response.message);
                resetForm();
            }else {
                setResponseMessage(response.message);
            }
        }
    }

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

    const resetForm = async () => {
        setValues({
            name: '',
            description: '',
            image: ''
        })
    }

    const isValidForm = (): boolean => {
        if(values.name === ''){
            setResponseMessage('Ingresa el nombre de la categoria');
            return false;
        }
        if(values.description === ''){
            setResponseMessage('Ingresa la descripcion de la categoria');
            return false;
        }
        if(values.image === ''){
            setResponseMessage("Seleccione una imagen");
            return false;
        }
        return true;
    }

    return { ...values, onChange, pickImage, createCategory, loading, responseMessage }
}

export default AdminCategoryCreateViewModel