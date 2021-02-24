import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TextInput from './components/Textfield';
import Button from '@material-ui/core/Button';
import VisitBox from './components/VisitBox';
import ErrPage from './components/ErrPage';

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
  .reset-button {
    text-align: right;
    padding-right: 0.5rem;
  }
`;

const App = () => {
  const [input, setInput] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/board`);
      const resJson = await response.json();
      setData(resJson);
    } catch (err) {
      setErr(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Root>
      {err && <ErrPage />}
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
        <div className="reset-button">
          <Button color="primary" onClick={() => getData()}>
            reset
          </Button>
        </div>
      </Container>
    </Root>
  );
};

export default App;
