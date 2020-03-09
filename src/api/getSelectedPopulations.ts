import Prefecture from '../types/Prefecture'
import getPopulation from './getPopulation'
import PopulationData from '../types/PopulationData'

const getSelectedPopulations = (selectedPrefectures: Prefecture[]): Promise<PopulationData[]> => {
   const getPopulations = selectedPrefectures.map(pref => getPopulation(pref.prefCode))

   return Promise.all(getPopulations).then(
      data =>
         new Promise(resolve => {
            if (data.length < 1) {
               resolve([])
            } else {
               const reducedDataForGraph = data[0].map((populationPerYear, yearIndex) => {
                  const prefPopulations = data.reduce((accumulator, prefectureData, prefIndex) => {
                     if (prefectureData[yearIndex].year !== populationPerYear.year) {
                        throw new Error('data arrays are not aligned')
                     } else {
                        return {
                           ...accumulator,
                           [selectedPrefectures[prefIndex].prefCode]:
                              prefectureData[yearIndex].value,
                        }
                     }
                  }, {})
                  return {
                     year: populationPerYear.year,
                     ...prefPopulations,
                  }
               })
               resolve(reducedDataForGraph)
            }
         })
   )
}
export default getSelectedPopulations
