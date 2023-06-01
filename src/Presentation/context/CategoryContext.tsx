import { ImagePickerAsset } from "expo-image-picker";
import { Category } from "../../Domain/entities/Category";
import { ResponseAPIDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { createContext, useEffect, useState } from 'react'
import { GetAllCaregoryUseCase } from "../../Domain/useCases/category/GetAllCaregory";
import { CreateCategoryUseCase } from "../../Domain/useCases/category/CreateCategory";
import { UpdateCategoryUseCase } from "../../Domain/useCases/category/UpdateCategory";
import { UpdateWithImageCategoryUseCase } from "../../Domain/useCases/category/UpdateWithImageCategory";
import { DeleteCategoryUseCase } from "../../Domain/useCases/category/DeleteCategory";

export interface CategoryContextProps {
    categories: Category[],
    getCategories(): Promise<void>,
    create(category: Category, file: ImagePickerAsset): Promise<ResponseAPIDelivery>,
    update(category: Category): Promise<ResponseAPIDelivery>,
    updateWithImage(category: Category, file: ImagePickerAsset): Promise<ResponseAPIDelivery>,
    remove(idCateogires: string): Promise<ResponseAPIDelivery>,
}

export const CategoryContext = createContext( {} as CategoryContextProps)

export const CategoryProvider = ({children}: any) => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        if(categories.length === 0){
            getCategories();
        }
      }, []);

    const getCategories = async(): Promise<void> => {
        const result = await GetAllCaregoryUseCase();
        setCategories(result);
    }

    const create = async (category:Category, file: ImagePickerAsset): Promise<ResponseAPIDelivery> => {
        const response = await CreateCategoryUseCase(category, file!);
        getCategories();
        return response;
    }

    const update = async (category:Category): Promise<ResponseAPIDelivery> => {
        const response = await UpdateCategoryUseCase(category);
        getCategories();
        return response;
    }

    const updateWithImage = async (category:Category, file: ImagePickerAsset): Promise<ResponseAPIDelivery> => {
        const response = await UpdateWithImageCategoryUseCase(category, file);
        getCategories();
        return response;
    }

    const remove = async (idCategories: string): Promise<ResponseAPIDelivery> => {
        const response = await DeleteCategoryUseCase(idCategories);
        getCategories();
        return response;
    }

    return (
        <CategoryContext.Provider value={{
            categories,
            getCategories,
            create,
            update,
            updateWithImage,
            remove
        }}>
            {children}
        </CategoryContext.Provider>
    )
}