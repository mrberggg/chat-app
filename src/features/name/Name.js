import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { getName, getUserId, setName } from './userSlice';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  TextField,
} from '@material-ui/core';
import './Name.scss';

export function EnterName() {
  const dispatch = useDispatch();
  const [nameInput, setNameInput] = useState();

  // Get name from localstorage
  useEffect(() => {
    dispatch(getName());
    dispatch(getUserId());
  }, [dispatch]);

  return (
    <Card variant="outlined">
      <CardContent>
        <div className="name-label">
          <label htmlFor="name">Enter your name to begin:</label>
        </div>
        <TextField
          label="Name"
          id="name"
          onChange={(e) => setNameInput(e.target.value)}
          variant="outlined"
        />
      </CardContent>
      <CardActions>
        <Button color="primary" onClick={() => dispatch(setName(nameInput))}>
          Save
        </Button>
      </CardActions>
    </Card>
  );
}
