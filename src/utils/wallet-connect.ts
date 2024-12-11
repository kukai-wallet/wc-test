
export const CLIENT_CONFIG = {
    projectId: '5d690cb34ae027495f2d0c728fef3ef0',
    metadata: {
        name: 'Test Dapp 2',
        description: 'test',
        url: "localhost",
        icons: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr611v6vUxwhOOA_EGfyuDTXeZTNkGBYgVVg&s"]
    }
}

export const MODAL_OPTIONS = {
    explorerExcludedWalletIds: 'ALL',
    themeMode: "dark",
    mobileWallets: [{
        name: "Kukai",
        id: "kukai",
        links: {
            // universal: "",
            native: "kukai://"
        }
    }],
    desktopWallets: [{
        name: "Kukai",
        id: "kukai",
        links: {
            // universal: "",
            native: "kukai://",
        }
    }],
    walletImages: { "kukai": "https://wallet.kukai.app/assets/img/header-logo1.svg" },
} as unknown as any

// export const Modal = new WalletConnectModal({
//     projectId: CLIENT_CONFIG.projectId,
//     ...MODAL_OPTIONS,
//     chains: ["tezos"]
//     // chains: ["tezos:mainnet", "tezos:ghostnet"],
// });