import React, { useState, useEffect } from 'react'
import { StyledGraphContainer, lineColors } from '../style'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import getPopulation from '../api/getPopulation'
import CustomTooltip from './CustomTooltip'
import CustomLegend from './CustomLegend'
import CustomTick from './CustomTick'
import Spinner from './Spinner'
import Prefecture from '../types/Prefecture'

interface PopulationData {
   year: number
   [prefCode: number]: number
}

interface Props {
   selectedPrefectures: Prefecture[]
}

const GraphContainer = ({ selectedPrefectures }: Props) => {
   const [populationData, setPopulationData] = useState([] as PopulationData[])
   const [loading, setLoading] = useState(false)

   useEffect(() => {
      setLoading(true)
      const getPopulations = selectedPrefectures.map(pref => getPopulation(pref.prefCode))
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
               setPopulationData(reducedDataForGraph)
            }
            setLoading(false)
         })
         .catch(() => {
            throw new Error('人口数を取得できませんでした。')
         })
   }, [selectedPrefectures])

   return (
      <StyledGraphContainer>
         {loading ? (
            <Spinner />
         ) : selectedPrefectures.length > 0 ? (
            <ResponsiveContainer width="100%" height={500}>
               <LineChart data={populationData}>
                  <XAxis
                     label={{ value: '年', position: 'insideRight', offset: 0 }}
                     dataKey="year"
                     height={80}
                     tick={<CustomTick />}
                  />
                  <YAxis
                     label={{ value: '人口数', position: 'insideTopLeft', offset: 0 }}
                     width={140}
                     tickFormatter={value => value.toLocaleString()}
                  />
                  <Legend
                     layout="vertical"
                     verticalAlign="top"
                     align="right"
                     content={
                        <CustomLegend
                           selectedPrefectures={selectedPrefectures}
                           lineColors={lineColors}
                        />
                     }
                  />
                  <Tooltip content={<CustomTooltip />} />
                  {selectedPrefectures.map((pref, index) => (
                     <Line
                        key={index}
                        type="monotone"
                        dataKey={pref.prefCode}
                        stroke={lineColors[index % lineColors.length]}
                     />
                  ))}
               </LineChart>
            </ResponsiveContainer>
         ) : (
            '都道府県を選択してください'
         )}
      </StyledGraphContainer>
   )
}

export default GraphContainer
