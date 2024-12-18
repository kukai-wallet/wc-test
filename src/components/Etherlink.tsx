import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { mainnet, } from '@reown/appkit/networks'
import { createAppKit, useAppKit, useAppKitAccount } from '@reown/appkit/react'
import { useSession } from '@walletconnect/modal-sign-react'
import { getAddressFromSession } from '../utils/wallet-connect'

const metadata = {
    name: 'My Website',
    description: 'My Website description',
    url: window.origin,
    icons: ['https://avatars.mywebsite.com/']
}

createAppKit({
    adapters: [new EthersAdapter()],
    networks: [mainnet],
    metadata,
    projectId: '23de374e5f65b9d07addeb1f8db8cea9',
    features: {
        analytics: true
    }
})

export function Etherlink() {
    const { open } = useAppKit()
    const { address, isConnected } = useAppKitAccount()
    const session = useSession()

    function handleConnect() {
        open()
    }

    function handleAction() {
        const tezosAddress = getAddressFromSession(session)
        alert(`swapping between ${tezosAddress} and ${address}`)
    }

    return (
        <section>
            <button onClick={handleConnect}>
                {isConnected ? "Disconnect Etherlink" : "Connect Etherlink"}
            </button>
            {isConnected &&
                <div>
                    <br />
                    <div>Etherlink Address: {address}</div>
                    <br />
                    <button disabled={!session} onClick={handleAction}>Swap</button>
                </div>
            }
        </section>
    )
}
