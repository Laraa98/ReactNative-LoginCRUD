import React, { useState, useContext } from 'react'
import { Category } from '../../../../../Domain/entities/Category';
import { GetAllCaregoryUseCase } from '../../../../../Domain/useCases/category/GetAllCaregory';
import { DeleteCategoryUseCase } from '../../../../../Domain/useCases/category/DeleteCategory';
import { CategoryContext } from '../../../../context/CategoryContext';

const AdminCategoryListViewModel = () => {
  
    const [responseMessage, setResponseMessage] = useState('');

    const { categories, getCategories, remove } = useContext( CategoryContext );

    const deleteCatregory = async (idCategories: string) => {
        const result = await remove(idCategories);
        setResponseMessage(result.message);
    }
  
    return { categories, responseMessage, deleteCatregory, getCategories }
}

export default AdminCategoryListViewModel;