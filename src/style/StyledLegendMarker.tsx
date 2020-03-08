import styled from 'styled-components'

interface Props {
   color: string
}

const StyledLegendMarker = styled.span<Props>`
   background-color: ${props => props.color};
   padding-right: 18px;
   margin-right: 8px;
`
export default StyledLegendMarker
