import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../hooks/useAuth';
import { Provider } from 'react-redux';
import store from '../store/configureStore';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<AuthProvider>
				<Component {...pageProps} />
			</AuthProvider>
		</Provider>
	);
}

export default MyApp;
