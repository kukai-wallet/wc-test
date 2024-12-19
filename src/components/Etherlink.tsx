import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { etherlink } from '@reown/appkit/networks'
import { createAppKit, useAppKit, useAppKitAccount, useAppKitProvider } from '@reown/appkit/react'
import { BrowserProvider, Eip1193Provider, parseEther, TransactionRequest } from 'ethers'
import { ChangeEvent, useState } from 'react'
import { TextArea } from './TextArea'


const SAMPLE_TRANSACTION = {
    to: "0x39e8fa979Dd39946881d07e3946bD7A037a3d7B5",
    value: "1",
    data: "0x",
    gasLimit: 1,
};

const metadata = {
    name: 'My Website',
    description: 'My Website description',
    url: window.origin,
    icons: ['https://avatars.mywebsite.com/']
}

createAppKit({
    adapters: [new EthersAdapter()],
    networks: [etherlink],
    metadata,
    projectId: '23de374e5f65b9d07addeb1f8db8cea9',
    features: {
        analytics: true
    }
})

export function Etherlink() {
    const [isPayloadValid, setIsPayloadValid] = useState(true)
    const [operations, setOperations] = useState(SAMPLE_TRANSACTION)

    const { open } = useAppKit()
    const { walletProvider } = useAppKitProvider("eip155")

    const { address, isConnected } = useAppKitAccount()

    function handleConnect() {
        open()
    }

    async function handleSubmit() {
        const ethersProvider = new BrowserProvider(walletProvider as Eip1193Provider)

        try {
            const signer = await ethersProvider.getSigner()

            const sanitizedOperations = structuredClone(operations) as TransactionRequest
            sanitizedOperations.value = parseEther(String(operations.value))

            const txResponse = await signer.sendTransaction(operations)
            await txResponse.wait()

            console.log("Transaction response:", txResponse)
        } catch (error) {
            console.error("Transaction failed:", error)
        }
    }

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
        const { value } = e.currentTarget

        try {
            const payload = JSON.parse(value)
            setIsPayloadValid(true)
            setOperations(payload)
        } catch {
            setIsPayloadValid(false)
        }
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
                </div>
            }
            <div>
                <br />
                <TextArea defaultValue={JSON.stringify(SAMPLE_TRANSACTION, undefined, 4)} onChange={handleChange} />
                <br />
                <button disabled={!isConnected || !isPayloadValid} onClick={handleSubmit}>Submit</button>
            </div>
        </section>
    )
}
