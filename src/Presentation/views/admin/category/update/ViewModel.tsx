import React, { useState, useContext } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { UpdateCategoryUseCase } from '../../../../../Domain/useCases/category/UpdateCategory';
import { Category } from '../../../../../Domain/entities/Category';
import { UpdateWithImageCategoryUseCase } from '../../../../../Domain/useCases/category/UpdateWithImageCategory';
import { ResponseAPIDelivery } from '../../../../../Data/sources/remote/models/ResponseApiDelivery';
import { CategoryContext } from '../../../../context/CategoryContext';

export const AdminCategoryUpdateViewModel = (categories: Category) => {

    const [responseMessage, setResponseMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<ImagePicker.ImagePickerAsset>();
    const { update, updateWithImage } = useContext(CategoryContext);
  
    const [values, setValues] = useState({
        idCategories: categories.idCategories,
        name: categories.name,
        description: categories.description,
        image: categories.image
    });

    const onChange = (propierty: string, value: any) => {
        setValues({ ...values, [propierty]: value })
    }

    const updateCategory = async () => {
        setLoading(true);
        let response = {} as ResponseAPIDelivery;
        if(values.image?.includes('https://')){
            response = await update(values)
        }else  {
            response = await updateWithImage(values, file!);
        }
        setLoading(false);
        setResponseMessage(response.message);
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

    return { ...values, onChange, pickImage, updateCategory, loading, responseMessage }
}

export default AdminCategoryUpdateViewModel