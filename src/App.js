import { Fragment, useCallback, useEffect, useState } from 'react';
import Api from './Utils/Api'
import './App.css';

function App() {

  return (
    <main className="App">
      <h3>Hey!</h3>
      <FeedPage />
    </main>
  );
}

const INIT_PAGE_SIZE = 30;
const NEXT_PAGE_SIZE = 20;

const FeedPage = () => {

  
  const [jobsList, setJobsList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [bottomLoading, setBottomLoading] = useState(false);
  const [ended, setEnded] = useState(false);

  const getData = useCallback(() => {
    const { fetchData, cancel } = Api.fetcher(offset, offset === 0 ? INIT_PAGE_SIZE : NEXT_PAGE_SIZE)
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
    if (bottomLoading || ended) { return; }
    setBottomLoading(true);
    getData();
  }, [getData, bottomLoading, setBottomLoading, ended])

  const getKey = useCallback(el => el.jdUid, [])

  const renderItem = useCallback((el) => (
    <p>{el.companyName}, {el.jobRole}</p>
  ), [])

  const renderFooter = useCallback(() => bottomLoading ? (<h1>LOADING</h1>) : <></>, [bottomLoading])

  return (
    <section>
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

const Feed = ({ list, onEndReached, keyExtractor, renderItem, renderFooter }) => {

  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= window.document.body.offsetHeight - 32) {
        onEndReached();
      }
    }
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll);
  }, [onEndReached])

  return (
    <>
      {
        list.map((element, index) => (
          <Fragment key={keyExtractor(element, index)} >
            {renderItem(element, index)}
          </Fragment>
        ))
      }
      {
        renderFooter()
      }
    </>
  )

}

export default App;
