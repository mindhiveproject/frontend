import moment from 'moment';
import { StyledResult } from './styles';

export default function Result({ result, isSelected, toggleResult }) {
  return (
    <StyledResult
      key={result?.fullData?.id}
      isSelected={isSelected}
      onClick={() => toggleResult({ isSelected, id: result?.id })}
    >
      <div>{result?.user?.publicReadableId}</div>
      <div>{moment(result?.updatedAt).format('MMMM D, YYYY, h:mma')}</div>
      <div>{result?.task?.title}</div>
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
