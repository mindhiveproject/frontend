import React, { useState } from 'react';

// https://projects.wojtekmaj.pl/react-date-picker/
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import { StyledBirthdayPicker } from './styles';

export default function BirthdayPicker({ onDateInput }) {
  const [value, onChange] = useState(new Date());

  const onInput = e => {
    onChange(e);
    const birthdayTimestamp = Date.parse(e); // save as a timestamp
    onDateInput('bd', birthdayTimestamp);
  };

  return (
    <StyledBirthdayPicker>
      <DatePicker onChange={e => onInput(e)} value={value} />
    </StyledBirthdayPicker>
  );
}
