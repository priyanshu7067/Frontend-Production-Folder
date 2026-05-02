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

  /* -------------------- SCREEN SIZE -------------------- */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* -------------------- SEARCH -------------------- */
  const filteredData = useMemo(() => {
    if (!searchInput.trim()) return safeData;
    const term = searchInput.toLowerCase();

    return safeData.filter((row) =>
      Object.values(row).some((value) => {
        if (value === null || value === undefined) return false;

        if (typeof value === "string")
          return value.toLowerCase().includes(term);

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
      }),
    );
  }, [safeData, searchInput]);

  /* -------------------- PAGINATION -------------------- */
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, currentPage, rowsPerPage]);

  const startRecord =
    filteredData.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;

  const endRecord = Math.min(currentPage * rowsPerPage, filteredData.length);

  /* -------------------- PAGINATION RANGE -------------------- */
  const getPaginationRange = () => {
    if (totalPages <= 1) return [1];

    if (isMobile) {
      return [currentPage]; // ✅ only current page
    }

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

  /* -------------------- LOADING -------------------- */
  if (loading) {
    return (
      <div className="bg-gray-900 rounded-2xl shadow p-6 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 bg-[#22d3ee]/10 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div
      className="
  bg-[rgba(2,6,23,0.85)]
  border border-[#22d3ee]/15
  rounded-2xl
  shadow-[0_0_25px_rgba(0,0,0,0.7)]
  backdrop-blur-xl
  overflow-hidden
"
    >
      {/* SEARCH */}
      {searchable && (
        <div className="p-4 border-b border-white/10 bg-white/5">
          <div className="relative max-w-sm">
            <SearchIcon
              sx={{
                position: "absolute",
                left: 10,
                top: 8,
                fontSize: 18,
                color: "#22d3ee",
              }}
            />
            <input
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search..."
              className="w-full pl-9 pr-3 py-2 rounded-lg 
            bg-black/40 border border-white/10 text-white text-sm
            focus:ring-2 focus:ring-[#22d3ee] focus:border-[#22d3ee]
            placeholder:text-gray-400"
            />
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="overflow-x-auto hide-scrollbar">
        <table className="w-full min-w-[900px] text-sm text-gray-300">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              {columns.map((col, i) => (
                <th
                  key={i}
                  className="px-4 py-3 text-left font-semibold text-[#22d3ee] tracking-wide text-nowrap"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedData.length ? (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={row._id || rowIndex}
                  className="border-b border-white/5 hover:bg-[#22d3ee]/5 transition"
                >
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="px-4 py-3 whitespace-nowrap">
                      {col.render
                        ? col.render(
                            row,
                            (currentPage - 1) * rowsPerPage + rowIndex,
                          )
                        : (row[col.accessor] ?? "-")}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length}>
                  <div className="flex flex-col items-center justify-center py-12">
                    <img
                      src={img}
                      alt="No data"
                      className="w-40 h-40 object-contain mb-4 opacity-70"
                    />
                    <p className="text-gray-400 text-sm">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {/* PAGINATION */}
      {filteredData.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-4 bg-white/5 border-t border-white/10 text-sm">
          {/* LEFT INFO */}
          <p className="text-gray-400">
            Showing <b className="text-purple-400">{startRecord}</b> –{" "}
            <b className="text-purple-400">{endRecord}</b> of{" "}
            <b className="text-purple-400">{filteredData.length}</b>
          </p>

          {/* RIGHT CONTROLS */}
          <div className="flex items-center gap-2">
            {/* PREV */}
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1.5 rounded-full border border-white/10 
        text-gray-300 disabled:opacity-30 
        hover:bg-[#22d3ee]/10 transition"
            >
              ←
            </button>

            {/* 🔥 MOBILE DOTS (Instagram style) */}
            {isMobile ? (
              <div className="flex items-center gap-1 px-2">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const page = i + 1;

                  // show only nearby dots (like Instagram stories)
                  if (
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(page - currentPage) <= 1
                  ) {
                    return (
                      <div
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`h-2.5 w-2.5 rounded-full cursor-pointer transition-all
                  ${
                    currentPage === page
                      ? "bg-gradient-to-r from-[#06b6d4] to-[#22d3ee] scale-125"
                      : "bg-gray-500/50 hover:bg-gray-400"
                  }`}
                      />
                    );
                  }

                  // show gap indicator
                  if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <span key={page} className="text-gray-500 text-xs">
                        ...
                      </span>
                    );
                  }

                  return null;
                })}
              </div>
            ) : (
              /* 💻 DESKTOP PAGINATION */
              <div className="flex items-center gap-1">
                {getPaginationRange().map((page, i) =>
                  page === "..." ? (
                    <span key={i} className="px-2 text-gray-500">
                      ...
                    </span>
                  ) : (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1.5 rounded-lg border transition
                ${
                  currentPage === page
                    ? "bg-gradient-to-r from-[#06b6d4] to-[#22d3ee] text-white border-none shadow-lg"
                    : "border-white/10 text-gray-300 hover:bg-white/10"
                }`}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>
            )}

            {/* NEXT */}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1.5 rounded-full border border-white/10 
        text-gray-300 disabled:opacity-30 
        hover:bg-[#22d3ee]/10 transition"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableComponent;
