import React, { useState, useEffect } from 'react'
import { StyledCheckboxContainer } from '../style'
import Prefecture from '../types/Prefecture'
import getPrefectures from '../api/getPrefectures'

interface Props {
   selectedPrefectures: Set<number>
   setSelectedPrefectures: React.Dispatch<React.SetStateAction<Set<number>>>
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
      const newSelectedPrefectures = new Set(selectedPrefectures)
      if (selectedPrefectures.has(prefCode)) {
         newSelectedPrefectures.delete(prefCode)
      } else {
         newSelectedPrefectures.add(prefCode)
      }
      setSelectedPrefectures(newSelectedPrefectures)
   }

   return (
      <StyledCheckboxContainer>
         {prefectures.map((prefecture, index) => (
            <React.Fragment key={index}>
               <span>
                  <input
                     type="checkbox"
                     checked={selectedPrefectures.has(prefecture.prefCode)}
                     onChange={() => handleOnChangeCheckbox(prefecture.prefCode)}
                  />
                  {prefecture.prefName}
               </span>
            </React.Fragment>
         ))}
      </StyledCheckboxContainer>
   )
}

export default CheckboxContainer
