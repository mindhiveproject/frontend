import moment from 'moment';
import { StyledResult } from './styles';

export default function Result({ result, isSelected, toggleResult }) {
  const userID =
    result?.user?.publicReadableId ||
    result?.user?.publicId ||
    result?.user?.id ||
    'john-doe';

  const guestID =
    result?.guest?.publicReadableId ||
    result?.guest?.publicId ||
    result?.guest?.id ||
    'john-doe';

  return (
    <StyledResult
      key={result?.fullData?.id}
      isSelected={isSelected}
      onClick={() => toggleResult({ isSelected, id: result?.id })}
    >
      <div>{result?.guest ? guestID : userID}</div>
      <div>{moment(result?.updatedAt).format('MMMM D, YYYY, h:mma')}</div>
      <div>
        {result?.task?.title} {result?.task?.subtitle}
      </div>

      <div>
        {result?.fullData?.id
          ? 'Full'
          : result?.incrementalData?.length
          ? 'Partial'
          : ''}
      </div>
    </StyledResult>
  );
}
