import React, { useState, useEffect } from 'react'
import { StyledCheckboxContainer } from '../style'
import Prefecture from '../types/Prefecture'
import getPrefectures from '../api/getPrefectures'
import Checkbox from './Checkbox'

interface Props {
   selectedPrefectures: Prefecture[]
   setSelectedPrefectures: React.Dispatch<React.SetStateAction<Prefecture[]>>
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

   const handleOnChangeCheckbox = (selectedPrefecture: Prefecture) => {
      if (selectedPrefectures.map(pref => pref.prefCode).includes(selectedPrefecture.prefCode)) {
         setSelectedPrefectures(
            selectedPrefectures.filter(
               prefecture => prefecture.prefCode !== selectedPrefecture.prefCode
            )
         )
      } else {
         setSelectedPrefectures([...selectedPrefectures, selectedPrefecture])
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
                     checked={selectedPrefectures
                        .map(pref => pref.prefCode)
                        .includes(prefecture.prefCode)}
                     onChange={() => handleOnChangeCheckbox(prefecture)}
                  />
               </React.Fragment>
            ))}
         </StyledCheckboxContainer>
      </>
   )
}

export default CheckboxContainer
