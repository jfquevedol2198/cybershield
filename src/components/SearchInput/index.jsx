import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

import { ButtonVariant } from "../../utils";
import NormalButton from "../NormalButton";

const schema = z.object({
  search: z.string(),
});

const SearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSearch, setIsSearch] = useState(false);
  const getDefaultValues = () => {
    return {
      search: undefined,
    };
  };
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(),
  });

  const onSubmit = ({ search }) => {
    if (searchParams.has("search")) {
      searchParams.set("search", search);
    } else {
      searchParams.append("search", search);
    }
    setSearchParams(searchParams);
  };
  const onHandleSubmit = form.handleSubmit(onSubmit);

  return (
    <>
      {!isSearch && (
        <NormalButton
          variant={ButtonVariant.icon}
          className="h-full"
          onClick={() => setIsSearch(true)}
        >
          <MagnifyingGlassIcon className="h-6 w-6" />
        </NormalButton>
      )}
      {isSearch && (
        <form onSubmit={onHandleSubmit}>
          <div className="searchInput flex flex-row items-center">
            <input
              placeholder="Search"
              className="h-12 w-[19rem] rounded-bl rounded-tl bg-white"
              id="search"
              {...form.register("search")}
            />
            <button
              className="flex h-12 w-12 items-center justify-center rounded-br rounded-tr bg-primary-4 active:opacity-50"
              type="submit"
            >
              <MagnifyingGlassIcon className="w-6 text-white" />
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default SearchInput;
