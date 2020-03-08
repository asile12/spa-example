import React from 'react'
import { StyledCheckbox } from '../style'

interface Props {
   checked: boolean
   onChange: () => void
   label: string
}

const Checkbox = ({ checked, onChange, label }: Props) => {
   return (
      <StyledCheckbox>
         <input type="checkbox" checked={checked} onChange={onChange} />
         <span onClick={onChange}>{label}</span>
      </StyledCheckbox>
   )
}

export default Checkbox
