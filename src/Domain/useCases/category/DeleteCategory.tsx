import React from 'react'
import { CategoryRepositoryImpl } from '../../../Data/repositories/CaregoryRepository'
import { Category } from '../../entities/Category';
import { ImagePickerAsset } from 'expo-image-picker';
const { remove } = new CategoryRepositoryImpl();

export const DeleteCategoryUseCase = async (idCategories: string) => {
  return await remove(idCategories);
}
