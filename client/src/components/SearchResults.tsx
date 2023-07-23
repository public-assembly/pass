type Props = {
  owners?: `0x${string}`[];
};

export const SearchResults = ({ owners }: Props) => {
  return (
    <div>
      <strong>List of Owners</strong>
      {owners && owners.length > 0 ? (
        <ul>
          {owners.map((address, i) => (
            <li key={i}>{address}</li>
          ))}
        </ul>
      ) : (
        <p>No owners data available</p>
      )}
    </div>
  );
};

export default SearchResults;
