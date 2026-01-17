"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import type { DataSourceKey } from "./types";

type Filters = Record<string, string>;

type DataContextValue = {
  filters: Partial<Record<DataSourceKey, Filters>>;
  setFilter: (ds: DataSourceKey, key: string, value: string) => void;
  fetchData: (ds: DataSourceKey) => Promise<any>;
};

const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<Partial<Record<DataSourceKey, Filters>>>({});

  const setFilter = (ds: DataSourceKey, key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [ds]: { ...(prev[ds] ?? {}), [key]: value },
    }));
  };

  const fetchData = async (ds: DataSourceKey) => {
    const qs = new URLSearchParams(filters[ds] ?? {}).toString();
    const res = await fetch(`/api/data/${ds}${qs ? `?${qs}` : ""}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load ${ds}`);
    return res.json();
  };

  const value = useMemo(() => ({ filters, setFilter, fetchData }), [filters]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}