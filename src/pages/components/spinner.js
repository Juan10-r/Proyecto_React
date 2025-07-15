import { useEffect } from 'react';
import Swal from 'sweetalert2';

function Spinner() {
    useEffect(() => {
        Swal.fire({
            title: 'Cargando...',
            text: 'Por favor espera.',
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        return () => {
            Swal.close();
        };
    }, []);

    return null;
}

export default Spinner;




// function Spinner() {
//     return (
//         <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//             <div className="spinner-border text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//             </div>
//         </div>
//     );
// }

// export default Spinner;