import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../ui/Button";

interface Props {
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

function Pagination({ totalPages, currentPage, totalItems }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const goToPage = (page: number) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", page.toString());

    navigate({
      pathname: location.pathname,
      search: `?${searchParams.toString()}`,
    });
  };

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }

    return pages;
  };

  if (totalItems === 0) return null;

  return (
    <div className="mt-[20px] px-[15px]">
      <div className="flex items-center justify-center w-full flex-wrap gap-2.5 text-[0.9rem]">
        <Button
          type="button"
          className="h-8.5 w-8.5 flex justify-center items-center hover:bg-gray-100 text-primary border border-primary rounded-sm"
          isDisabled={currentPage <= 1}
          onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
        >
          <GrFormPrevious size={22} />
        </Button>

        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <Button
                type="button"
                isDisabled={true}
                key={`ellipsis-${index}`}
                className="group h-8.5 w-8.5 flex justify-center items-center text-primary rounded-sm font-semibold border border-primary"
              >
                ...
              </Button>
            );
          }

          return (
            <Button
              key={page}
              onClick={() => goToPage(page as number)}
              className={`h-8.5 w-8.5 flex justify-center items-center text-primary font-medium rounded-sm ${
                currentPage === page
                  ? "bg-primary text-white"
                  : " hover:bg-gray-100 border border-primary"
              }`}
            >
              {page}
            </Button>
          );
        })}

        <Button
          isDisabled={currentPage >= totalPages}
          onClick={() => currentPage < totalPages && goToPage(currentPage + 1)}
          className="h-8.5 w-8.5 flex justify-center items-center hover:bg-gray-100 text-primary border border-primary rounded-sm"
        >
          <GrFormNext size={22} />
        </Button>
      </div>
    </div>
  );
}

export default Pagination;
