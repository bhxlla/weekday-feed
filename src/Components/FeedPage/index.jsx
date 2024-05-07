import { memo, useCallback, useEffect, useState } from "react";
import { FeedList } from "../FeedList";

import ApiUtils from "../../Utils/Api";
import { FeedContext } from "../../Utils/FeedContext";

import './style.css';

const INIT_PAGE_SIZE = 30;
const NEXT_PAGE_SIZE = 20;

// Main Component, Entry Point After App.js, uses FeedContext to pass filterValues and selector callbacks.
export const FeedPage = () => {

  const [filterValues, setFilterValues] = useState({});
  const [appliedFilters, setAppliedFilters] = useState({});

  return (
    <FeedContext.Provider
      value={{ filterValues, appliedFilters, setFilterValues, setAppliedFilters }}
    >
      <MemoizedFeedComponent />
    </FeedContext.Provider>
  )
}

// Handles all the JOB Feed Loading. Used Directly in FeedPage.
const FeedComponent = () => {

  const [jobsList, setJobsList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [bottomLoading, setBottomLoading] = useState(false);
  const [ended, setEnded] = useState(false);

  const getData = useCallback(() => {
    const { fetchData, cancel } = ApiUtils.fetcher(offset, offset === 0 ? INIT_PAGE_SIZE : NEXT_PAGE_SIZE)
    setBottomLoading(true);
    fetchData()
      .then(({ offset, jdList, end }) => {
        setJobsList(list => [...list, ...jdList]);
        setOffset(offset);
        setEnded(end)
      })
      .catch(() => { })
      .finally(() => setBottomLoading(false))
    return cancel;
  }, [offset, setBottomLoading])

  useEffect(() => {
    const cancelReq = getData()
    return cancelReq;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onEndReached = useCallback(() => {
    // console.log("END");
    if (bottomLoading || ended) { return; }
    setBottomLoading(true);
    getData();
  }, [getData, bottomLoading, setBottomLoading, ended])

  return (
    <FeedList
      list={jobsList}
      onEndReached={onEndReached}
      bottomLoading={bottomLoading}
    />
  )
}

const MemoizedFeedComponent = memo(FeedComponent);