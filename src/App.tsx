import useRouteElements from '@/hooks/useRouteElements';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const routeElements = useRouteElements();
  return (
    <div>
      {routeElements}
      <ToastContainer closeButton={false} />
    </div>
  );
}

export default App;
