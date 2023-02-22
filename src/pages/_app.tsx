// src/pages/_app.tsx
import type { AppType } from "next/dist/shared/lib/utils";
import * as Sentry from "@sentry/nextjs";

import "../styles/globals.css";
import Layout from "../components/UI/Layout";
import { QueryClient, QueryClientProvider } from 'react-query'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { optimism, arbitrum } from 'wagmi/chains';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 1.0,
});

const { chains, provider } = configureChains(
  [optimism, arbitrum],
  [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Otus: Options Calculator',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

const queryClient = new QueryClient()

const MyApp: AppType = ({ Component, pageProps }) => {
  return <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout >
      </QueryClientProvider>
    </RainbowKitProvider>
  </WagmiConfig>;
};

export default MyApp; 
