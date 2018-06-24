import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  font-weight: 900;
`;

const Link = styled.a`
  color: #8d8d8d;
`;

const Header = () => (
  <Title>
    Connect Four by&nbsp;<Link href="https://github.com/lankovova">lankovova</Link>
  </Title>
);

export default Header;
