import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import TextInput from './components/Textfield';
import Button from '@material-ui/core/Button';
import VisitBox from './components/VisitBox';

const Root = styled.div`
  text-align: center;
  background-color: rgb(226, 247, 255);
  font-family: 'Inconsolata', monospace;
`;
const Container = styled(Paper)`
  margin: 0px auto;
  width: 600px;
  height: 1000px;

  overflow: auto;
  .title {
    padding-top: 30px;
    font-size: 1.5rem;
  }
`;

const App = () => {
  const [input, setInput] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/board`);
      const resJson = await response.json();
      setData(resJson);
    } catch (err) {
      // Handling Errors.
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Root>
      <Container>
        <div className="title">
          <b>Hayoung's guest book</b>
        </div>
        <Button color="primary" onClick={() => setInput(!input)}>
          글쓰기
        </Button>
        {input && (
          <div>
            <TextInput
              onSuccess={() => {
                setInput(false);
                getData();
              }}
            />
          </div>
        )}
        <div>
          {loading ? (
            <div>
              <VisitBox
                boardItem={{ title: '...', name: '...', content: '...' }}
              />
              <VisitBox
                boardItem={{ title: '...', name: '...', content: '...' }}
              />
              <VisitBox
                boardItem={{ title: '...', name: '...', content: '...' }}
              />
              <VisitBox
                boardItem={{ title: '...', name: '...', content: '...' }}
              />
            </div>
          ) : (
            data.map((item, idx) => (
              <VisitBox key={idx} boardItem={item} refresh={() => getData()} />
            ))
          )}
        </div>
      </Container>
    </Root>
  );
};

export default App;
