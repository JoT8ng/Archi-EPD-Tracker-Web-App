import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SessionContext } from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));

const AppWithSession = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const [sessionID, setSessionID] = useState(null);

    // Fetch and store the session ID
    const getSessionID = async () => {
        try {
            const response = await fetch(`${backendUrl}/sessionid`, {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                // Store the session ID
                setSessionID(data.session_id);
            } else {
                console.error('Failed to retrieve session ID');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Fetch the session ID when the component mounts
    useEffect(() => {
        getSessionID();
    }, []);

  return (
    <SessionContext.Provider value={sessionID}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SessionContext.Provider>
  );
};

root.render(
  <AppWithSession />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
