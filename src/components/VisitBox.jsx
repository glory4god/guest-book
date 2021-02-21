import React, { useState } from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';

const Root = styled(Paper)`
  margin: 5px 15px;
  position: relative;
  font-size: ${({ isActive }) => (isActive ? '1.5rem' : 'initial')};
`;
const PlusIcon = styled(Icon)`
  position: absolute;
  right: 10px;
  cursor: pointer;
`;

const VisitBox = ({ boardItem, refresh }) => {
  const [loading, setLoading] = useState({ delete: false, edit: false });
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState(boardItem);
  const [isActive, setIsActive] = useState(false);

  const handleDelete = async () => {
    setLoading((prev) => ({ ...prev, delete: true }));

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/board/${boardItem._id}`,
      {
        method: 'DELETE',
      },
    );

    setLoading((prev) => ({ ...prev, delete: false }));

    if (!response.ok) {
      return window.alert('deletion failed');
    }

    refresh();
  };

  const handleEdit = async (item, isActive = false) => {
    setLoading((prev) => ({ ...prev, edit: true }));

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/board/${boardItem._id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      },
    );

    setLoading((prev) => ({ ...prev, edit: false }));

    if (!response.ok) {
      return window.alert('failed edit');
    }

    // if success
    setIsEditing(false);
    refresh();
  };

  return (
    <Root elevation={3} isActive={isActive}>
      {/* <div>_id : {boardItem._id}</div> */}
      {isEditing ? (
        <>
          <div>
            <TextField
              variant="outlined"
              size="small"
              label="title"
              value={editItem.title}
              onChange={(e) =>
                setEditItem((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              size="small"
              label="name"
              value={editItem.name}
              onChange={(e) =>
                setEditItem((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              size="small"
              label="content"
              value={editItem.content}
              onChange={(e) =>
                setEditItem((prev) => ({ ...prev, content: e.target.value }))
              }
            />
          </div>
        </>
      ) : (
        <>
          <div className="zoom">
            <div>Title : {boardItem.title}</div>
            <div>Name : {boardItem.name}</div>
            <div>Content : {boardItem.content}</div>
          </div>
          <PlusIcon
            onClick={() => setIsActive(() => !isActive)}
            color="primary"
          >
            add_circle
          </PlusIcon>
        </>
      )}

      <Button color="primary" onClick={() => setIsEditing((prev) => !prev)}>
        Edit
      </Button>
      <Button
        color="primary"
        onClick={() => handleDelete()}
        disabled={loading.delete}
      >
        {loading.delete ? 'delete...' : 'delete'}
      </Button>
      {isEditing && (
        <Button
          color="primary"
          onClick={() => handleEdit(editItem)}
          disabled={loading.edit}
        >
          {loading.edit ? 'submit...' : 'submit'}
        </Button>
      )}
    </Root>
  );
};

VisitBox.propTypes = {
  boardItem: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    content: PropTypes.string,
  }),
};

export default VisitBox;
