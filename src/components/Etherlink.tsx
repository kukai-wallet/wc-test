import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { mainnet, } from '@reown/appkit/networks'
import { createAppKit, useAppKit } from '@reown/appkit/react'

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

    function handleClick() {
        open()
    }

    return (
        <section>
            <button onClick={handleClick}>Connect Etherlink</button>
        </section>
    )
}
