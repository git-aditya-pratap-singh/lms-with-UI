import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { PrimeReactProvider } from "primereact/api";
import { Provider } from "react-redux";
import Store from "./app/Store/Store";
import AuthGuard from "./app/_guard/auth.guard";

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthGuard>
    <Provider store={Store}>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </Provider>
  </AuthGuard>
)
