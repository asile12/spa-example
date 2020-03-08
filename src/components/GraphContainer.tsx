import React, { useState, useEffect } from 'react'
import { StyledGraphContainer } from '../style'
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'
import getPopulation from '../api/getPopulation'
import CustomTooltip from './CustomTooltip'
import { PrefCode } from '../types/aliases'

interface PopulationData {
   year: number
   [prefCode: number]: number
}

interface Props {
   selectedPrefectures: PrefCode[]
}

const GraphContainer = ({ selectedPrefectures }: Props) => {
   const [populationData, setPopulationData] = useState([] as PopulationData[])

   useEffect(() => {
      const getPopulations = selectedPrefectures.map(prefCode => getPopulation(prefCode))
      Promise.all(getPopulations)
         .then(data => {
            if (data.length < 1) {
               setPopulationData([])
            } else {
               const reducedDataForGraph = data[0].map((populationPerYear, yearIndex) => {
                  const prefPopulations = data.reduce((accumulator, prefectureData, prefIndex) => {
                     if (prefectureData[yearIndex].year !== populationPerYear.year) {
                        throw new Error('data arrays are not aligned')
                     } else {
                        return {
                           ...accumulator,
                           [selectedPrefectures[prefIndex]]: prefectureData[yearIndex].value,
                        }
                     }
                  }, {})
                  return {
                     year: populationPerYear.year,
                     ...prefPopulations,
                  }
               })
               setPopulationData(reducedDataForGraph)
            }
         })
         .catch(() => {
            throw new Error('人口数を取得できませんでした。')
         })
   }, [selectedPrefectures])

   return (
      <StyledGraphContainer>
         <LineChart width={800} height={500} data={populationData}>
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            {selectedPrefectures.map((prefCode, index) => (
               <Line key={index} type="monotone" dataKey={prefCode} stroke="#8884d8" />
            ))}
         </LineChart>
      </StyledGraphContainer>
   )
}

export default GraphContainer
