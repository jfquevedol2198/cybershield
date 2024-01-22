import useSearchAndFilter from "../../hooks/useSearchAndFilter";
import NormalButton from "../NormalButton";
import Tag, { TagVariant } from "../Tag";

const SearchAndFilter = () => {
  const { search, params, onClearAll, onRemoveItem } = useSearchAndFilter();
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
      {search && (
        <Tag
          variant={TagVariant.closeable}
          label={`Search: ${search}`}
          onRemove={() => onRemoveItem("search")}
        />
      )}
      {params.map((param) => (
        <Tag
          key={param[0]}
          variant={TagVariant.closeable}
          label={`${param[0]}: ${param[1]}`}
          onRemove={() => onRemoveItem(param[0])}
        />
      ))}
      {(search || params.length > 0) && (
        <NormalButton className="text-link underline" onClick={onClearAll}>
          Clear All
        </NormalButton>
      )}
    </div>
  );
};

export default SearchAndFilter;
