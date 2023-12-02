import React from 'react';
import Swal from 'sweetalert2';


function App() {
    const openSweetAlert = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Đăng nhập',
            html:
                '<input id="username" class="swal2-input" placeholder="Username">' +
                '<input id="password" type="password" class="swal2-input" placeholder="Password">',
            focusConfirm: false,
            showCancelButton: true,
            showClass: true,
            preConfirm: () => {
                return {
                    username: document.getElementById('username').value,
                    password: document.getElementById('password').value
                };
            }
        });

        if (formValues) {
            // Xử lý dữ liệu khi form được submit
            console.log('Username:', formValues.username);
            console.log('Password:', formValues.password);
        }
    };

    return (
        <div>
            <button onClick={openSweetAlert}>Sửa</button>
        </div>
    );
}

export default App;
