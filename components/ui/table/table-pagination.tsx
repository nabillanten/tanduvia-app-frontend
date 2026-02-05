"use client";

import {useSearchParams} from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  page: number;
  perPage: number;
  count: number;
  query: string;
};

const TablePagination = (props: Props) => {
  const {page, perPage, count} = props;

  // params yang ada di URL saat ini (termasuk status, q, dll)
  const searchParams = useSearchParams();

  // Fungsi Helper untuk update halaman saja
  const createPageURL = (pageNumber: number | string) => {
    // Copy params saat ini
    const params = new URLSearchParams(searchParams.toString());

    // Update atau Set 'page' ke nomor baru
    params.set("page", pageNumber.toString());

    // Kembalikan string lengkap (misal: ?page=2&q=cari&status=pending)
    return `?${params.toString()}`;
  };

  const totalPages = Math.ceil(Number(count) / perPage) || 1;
  const currentPage = Number(page);

  return (
    <section className="flex items-center justify-between gap-6">
      <p className="pl-2 font-medium text-sm"> Total Data {count}</p>
      <section className="flex items-center gap-4">
        <Pagination >
          <PaginationContent className="gap-6">
            {/* Tombol Previous */}
            <PaginationItem>
              <PaginationPrevious
                disabled={currentPage <= 1}
                route={createPageURL(currentPage - 1)}
              />
            </PaginationItem>
            <span className="text-sm text-muted-foreground">
              Halaman {currentPage} dari {totalPages}
            </span>
            {/* Tombol Next */}
            <PaginationItem>
              <PaginationNext
                disabled={currentPage >= totalPages}
                route={createPageURL(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </section>
  );
};

export default TablePagination;
