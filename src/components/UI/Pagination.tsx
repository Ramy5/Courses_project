import React, { ReactNode } from "react";
import { Button } from "..";
import { MdNavigateNext } from "react-icons/md";
import { t } from "i18next";

type Pagination_TP = {
  showNavigation?: Boolean;
  table?: any;
  currentPage?: String;
  totalPages?: Number;
  children?: any;
};

const Pagination = ({
  showNavigation,
  table,
  currentPage,
  totalPages,
//   children,
}: Pagination_TP) => {

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxDisplayPages = 5;

    const renderButton = (pageNumber: ReactNode) => (
      <Button
        key={Number(pageNumber)}
        aria-current={pageNumber == currentPage ? "page" : undefined}
        className={`relative h-7 w-7 justify-center inline-flex items-center rounded-md p-0 text-sm font-semibold ${
          pageNumber == currentPage
            ? "bg-mainColor text-white"
            : "text-[#404B52] bg-[#F5F5F5]"
        } focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
      >
        {pageNumber}
      </Button>
    );

    for (let i = 1; i <= Math.min(maxDisplayPages, Number(totalPages)); i++) {
      pageNumbers.push(renderButton(i));
    }

    if (Number(totalPages) > maxDisplayPages) {
      pageNumbers.push(
        <span
          key="ellipsis"
          className="relative h-7 w-5 justify-center inline-flex items-center rounded-md p-0 text-md font-bold text-[#404B52]"
        >
          ...
        </span>
      );

      pageNumbers.push(renderButton(Number(totalPages)));
    }

    return pageNumbers;
  };

  return (
    <div>
      {showNavigation ? (
        <div className="flex items-center justify-between border-t border-gray-200 bg-transparent px-4 pb-3 pt-5 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <Button
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-[#404B52] hover:bg-gray-50"
              action={() => table.nextPage()}
              disabled={currentPage == totalPages}
            >
              {t("Next")}
            </Button>
            <Button
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-[#404B52] hover:bg-gray-50"
              action={() => table.previousPage()}
              disabled={currentPage == "1"}
            >
              {t("Previous")}
            </Button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <nav
                className="isolate inline-flex -space-x-px gap-2"
                aria-label="Pagination"
              >
                <Button
                  className="relative h-7 w-7 justify-center inline-flex items-center rounded-md border-none p-0 text-[#404B52] bg-[#F5F5F5]"
                  action={() => table.previousPage()}
                  disabled={currentPage == "1"}
                >
                  <MdNavigateNext />
                </Button>

                {renderPageNumbers()}

                <Button
                  className="relative h-7 w-7 justify-center inline-flex items-center rounded-md p-0 text-[#404B52] bg-[#F5F5F5]"
                  action={() => table.nextPage()}
                  disabled={currentPage == totalPages}
                >
                  <MdNavigateNext className="transform rotate-180" />
                </Button>
              </nav>
            </div>
            <div>
              <p className="text-base font-medium text-black">
                {t("Showing")}
                <span className="font-medium"> 1 </span>
                {t("to")}
                <span className="font-medium"> 10 </span>
                {t("of")}
                <span className="font-medium"> 40 </span>
                {t("entries")}
              </p>
            </div>
          </div>
        </div>
      ) : null}
      {/* {children && children} */}
    </div>
  );
};

export default Pagination;
