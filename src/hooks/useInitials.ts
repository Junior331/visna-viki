import { useState, useEffect } from 'react';

const UseInitials = (name: string): string => {
  const [initials, setInitials] = useState<string>('');

  useEffect(() => {
    const namesArray = name.toUpperCase().split(' ');
    let initials = '';

    for (let i = 0; i < Math.min(2, namesArray.length); i++) {
      initials += namesArray[i].charAt(0);
    }

    setInitials(initials);
  }, [name]);

  return initials;
};

export default UseInitials;
