import { ReactNode } from "react";
import { Button } from "..";
import { MdNavigateNext } from "react-icons/md";
import { t } from "i18next";

type Pagination_TP = {
  showNavigation?: Boolean;
  table?: any;
  currentPage?: number;
  totalPages?: number;
  children?: any;
  setPage?: any;
};

const Pagination = ({
  showNavigation,
  table,
  currentPage,
  totalPages,
  setPage,
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
        action={() => setPage(pageNumber)}
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
        <div className="flex items-center justify-between px-4 pt-5 pb-3 bg-transparent border-t border-gray-200 sm:px-6">
          <div className="flex justify-between flex-1 sm:hidden">
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
              disabled={currentPage == 1}
            >
              {t("Previous")}
            </Button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <nav
                className="inline-flex gap-2 -space-x-px isolate"
                aria-label="Pagination"
              >
                <Button
                  className="relative h-7 w-7 justify-center inline-flex items-center rounded-md border-none p-0 text-[#404B52] bg-[#F5F5F5]"
                  action={() => setPage(Number(currentPage) - 1)}
                  disabled={currentPage == 1}
                >
                  <MdNavigateNext />
                </Button>

                {renderPageNumbers()}

                <Button
                  className="relative h-7 w-7 justify-center inline-flex items-center rounded-md p-0 text-[#404B52] bg-[#F5F5F5]"
                  action={() => setPage(Number(currentPage) + 1)}
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
                <span className="font-medium"> {totalPages} </span>
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
