import { Fragment } from 'react/jsx-runtime';
import './App.css';
import { Etherlink } from './components/Etherlink';
import { Tezos } from './components/Tezos';

function App() {
  return (
    <Fragment>
      <Tezos />
      <Etherlink />
    </Fragment>
  )
}

export default App
