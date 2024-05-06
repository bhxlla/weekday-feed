import { useCallback, useEffect, useState } from "react";
import ApiUtils from "../../Utils/Api";
import { FeedElement } from "../FeedElement";
import { Feed } from '../Feed';

import './style.css';

const INIT_PAGE_SIZE = 30;
const NEXT_PAGE_SIZE = 20;

export const FeedPage = () => {

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
    console.log("END");
    if (bottomLoading || ended) { return; }
    setBottomLoading(true);
    getData();
  }, [getData, bottomLoading, setBottomLoading, ended])

  const getKey = useCallback(el => el.jdUid, [])

  const renderItem = useCallback((el) => (
    <FeedElement {...el} />
  ), [])

  const renderFooter = useCallback(() => bottomLoading ? (<h1>LOADING</h1>) : <></>, [bottomLoading])

  return (
    <section className="feed-page" >
      <Feed
        list={jobsList}
        onEndReached={onEndReached}
        keyExtractor={getKey}
        renderItem={renderItem}
        renderFooter={renderFooter}
      />
    </section>
  )

}
