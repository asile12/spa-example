import Prefecture from '../types/Prefecture'
import ResasApiResolved from '../types/ResasApiResolved'
import ResasApiRejected from '../types/ResasApiRejected'

type GetPrefecturesResponse<T> = ResasApiResolved<T> | ResasApiRejected

const getPrefectures = (): Promise<Prefecture[]> =>
   fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
      // headers: { 'X-API-KEY': '12a0MPNxb34FMGFokCeJ2eFNkBIndLCe9s9liRV' }, // reject test
      headers: { 'X-API-KEY': '12a0MPNxb34FMGFokCeJ2eFNkBIndLCe9s9liRVb' },
   })
      .then(response => {
         return response.json() as Promise<GetPrefecturesResponse<Prefecture>>
      })
      .then(
         jsonResponse =>
            new Promise((resolve, reject) => {
               if ('statusCode' in jsonResponse) {
                  reject(jsonResponse)
               } else {
                  resolve(jsonResponse.result)
               }
            })
      )

export default getPrefectures
