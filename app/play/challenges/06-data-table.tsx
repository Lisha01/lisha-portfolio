"use client";

import { Filter, Plus } from "lucide-react";

function DataTableMockup() {
  const rows = [
    { sku: "KUR-001", name: "Hex bolt M6 x 30", qty: 1240, price: "$0.42", status: "Active" },
    { sku: "KUR-014", name: "Stainless washer 8mm", qty: 320, price: "$0.18", status: "Active" },
    { sku: "KUR-022", name: "Brass insert nut", qty: 56, price: "$1.12", status: "Active" },
    { sku: "KUR-031", name: "Cap screw M4", qty: 2480, price: "$0.36", status: "Active" },
    { sku: "KUR-047", name: "Spring pin 4 x 20", qty: 0, price: "$0.24", status: "Out" },
  ];

  return (
    <div className="p-6 sm:p-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-ink-400">Inventory</p>
          <h1 className="mt-2 font-display text-[24px] font-normal leading-tight tracking-tight text-ink-900">
            Stock items
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            tabIndex={-1}
            className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-3 py-1.5 font-sans text-[12px] font-medium text-ink-700"
          >
            <Filter size={12} /> Filter
          </button>
          <button
            type="button"
            tabIndex={-1}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-3 py-1.5 font-sans text-[12px] font-medium text-white"
          >
            <Plus size={12} /> New item
          </button>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-ink-200/60">
        <div className="grid grid-cols-[100px_1fr_80px_80px_80px] gap-3 border-b border-ink-200/60 bg-cream px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">
          <span>SKU</span>
          <span>Name</span>
          <span>Qty</span>
          <span>Price</span>
          <span>Status</span>
        </div>
        {rows.map((r, i, arr) => (
          <div
            key={r.sku}
            className={`grid grid-cols-[100px_1fr_80px_80px_80px] items-center gap-3 px-4 py-3 font-sans text-[13px] ${
              i !== arr.length - 1 ? "border-b border-ink-200/60" : ""
            }`}
          >
            <span className="font-mono text-ink-600">{r.sku}</span>
            {/*
              THE FLAW — Name column right-aligned (text should be left),
              Qty + Price left-aligned (numbers should be right). Inverted
              alignment breaks scan-ability: same-magnitude values no
              longer line up, ragged text edges no longer guide reading.
            */}
            <span
              data-flaw="true"
              className="text-right font-medium text-ink-900"
            >
              {r.name}
            </span>
            <span
              data-flaw="true"
              className="text-left tabular-nums text-ink-900"
            >
              {r.qty.toLocaleString()}
            </span>
            <span
              data-flaw="true"
              className="text-left tabular-nums text-ink-900"
            >
              {r.price}
            </span>
            <span
              className={`inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] ${
                r.status === "Out"
                  ? "bg-ink-200/40 text-ink-600"
                  : "bg-sky-100 text-accent"
              }`}
            >
              <span
                className={`h-1 w-1 rounded-full ${
                  r.status === "Out" ? "bg-ink-400" : "bg-accent"
                }`}
              />
              {r.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export const challenge = {
  id: "table-alignment-inverted",
  title: "Inventory Table",
  sin: "Column alignment inverted",
  explanation:
    "Name (text) is right-aligned and Qty + Price (numbers) are left-aligned. Convention is the opposite: numbers right-aligned so the decimal places stack and the eye can scan magnitudes down a column; text left-aligned so it reads as a list. Inverted, the table becomes work to read.",
  url: "console.kuro.io/inventory",
  Component: DataTableMockup,
};
