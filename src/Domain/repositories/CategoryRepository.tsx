import { ImagePickerAsset } from "expo-image-picker";
import { ResponseAPIDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { Category } from "../entities/Category";

export interface CategoryRepository {
    getAll(): Promise<Category[]>;
    create(category: Category, file: ImagePickerAsset): Promise<ResponseAPIDelivery>;
    update(category: Category): Promise<ResponseAPIDelivery>;
    updateWithImage(category: Category, file: ImagePickerAsset): Promise<ResponseAPIDelivery>;
    remove(idCateogires: string): Promise<ResponseAPIDelivery>;
}