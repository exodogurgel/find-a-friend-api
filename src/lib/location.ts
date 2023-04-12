import { titleize } from '@/utils/titleize'
import axios from 'axios'

interface BrazilStateProps {
  id: number
  nome: string
  sigla: string
}

interface BrazilCityProps {
  name: string
  code: string
}

interface GeoLocationProps {
  address: string
  city: string
  coordinates: {
    longitude: string
    latitude: string
  }
}

async function getBrazilStates() {
  const response = await axios.get('https://brasilapi.com.br/api/ibge/uf/v1')

  return response.data as BrazilStateProps[]
}

async function getBrazilCitiesByState(
  UFCode: string,
): Promise<BrazilCityProps> {
  const response = await axios.get(
    `https://brasilapi.com.br/api/ibge/municipios/v1/${UFCode}`,
  )

  return response.data.map((city: any) => ({
    name: titleize(city.nome),
    code: city.codigo_ibge,
  }))
}

async function getGeoLocationByCEP(cep: string): Promise<GeoLocationProps> {
  const response = await axios.get(`https://brasilapi.com.br/api/cep/v2/${cep}`)

  return {
    address: response.data.street,
    city: response.data.city,
    coordinates: {
      latitude: response.data.location.coordinates.latitude,
      longitude: response.data.location.coordinates.longitude,
    },
  }
}

export { getBrazilStates, getBrazilCitiesByState, getGeoLocationByCEP }
