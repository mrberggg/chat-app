import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { getName, getUserId, setName } from './userSlice';

export function EnterName() {
  const dispatch = useDispatch();
  const [nameInput, setNameInput] = useState();

  // Get name from localstorage
  useEffect(() => {
    dispatch(getName());
    dispatch(getUserId());
  }, []);

  return (
    <div>
      <div>
        <input
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="Name"
        />
      </div>
      <div>
        <Button onClick={() => dispatch(setName(nameInput))}>Save</Button>
      </div>
    </div>
  );
}
