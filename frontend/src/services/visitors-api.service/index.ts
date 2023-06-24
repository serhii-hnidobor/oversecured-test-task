import axios from 'axios'
import type {
  GetAllVisitorResponseDto,
  GetVisitorResponseDto,
  AddVisitorRequestDto,
  EditVisitorRequestDto
} from '@/common/index'

type Constructor = {
  apiPrefix: string
}

class VisitorsApi {
  readonly #apiPrefix: string

  constructor({ apiPrefix }: Constructor) {
    this.#apiPrefix = apiPrefix
  }

  public getAll() {
    return axios.get<GetAllVisitorResponseDto>(
      `${this.#apiPrefix}${import.meta.env.VITE_VISITOR_API_PATH}${
        import.meta.env.VITE_GET_ALL_VISITORS_ROUTE
      }`
    )
  }

  public getById(id: string) {
    return axios.get<GetVisitorResponseDto>(
      `${this.#apiPrefix}${import.meta.env.VITE_VISITOR_API_PATH}${
        import.meta.env.VITE_GET_VISITOR_BY_ID_ROUTE
      }/${id}`
    )
  }

  public delete(id: string) {
    return axios.delete<GetVisitorResponseDto>(
      `${this.#apiPrefix}${import.meta.env.VITE_VISITOR_API_PATH}${
        import.meta.env.VITE_DELETE_VISITOR_ROTUTE
      }/${id}`
    )
  }

  public update(data: EditVisitorRequestDto, id: string) {
    return axios.put<GetVisitorResponseDto>(
      `${this.#apiPrefix}${import.meta.env.VITE_VISITOR_API_PATH}${
        import.meta.env.VITE_UPDATE_VISITOR_ROUTE
      }/${id}`,
      data as Record<string, unknown>
    )
  }

  public create(data: AddVisitorRequestDto) {
    return axios.post(
      `${this.#apiPrefix}${import.meta.env.VITE_VISITOR_API_PATH}${
        import.meta.env.VITE_CREATE_VISITOR_ROUTE
      }`,
      data
    )
  }
}

export { VisitorsApi }
