import axios from 'axios'
import { Contact, Map, Offer, User } from './types'

axios.defaults.baseURL = 'https://www.trustroots.org/api'
axios.defaults.withCredentials = true

export const signin = async (username: string, password: string) => {
  const response = await axios.post(
    `/auth/signin`,
    { username, password },
    { withCredentials: true },
  )

  axios.defaults.headers.Cookie = response.headers['set-cookie'][0]
}

export const getMap = async (): Promise<Map> =>
  (
    await axios.get<Map>(
      '/offers?northEastLat=90&northEastLng=180&southWestLat=-90&southWestLng=-180',
    )
  ).data

export const getOffer = async (offerId: string): Promise<Offer> =>
  (await axios.get<Offer>(`/offers/${offerId}`)).data

export const user = async (username: string): Promise<User> =>
  (await axios.get<User>(`/users/${username}`)).data

export const contacts = async (id: string): Promise<Contact[]> =>
  (await axios.get<Contact[]>(`/contacts/${id}`)).data
