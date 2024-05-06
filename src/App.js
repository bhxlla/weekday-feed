import { useCallback, useEffect, useState } from 'react';
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

const FeedPage = () => {

  const PAGE_SIZE = 20;
  const [jobsList, setJobsList] = useState([]);
  const [offset, setOffset] = useState(0);

  const getData = useCallback(() => {
    const { fetchData, cancel } = Api.fetcher(offset, PAGE_SIZE)
    fetchData()
    .then(({ offset, jdList }) => {
      setJobsList(list => [...list, ...jdList]);
      setOffset(offset);
    })
    .catch(() => {})
    return cancel;
  }, [offset])

  useEffect(() => {
    const cancelReq = getData()
    return cancelReq;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section>
      <Feed list={jobsList} />
    </section>
  )

}

const Feed = ({ list }) => {

  return list.map(el => (
    <div key={el.jdUid} >
      <p>{el.companyName}, {el.jobRole}</p>
    </div>
  ))

}


export default App;
