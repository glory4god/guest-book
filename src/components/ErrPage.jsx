import React from 'react';
import styled from 'styled-components';
import VisitBox from './VisitBox';

const Root = styled.div`
  text-align: center;
  background-color: rgb(226, 247, 255);
  font-family: 'Inconsolata', monospace;
`;
const Container = styled.div`
  margin: 0px auto;
  width: 600px;
  height: 1000px;
  background-color: #f6feff;
  border: solid 1px rgb(235, 223, 223);
  overflow: auto;
  .title {
    padding-top: 30px;
    font-size: 1.5rem;
  }
`;

const ErrPage = () => {
  return (
    <Root>
      <Container>
        <div className="title">
          <b>Hayoung's guest book</b>
        </div>
        <div>
          <VisitBox
            boardItem={{ title: '에러발생', name: '...', content: '...' }}
          />
        </div>
      </Container>
    </Root>
  );
};

export default ErrPage;
