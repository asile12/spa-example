import Prefecture from '../types/Prefecture'

interface GetPrefecturesResponse {
   message: string
   result: Prefecture[]
}

const getPrefectures = (): Promise<GetPrefecturesResponse> =>
   fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
      // headers: { 'X-API-KEY': '12a0MPNxb34FMGFokCeJ2eFNkBIndLCe9s9liRV' }, // reject test
      headers: { 'X-API-KEY': '12a0MPNxb34FMGFokCeJ2eFNkBIndLCe9s9liRVb' },
   }).then(response => {
      return response.json()
   })

export default getPrefectures
