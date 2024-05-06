import { useState } from 'react';
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

  const [jobsList, setJobsList] = useState([]);

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
