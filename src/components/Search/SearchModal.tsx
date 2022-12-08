import { Link } from "wouter";
import { useState } from "react";
import { debounce } from "lodash";
import { api } from "../../util/api";
import { Alert } from "../other/Alert";
import { BsSearch } from "react-icons/bs";
import { formatError } from "../../util/format-error";
import { LoadingSpinner } from "../other/LoadingSpinner";
import { ProductSearchSuggestionDocument } from "../../interfaces/product";

export interface SearchModal_Argument {
  isShown: boolean;
  setIsShown(arg: boolean): void;
}
const mainModalId = "floating_search_modal";
const DEBOUNCE_DELAY = 500;
const DEFAULT_SUGGESTION_COUNT = 5;

const delayedFetchSearchSuggestions = debounce(
  fetchSearchSuggestions,
  DEBOUNCE_DELAY
);

export function SearchModal({ isShown, setIsShown }: SearchModal_Argument) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);

  function handleQueryChange(input: string) {
    setQuery(input);

    if (!input.length) {
      setSearchResult(null);
      return;
    }

    delayedFetchSearchSuggestions({
      query,
      setIsLoading,
      setResult: setSearchResult,
    });
  }

  return (
    <>
      <div
        className={getMainModalClasses(isShown)}
        id={mainModalId}
        role="dialog"
        onKeyDown={(e) => {
          if (e.key !== "Escape") return;
          setSearchResult(null);
          setQuery("");
          setIsShown(false);
        }}
        onClick={(e) =>
          (e.target as any).id === mainModalId && setIsShown(false)
        }
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-body">
              <form>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={query}
                    onChange={(e) => handleQueryChange((e.target as any).value)}
                    placeholder="Type your query here"
                  />
                  <button
                    className="btn btn-outline-primary"
                    type="button"
                    id="button-addon2"
                  >
                    <BsSearch />
                  </button>
                </div>
              </form>

              <SearchSuggestionsList searchResult={searchResult} />

              {isLoading && (
                <li className="list-group-item">
                  <LoadingSpinner />
                </li>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export interface SearchSuggestionsList_Argument {
  searchResult: SearchResult | null;
}
export function SearchSuggestionsList(arg: SearchSuggestionsList_Argument) {
  const { searchResult } = arg;

  if (!searchResult) return <> </>;
  if (!searchResult.success)
    return <Alert type="danger" message={searchResult.message} />;

  const { suggestions } = searchResult;
  return (
    <ul className="list-group">
      {suggestions.map((document, index) => (
        <Link href="/product" key={document._id}>
          <li tabIndex={index + 1} className="list-group-item text-primary">
            {document.name}
          </li>
        </Link>
      ))}
    </ul>
  );
}

function getMainModalClasses(isShown: boolean) {
  let modalClasses = "modal fade shadow";
  if (isShown) modalClasses += " d-block show";
  else modalClasses += " d-none";

  return modalClasses;
}

type SearchResult =
  | { success: true; suggestions: ProductSearchSuggestionDocument[] }
  | { success: false; message: string };

interface FetchSearchSuggestions_Argument {
  query: string;
  setResult(result: SearchResult): void;
  setIsLoading(isLoading: boolean): void;
}

async function fetchSearchSuggestions(arg: FetchSearchSuggestions_Argument) {
  const { query, setResult, setIsLoading } = arg;

  setIsLoading(true);

  try {
    const result = await api.get<ProductSearchSuggestionDocument[]>({
      path: "/products",
      query: { qType: "suggestions", query, count: DEFAULT_SUGGESTION_COUNT },
    });

    if (!result.success) {
      const message = formatError({ errorResponse: result });
      setResult({ success: false, message: message });
      return;
    }

    setResult({ success: true, suggestions: result.data });
  } catch (ex) {
    setResult({ success: false, message: ex.message });
  } finally {
    setIsLoading(false);
  }
}
