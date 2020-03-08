import PopulationComposition from '../types/PopulationComposition'
import ResasApiRejected from '../types/ResasApiRejected'
import ResasApiResolved from '../types/ResasApiResolved'

type GetPopulationResponse<T> = ResasApiResolved<T> | ResasApiRejected

interface GetPopulationResult {
   boundaryYear: number
   data: PopulationComposition[]
}

const getPopulation = (prefCode: number): Promise<GetPopulationResult[]> =>
   fetch(
      `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
      {
         // headers: { 'X-API-KEY': '12a0MPNxb34FMGFokCeJ2eFNkBIndLCe9s9liRV' }, // reject test
         headers: { 'X-API-KEY': '12a0MPNxb34FMGFokCeJ2eFNkBIndLCe9s9liRVb' },
      }
   )
      .then(response => {
         return response.json() as Promise<GetPopulationResponse<GetPopulationResult>>
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

export default getPopulation
