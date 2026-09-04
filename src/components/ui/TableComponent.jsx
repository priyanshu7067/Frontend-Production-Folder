import React, { useState, useMemo, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import img from "../../assets/notfound.jpg";

const TableComponent = ({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = "No records found",
  rowsPerPage = 10,
  searchable = true,
}) => {
  const safeData = Array.isArray(data) ? data : [];
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const filteredData = useMemo(() => {
    if (!searchInput.trim()) return safeData;
    const term = searchInput.toLowerCase();

    return safeData.filter((row) =>
      Object.values(row).some((value) => {
        if (value === null || value === undefined) return false;
        if (typeof value === "string") return value.toLowerCase().includes(term);
        if (typeof value === "number" || typeof value === "boolean")
          return String(value).includes(term);
        if (typeof value === "object") {
          try {
            return JSON.stringify(value).toLowerCase().includes(term);
          } catch {
            return false;
          }
        }
        return false;
      })
    );
  }, [safeData, searchInput]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, currentPage, rowsPerPage]);

  const startRecord = filteredData.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endRecord = Math.min(currentPage * rowsPerPage, filteredData.length);

  const getPaginationRange = () => {
    if (totalPages <= 1) return [1];
    if (isMobile) return [currentPage];

    const range = [];
    const delta = 2;
    const start = Math.max(1, currentPage - delta);
    const end = Math.min(totalPages, currentPage + delta);

    if (start > 1) {
      range.push(1);
      if (start > 2) range.push("...");
    }

    for (let i = start; i <= end; i++) range.push(i);

    if (end < totalPages) {
      if (end < totalPages - 1) range.push("...");
      range.push(totalPages);
    }

    return range;
  };

  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 bg-slate-100 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
      
      {/* SEARCH BAR */}
      {searchable && (
        <div className="p-4 border-b border-slate-200 bg-slate-50/50">
          <div className="relative max-w-sm">
            <SearchIcon
              sx={{
                position: "absolute",
                left: 10,
                top: 9,
                fontSize: 18,
                color: "#64748b",
              }}
            />
            <input
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search records..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder:text-slate-400 outline-none"
            />
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-sm text-slate-700">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {columns.map((col, i) => (
                <th
                  key={i}
                  className="px-4 py-3.5 text-left font-bold text-slate-900 tracking-wide whitespace-nowrap"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {paginatedData.length ? (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={row._id || rowIndex}
                  className="hover:bg-sky-50/40 transition-colors"
                >
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="px-4 py-3.5 whitespace-nowrap">
                      {col.render
                        ? col.render(row, (currentPage - 1) * rowsPerPage + rowIndex)
                        : row[col.accessor] ?? "-"}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length}>
                  <div className="flex flex-col items-center justify-center py-12">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/16504/16504070.png"
                      alt="No data"
                      className="w-20 h-15 object-contain mb-3 opacity-60"
                    />
                    <p className="text-slate-500 text-sm font-medium">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION FOOTER */}
      {filteredData.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-4 bg-slate-50/50 border-t border-slate-200 text-xs text-slate-600">
          <p>
            Showing <b className="text-slate-900">{startRecord}</b> –{" "}
            <b className="text-slate-900">{endRecord}</b> of{" "}
            <b className="text-slate-900">{filteredData.length}</b> records
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 disabled:opacity-40 hover:bg-slate-100 transition"
            >
              ← Prev
            </button>

            {isMobile ? (
              <div className="flex items-center gap-1 px-2">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const page = i + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(page - currentPage) <= 1
                  ) {
                    return (
                      <div
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`h-2.5 w-2.5 rounded-full cursor-pointer transition-all ${
                          currentPage === page ? "bg-sky-600 scale-110" : "bg-slate-300"
                        }`}
                      />
                    );
                  }
                  return null;
                })}
              </div>
            ) : (
              <div className="flex items-center gap-1">
                {getPaginationRange().map((page, i) =>
                  page === "..." ? (
                    <span key={i} className="px-2 text-slate-400">
                      ...
                    </span>
                  ) : (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition ${
                        currentPage === page
                          ? "bg-sky-600 text-white border-sky-600 shadow-xs"
                          : "border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>
            )}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 disabled:opacity-40 hover:bg-slate-100 transition"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableComponent;
