import { CategoryRepositoryImpl } from '../../../Data/repositories/CaregoryRepository'

const { getAll } = new CategoryRepositoryImpl();

export const GetAllCaregoryUseCase = async () => {
  return await getAll()
}
