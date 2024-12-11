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
            native: "kukai://"
        }
    }],
    desktopWallets: [{
        name: "Kukai",
        id: "kukai",
        links: {
            native: "kukai://",
        }
    }],
    walletImages: { "kukai": "https://wallet.kukai.app/assets/img/header-logo1.svg" },
} as unknown as any

export function getAddressFromSession(session: any) {
    if (!session) {
        return ""
    }

    const allNamespaceAccounts = Object.values(session.namespaces)
        .map((namespace: any) => namespace.accounts)
        .flat()

    return allNamespaceAccounts[0] ? allNamespaceAccounts[0].split(':')[2] : ''
}

export const TEZOS_NAMESPACE = {
    "tezos": {
        chains: [`tezos:mainnet`],
        events: [],
        methods: ["tezos_send", "tezos_sign"]
    }
}

export function hasSession() {
    return !!localStorage.getItem("wc2:hasSession")
}

export function saveSession() {
    localStorage.setItem("wc2:hasSession", "true")
}

export function deleteSession() {
    localStorage.removeItem("wc2:hasSession")
}