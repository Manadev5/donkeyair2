// import app css
import {useEffect} from 'react';

function App() {
  //  const [datas, setDatas] = useState<unknown>([]);

  const fetchDatas = async () => {
    try {
          const response = await fetch('https://localhost:7014/api/Admins', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          console.log(data);
          // datas.push(data)
          return data
      } catch (error) {
          console.error('Erreur lors de la récupération des données:', error);
      }
    }

    useEffect(() =>{
      fetchDatas().then((data) => { if (data) console.log(data)})
    },[])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>Manasse est beau !</p>
      </header>
    </div>
  );
}

export default App;
