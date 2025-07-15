import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../Firebase';
import Spinner from './spinner';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);
  const [fakeLoading, setFakeLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setFakeLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && !fakeLoading && !user) {
      Swal.fire({
        icon: 'warning',
        title: 'Acceso restringido',
        text: 'Debes iniciar sesión para acceder a esta página.',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        navigate('/', { replace: true });
      });
    }
  }, [loading, fakeLoading, user, navigate]);

  if (loading || fakeLoading) {
    return <Spinner />;
  }

  if (!user) {
    return null;
  }

  return children;
}

export default ProtectedRoute;



// import { Navigate } from 'react-router-dom';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from '../../firebase';
// import Spinner from './Spinner';

// function ProtectedRoute({ children }) {
//   const [user, loading] = useAuthState(auth);
//   if (loading) {
//     return <Spinner />;
//   }
//   if (!user) {
//     return <Navigate to="/" replace />;
//   }
//   return children;
// }

// export default ProtectedRoute;

// import { Navigate } from 'react-router-dom';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from '../../firebase';
// import Spinner from './Spinner';
// import { useEffect, useState } from 'react';
// import Swal from 'sweetalert2';

// function ProtectedRoute({ children }) {
//   const [user, loading] = useAuthState(auth);
//   const [fakeLoading, setFakeLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setFakeLoading(false);
//     }, 3000);
//     return () => clearTimeout(timer);
//   }, []);

//   if (loading || fakeLoading) {
//     return <Spinner />;
//   }

//   if (!user) {
//     Swal.fire({
//       icon: 'warning',
//       title: 'Acceso restringido',
//       text: 'Debes iniciar sesión para acceder a esta página.',
//       timer: 2000,
//       showConfirmButton: false
//     });
//     return <Navigate to="/" replace />;
//   }

//   return children;
// }

// export default ProtectedRoute;