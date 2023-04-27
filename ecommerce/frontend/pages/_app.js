import { StoreProvider } from '../utils/Store'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
  <StoreProvider>
     <Component {...pageProps} />
  </StoreProvider>
  );
}
