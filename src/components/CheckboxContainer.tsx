import React from 'react'
import { StyledCheckboxContainer } from '../style'
import Prefecture from '../types/Prefecture'
import Checkbox from './Checkbox'

interface Props {
   prefectures: Prefecture[]
   selectedPrefectures: Prefecture[]
   setSelectedPrefectures: React.Dispatch<React.SetStateAction<Prefecture[]>>
}

const CheckboxContainer = ({ selectedPrefectures, setSelectedPrefectures, prefectures }: Props) => {
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
               <Checkbox
                  key={index}
                  label={prefecture.prefName}
                  checked={selectedPrefectures
                     .map(pref => pref.prefCode)
                     .includes(prefecture.prefCode)}
                  onChange={() => handleOnChangeCheckbox(prefecture)}
               />
            ))}
         </StyledCheckboxContainer>
      </>
   )
}

export default CheckboxContainer
