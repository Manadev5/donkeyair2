import logo from './logo.svg';
import './App.css';

function App() {

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
      } catch (error) {
          console.error('Erreur lors de la récupération des données:', error);
      }
    }

    fetchDatas();
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
