import { ImagePickerAsset } from "expo-image-picker";
import { Category } from '../../Domain/entities/Category';
import { CategoryRepository } from "../../Domain/repositories/CategoryRepository";
import { ApiDelivery, ApiDeliveryForImage } from "../sources/remote/api/ApiDelivery";
import { ResponseAPIDelivery } from "../sources/remote/models/ResponseApiDelivery";
import mime from 'mime';
import { AxiosError } from "axios";

export class CategoryRepositoryImpl implements CategoryRepository {

    async getAll(): Promise<Category[]> {
        try {
            const response = await ApiDelivery.get<Category[]>('/categories/getAll');
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log("ERROR: " + JSON.stringify(e.response?.data));
            return Promise.resolve([]);
        }
    }

    async create(category: Category, file: ImagePickerAsset): Promise<ResponseAPIDelivery> {
        try {
            let data = new FormData();
            data.append('image', {
                uri: file.uri,
                // @ts-ignore
                name: file.uri.split('/').pop(),
                type: mime.getType(file.uri)!
            });
            data.append('category', JSON.stringify(category));
            const response = await ApiDeliveryForImage.post<ResponseAPIDelivery>('/categories/create', data);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log("ERROR: " + JSON.stringify(e.response?.data));
            const apiError:ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError);
        }
    }
    async update(category: Category): Promise<ResponseAPIDelivery> {
        try {
            const response = await ApiDelivery.put<ResponseAPIDelivery>('/categories/update', category);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log("ERROR: " + JSON.stringify(e.response?.data));
            const apiError:ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError);
            
        }
    }
    async updateWithImage(category: Category, file: ImagePickerAsset): Promise<ResponseAPIDelivery> {
        try {
            let data = new FormData();
            data.append('image', {
                uri: file.uri,
                // @ts-ignore
                name: file.uri.split('/').pop(),
                type: mime.getType(file.uri)!
            });
            data.append('category', JSON.stringify(category));
            const response = await ApiDeliveryForImage.put<ResponseAPIDelivery>('/categories/updateWithImage', data);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log("ERROR: " + JSON.stringify(e.response?.data));
            const apiError:ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError);
        }
    }
    async remove(idCateogires: string): Promise<ResponseAPIDelivery> {
        try {
            const response = await ApiDelivery.delete<ResponseAPIDelivery>(`/categories/delete/${idCateogires}`);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log("ERROR: " + JSON.stringify(e.response?.data));
            const apiError:ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError);
        }
    }
}