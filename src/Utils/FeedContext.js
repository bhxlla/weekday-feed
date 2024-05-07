import { createContext } from "react";

// Mainly used for Setting and Getting Filters.
export const FeedContext = createContext({
    filterValues: {},
    appliedFilters: {},
    setFilterValues: () => { },
    setAppliedFilters: () => { }
  })
  