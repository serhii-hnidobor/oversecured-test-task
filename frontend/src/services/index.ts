import { VisitorsApi } from '@/services/visitors-api.service'

const visitorApi = new VisitorsApi({ apiPrefix: import.meta.env.VITE_BACKEND_URL })

export { visitorApi }
