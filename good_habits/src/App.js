import './App.css';
import React from "react";
// import { get } from './utils/fetch';

const CLIENT_ID = '600958172796-05nnr8dkvl4h6u9hm4r6lc6slt3plhfh.apps.googleusercontent.com';

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
          <p>{!data ? "Loading...": data}</p>
      </header>
    </div>
  )
  } 

export default App;