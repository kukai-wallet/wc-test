import { useConnect, useDisconnect, useSession, WalletConnectModalSign } from '@walletconnect/modal-sign-react';
import { getSdkError } from '@walletconnect/utils';
import { useEffect, useState } from 'react';
import './App.css';
import { CLIENT_CONFIG, MODAL_OPTIONS } from './utils/wallet-connect';

function getAddressFromSession(session: any) {
  if (!session) {
    return ""
  }

  const allNamespaceAccounts = Object.values(session.namespaces)
    .map((namespace: any) => namespace.accounts)
    .flat()

  return allNamespaceAccounts[0] ? allNamespaceAccounts[0].split(':')[2] : ''
}

const TEZOS_NAMESPACE = {
  "tezos": {
    chains: [`tezos:mainnet`],
    events: [],
    methods: ["tezos_send", "tezos_sign"]
  }
}

function hasSession() {
  return !!localStorage.getItem("wc2:hasSession")
}

function saveSession() {
  localStorage.setItem("wc2:hasSession", "true")
}

function deleteSession() {
  localStorage.removeItem("wc2:hasSession")
}

function App() {
  const session = useSession()
  const [isReady, setReady] = useState(false)
  const { connect } = useConnect({ requiredNamespaces: TEZOS_NAMESPACE, })
  const { disconnect } = useDisconnect({ topic: "", reason: getSdkError("USER_DISCONNECTED") })
  console.log(session)
  const activeAddress = getAddressFromSession(session)

  useEffect(() => {
    const expectedSession = hasSession()

    if (session) {
      setReady(true)
      saveSession()
    } else if (!expectedSession) {
      setReady(true)
    }
  }, [session])

  async function handleNew() {
    try {
      await connect();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDisconnect() {
    await disconnect({ topic: session!.topic, reason: getSdkError("USER_DISCONNECTED") })
    deleteSession()
  }

  return (
    <main>
      <h1>Tezos DApp</h1>
      {!activeAddress ? (
        <button onClick={handleNew} disabled={!isReady || !!activeAddress}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected Address: {activeAddress}</p>
          <button onClick={handleDisconnect} disabled={!isReady || !activeAddress}>Disconnect Wallet</button>
        </div>
      )}

      <WalletConnectModalSign projectId={CLIENT_CONFIG.projectId} metadata={CLIENT_CONFIG.metadata} modalOptions={MODAL_OPTIONS} />
    </main>
  )
}

export default App
