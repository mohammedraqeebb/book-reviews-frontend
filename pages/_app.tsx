import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Header from '../components/header/header.component';
import Navbar from '../components/navbar/navbar.component';
import buildClient from '../api/build-client';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import Portal from '../hoc/portal';

export const BACKEND_URL =
  'https://book-reviews-backend-latest.onrender.com/api';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Header />
        <Component {...pageProps} />
        <Navbar />
      </Provider>
    </>
  );
}
