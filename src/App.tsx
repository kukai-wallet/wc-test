import './App.css';
import { Etherlink } from './components/Etherlink';
import { Tezos } from './components/Tezos';

function App() {
  return (
    <main>
      <h2>Tezos Etherlink Bridge</h2>
      <br />
      <Tezos />
      <hr />
      <Etherlink />
    </main>
  )
}

export default App
