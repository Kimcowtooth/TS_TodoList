import React from 'react'
import styled from 'styled-components';

function Header() {
  return (
    <StyledHeader>
      <StyledP>Typescript TodoList</StyledP>
    </StyledHeader>
  )
}

export default Header

const StyledHeader = styled.div`
  background-color: #161B33;
  color : white;
  padding: 20px;
  font-size: larger;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
`;

const StyledP = styled.p`
  margin: 0;
`;