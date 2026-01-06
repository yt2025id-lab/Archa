"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mantle, mantleSepoliaTestnet, sepolia } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";
import { ReactNode, useState } from "react";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

const config = createConfig({
  chains: [mantleSepoliaTestnet, mantle, sepolia],
  connectors: [
    injected(),
    walletConnect({
      projectId,
      metadata: {
        name: "Archa - Arisan On-Chain",
        description: "Platform arisan terdesentralisasi di Mantle Network",
        url: "https://arisanonchain.vercel.app",
        icons: ["https://arisanonchain.vercel.app/logo Archa.png"],
      },
    }),
  ],
  transports: {
    [mantleSepoliaTestnet.id]: http("https://rpc.sepolia.mantle.xyz"),
    [mantle.id]: http("https://rpc.mantle.xyz"),
    [sepolia.id]: http("https://gateway.tenderly.co/public/sepolia"),
  },
});

export function Web3Provider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
