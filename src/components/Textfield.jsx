import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

const Root = styled.div`
  * {
    margin-top: 0.5rem;
  }
`;

const TextInput = ({ onSuccess, ...props }) => {
  const [boardItem, setBoardItem] = useState({
    title: '',
    name: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);

  const postData = async (item) => {
    setLoading(true);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/board`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });

    setLoading(false);

    if (!response.ok) {
      return window.alert('failed');
    }

    onSuccess();
  };

  return (
    <Root {...props}>
      <TextField
        variant="outlined"
        size="small"
        label="title"
        value={boardItem.title}
        onChange={(e) =>
          setBoardItem((prev) => ({
            ...prev,
            title: e.target.value,
          }))
        }
      />
      <br />
      <TextField
        variant="outlined"
        size="small"
        label="name"
        value={boardItem.name}
        onChange={(e) =>
          setBoardItem((prev) => ({
            ...prev,
            name: e.target.value,
          }))
        }
      />
      <br />
      <TextField
        variant="outlined"
        size="small"
        label="content"
        value={boardItem.content}
        onChange={(e) =>
          setBoardItem((prev) => ({
            ...prev,
            content: e.target.value,
          }))
        }
      />
      <br />
      <Button
        color="primary"
        onClick={() => {
          postData(boardItem);
        }}
        disabled={loading}
      >
        {loading ? 'sending...' : 'send'}
      </Button>
    </Root>
  );
};
export default TextInput;
