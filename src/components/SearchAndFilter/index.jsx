import useSearchAndFilter from "../../hooks/useSearchAndFilter";
import NormalButton from "../NormalButton";
import Tag, { TagVariant } from "../Tag";

const SearchAndFilter = () => {
  const { search, filterParams, onClearAll, onRemoveItem } =
    useSearchAndFilter();
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
      {search && (
        <Tag
          variant={TagVariant.closeable}
          label={`Search: ${search}`}
          onRemove={() => onRemoveItem("search")}
        />
      )}
      {filterParams.map((filter) => (
        <Tag
          key={filter.key}
          variant={TagVariant.closeable}
          label={`${filter.key}: ${filter.value}`}
          onRemove={() => onRemoveItem(filter.key)}
        />
      ))}
      {(search || filterParams.length > 0) && (
        <NormalButton className="text-link underline" onClick={onClearAll}>
          Clear All
        </NormalButton>
      )}
    </div>
  );
};

export default SearchAndFilter;
