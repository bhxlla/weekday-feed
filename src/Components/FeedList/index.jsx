import { useCallback, useContext, useMemo } from "react";

import { FeedElement } from "../FeedElement";
import { FeedFilters } from "../FeedFilters";
import { Feed } from "../Feed";

import { FeedContext } from "../../Utils/FeedContext";
import { useCatchFilterValues } from "../../Utils/hooks";
import { filterJobListByAppliedFilters } from "../../Utils/Filter";

// Takes list data as props, main purpose is to decouple filtering from loading job list.
export const FeedList = ({
    list, onEndReached, bottomLoading
  }) => {
  
    const { appliedFilters } = useContext(FeedContext)
    useCatchFilterValues(list);
  
    const getKey = useCallback(el => el.jdUid, [])
    const renderItem = useCallback((el) => <FeedElement {...el} />, [])
    const renderFooter = useCallback(() => bottomLoading ? (<h1>LOADING</h1>) : <></>, [bottomLoading])
  
    const filteredList = useMemo(() => filterJobListByAppliedFilters(list, appliedFilters), [appliedFilters, list])
  
    return (
      <>
        <FeedFilters />
        <section className="feed-page" >
          <Feed
            list={filteredList}
            onEndReached={onEndReached}
            keyExtractor={getKey}
            renderItem={renderItem}
            renderFooter={renderFooter}
          />
        </section>
      </>
    )
  }
  