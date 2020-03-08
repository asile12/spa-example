import PopulationComposition from '../types/PopulationComposition'
import PopulationNumber from '../types/PopulationNumber'
import { ResasResponse } from '../types/aliases'

interface GetPopulationResult {
   boundaryYear: number
   data: PopulationComposition[]
}

const getPopulation = (prefCode: number): Promise<PopulationNumber[]> =>
   fetch(
      `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
      {
         // headers: { 'X-API-KEY': '12a0MPNxb34FMGFokCeJ2eFNkBIndLCe9s9liRV' }, // reject test
         headers: { 'X-API-KEY': '12a0MPNxb34FMGFokCeJ2eFNkBIndLCe9s9liRVb' },
      }
   )
      .then(response => {
         return response.json() as Promise<ResasResponse<GetPopulationResult>>
      })
      .then(
         jsonResponse =>
            new Promise((resolve, reject) => {
               if ('statusCode' in jsonResponse) {
                  reject(jsonResponse)
               } else {
                  const generalPopulationData = jsonResponse.result.data.find(
                     record => record.label === '総人口'
                  )
                  if (generalPopulationData !== undefined) {
                     resolve(generalPopulationData.data)
                  } else {
                     reject(jsonResponse)
                  }
               }
            })
      )

export default getPopulation
