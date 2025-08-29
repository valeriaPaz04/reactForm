import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LoginForm = () => {
    // El estado loginData se utiliza para almacenar los datos del formulario (email, password).
    // En este caso, se está utilizando para almacenar los datos del formulario de inicio de sesión.
    //setLoginData es una función que se utiliza para actualizar el estado loginData.
    
    const [progress, setProgress] = useState(0);

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
    let filledCount = 0;
    if (loginData.email.trim() !== '') {
      filledCount++;
    }
    if (loginData.password.trim() !== '') {
      filledCount++;
    }
    
    // Calcula el progreso: 0/2=0, 1/2=50, 2/2=100
    setProgress((filledCount / 2) * 100);
  }, [loginData]);
    // El estado error se utiliza para almacenar mensajes de error que se muestran al usuario.
    // En este caso, se está utilizando para mostrar mensajes de error cuando el usuario no introduce un email o contraseña.
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setLoginData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validar campos vacíos
        if (!loginData.email || !loginData.password) {
            setError('Por favor, complete todos los campos');
            return;
        }

        // Validar formato de email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
            setError('Por favor ingrese un email válido');
            return;
        }

        // Obtener usuarios registrados
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Buscar usuario por email
        const user = users.find(u => 
            u.email === loginData.email && 
            u.password === loginData.password
        );

        if (user) {
            // Guardar sesión (en un caso real usaríamos tokens/JWT)
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            // Redirigir a welcome
            navigate('/welcome');
        } else {
            alert('Email o contraseña incorrectos');
        }
    };

    return (
        <>
        <div className="padre">
            <div className="login-container">
                <div className="dos">
                    <h2>Listo para iniciar sesión<br/>en tu cuenta?</h2>
                    <p>Ingresa tus credenciales para <br/> continuar a la página de inicio.</p>
                </div>
                <form id="loginForm" onSubmit={handleSubmit}>
                    
                    <div className="inputGroup">
                        <input type="email" id="email" name="email" placeholder=" " required value={loginData.email} onChange={handleChange} autoComplete=""/>
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="inputGroup">
                        <input type="password" id="password" name="password" placeholder=" " required value={loginData.password} onChange={handleChange}autoComplete="current-password"/>
                        <label htmlFor="password">Password</label>
                    </div>
                    
                    <p className="user">No tienes una cuenta? <Link to="/register">Registrate</Link></p>
                    <button type="submit">Iniciar Sesión</button>
                </form>
            </div>

            <div className="imagen">
                {/* Capa 1: Fondo B&W (tu imagen original) */}
                <img className="bw" src="https://img.freepik.com/vector-gratis/mujer-llamando-puerta-cerrada-cerrada_74855-5303.jpg?t=st=1756218454~exp=1756222054~hmac=fd7361ec3723516323336aa94df59ca0c6667609d34001513ce3566d257a9294&w=1060" alt="Login" />

                {/* Capa 2: Imagen de la mitad. Se hace visible solo si el progreso es 50% */}
                <div className={`half-image ${progress === 50 ? 'visible' : ''}`}></div>

                {/* Capa 3: Imagen a color. Se hace visible solo si el progreso es 100% */}
                <div className={`full-color-image ${progress === 100 ? 'visible' : ''}`}></div>
            </div> 
        </div>
        </>
    );
};

export default LoginForm;