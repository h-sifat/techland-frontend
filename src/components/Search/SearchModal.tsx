import { useState } from "react";
import { BsSearch } from "react-icons/bs";

export interface SearchModal_Argument {
  isShown: boolean;
  setIsShown(arg: boolean): void;
}
const mainModalId = "floating_search_modal";

export function SearchModal({ isShown, setIsShown }: SearchModal_Argument) {
  return (
    <>
      <div
        className={getMainModalClasses(isShown)}
        id={mainModalId}
        tabIndex={-1}
        role="dialog"
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
              <ul className="list-group" tabIndex={3}>
                <li tabIndex={1} className="list-group-item">
                  An item
                </li>
                <li className="list-group-item">A second item</li>
                <li className="list-group-item">A third item</li>
                <li className="list-group-item">A fourth item</li>
                <li className="list-group-item">And a fifth one</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function getMainModalClasses(isShown: boolean) {
  let modalClasses = "modal fade shadow";
  if (isShown) modalClasses += " d-block show";
  else modalClasses += " d-none";

  return modalClasses;
}
