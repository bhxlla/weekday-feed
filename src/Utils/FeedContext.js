import { createContext } from "react";

export const FeedContext = createContext({
    filterValues: {},
    appliedFilters: {},
    setFilterValues: () => { },
    setAppliedFilters: () => { }
  })
  