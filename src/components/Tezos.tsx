import { useConnect, useDisconnect, useSession, WalletConnectModalSign } from '@walletconnect/modal-sign-react';
import { getSdkError } from '@walletconnect/utils';
import { useEffect, useState } from 'react';
import { CLIENT_CONFIG, deleteSession, getAddressFromSession, hasSession, MODAL_OPTIONS, saveSession, TEZOS_NAMESPACE } from '../utils/wallet-connect';

export function Tezos() {
    const [isReady, setReady] = useState(false)

    const session = useSession()
    const { connect } = useConnect({ requiredNamespaces: TEZOS_NAMESPACE })
    const { disconnect } = useDisconnect({ topic: "", reason: getSdkError("USER_DISCONNECTED") })

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
        } catch (error) {
            console.error(error);
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
                <button onClick={handleNew} disabled={!isReady || !!activeAddress}>Connect Tezos</button>
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

