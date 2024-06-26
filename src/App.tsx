import { AppContext } from '@/contexts/app.context';
import useRouteElements from '@/hooks/useRouteElements';
import { localStorageEventTarget } from '@/utils/auth';
import { useEffect, useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const routeElements = useRouteElements();
  const { reset } = useContext(AppContext);
  useEffect(() => {
    localStorageEventTarget.addEventListener('clearLS', reset);

    return () => {
      localStorageEventTarget.removeEventListener('clearLS', reset);
    };
  }, [reset]);

  return (
    <div>
      {routeElements}
      <ToastContainer closeButton={false} />
    </div>
  );
}

export default App;
