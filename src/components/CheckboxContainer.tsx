import React, { useState, useEffect } from 'react'
import { StyledCheckboxContainer } from '../style'
import Prefecture from '../types/Prefecture'
import getPrefectures from '../api/getPrefectures'
import { PrefCode } from '../types/aliases'
import Checkbox from './Checkbox'

interface Props {
   selectedPrefectures: PrefCode[]
   setSelectedPrefectures: React.Dispatch<React.SetStateAction<PrefCode[]>>
}

const CheckboxContainer = ({ selectedPrefectures, setSelectedPrefectures }: Props) => {
   const [prefectures, setPrefectures] = useState([] as Prefecture[])

   useEffect(() => {
      getPrefectures()
         .then(data => {
            setPrefectures(data)
         })
         .catch(() => {
            throw new Error('都道府県を取得できませんでした。')
         })
   }, [])

   const handleOnChangeCheckbox = (prefCode: number) => {
      if (selectedPrefectures.includes(prefCode)) {
         setSelectedPrefectures(selectedPrefectures.filter(code => code !== prefCode))
      } else {
         setSelectedPrefectures([...selectedPrefectures, prefCode])
      }
   }

   return (
      <>
         <h3>都道府県</h3>
         <StyledCheckboxContainer>
            {prefectures.map((prefecture, index) => (
               <React.Fragment key={index}>
                  <Checkbox
                     label={prefecture.prefName}
                     checked={selectedPrefectures.includes(prefecture.prefCode)}
                     onChange={() => handleOnChangeCheckbox(prefecture.prefCode)}
                  />
               </React.Fragment>
            ))}
         </StyledCheckboxContainer>
      </>
   )
}

export default CheckboxContainer
