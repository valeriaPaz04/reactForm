import React, { useState, useEffect } from 'react';

const RegisterForm = () => {

    const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    telefono: '',
    fechaNacimiento: ''
    });

    // Estado para el progreso de la imagen
    const [progress, setProgress] = useState(0);

    // useEffect para calcular el progreso basado en los 5 campos
    useEffect(() => {
        let filledCount = 0;
        if (formData.username.trim() !== '') filledCount++;
        if (formData.password.trim() !== '') filledCount++;
        if (formData.email.trim() !== '') filledCount++;
        if (formData.telefono.trim() !== '') filledCount++;
        if (formData.fechaNacimiento.trim() !== '') filledCount++;
        
        // Progreso en 5 pasos: 0, 20, 40, 60, 80, 100
        setProgress((filledCount / 5) * 100);
    }, [formData]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar que todos los campos estén completos
        if (!formData.username || !formData.password || !formData.email ||
            !formData.telefono || !formData.fechaNacimiento) {
            alert('Por favor, complete todos los campos');
            return;
        }

        // Obtener usuarios existentes del localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Verificar si el usuario ya existe
        const userExists = users.some(user => user.email === formData.email);
        if (userExists) {
            alert('El email ya está registrado');
            return;
        }

        // Agregar nuevo usuario
        const newUser = {
            id: Date.now(), // ID único basado en timestamp
            ...formData,
            fechaRegistro: new Date().toISOString()
        };

        users.push(newUser);

        // Guardar en localStorage (simulando un archivo JSON)
        localStorage.setItem('users', JSON.stringify(users));

        alert('Registro exitoso!');

        // Limpiar el formulario
        setFormData({
            username: '',
            password: '',
            email: '',
            telefono: '',
            fechaNacimiento: ''
        });
    };


        return (
        <>
        <div className="padre">
            <div className="register-container">
                <div className="two">
                    <h2>¡Únete a nosotros!</h2>
                    <p>Completa el formulario para crear tu cuenta y<br/>comenzar tu experiencia.</p>
                </div>

                <form id="registerForm" autoComplete="off" onSubmit={handleSubmit}>

                    <div className="inputGroup">
                        <input type="text" id="username" name='username' placeholder=" " required autoComplete="off" value={formData.username} onChange={handleChange} />
                        <label htmlFor="username">Nombre Completo</label>
                    </div>
                    <div className="inputGroup">
                        <input type="password" id="password" name='password' placeholder=" " required autoComplete="off" value={formData.password} onChange={handleChange} />
                        <label htmlFor="password">Contraseña</label>
                    </div>
                    <div className="inputGroup">
                        <input type="email" id="email" name='email' placeholder=" " required autoComplete="off" value={formData.email} onChange={handleChange} />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="inputGroup">
                        <input type="tel" id="telefono" name='telefono' placeholder=" " required autoComplete="off" value={formData.telefono} onChange={handleChange} />
                        <label htmlFor="telefono">Teléfono</label>
                    </div>
                    <div className="inputGroup">
                        <input type="date" id="fechaNacimiento" name='fechaNacimiento' placeholder=" " required autoComplete="off" value={formData.fechaNacimiento} onChange={handleChange} />
                        <label htmlFor="fecha-nacimiento">Fecha Nacimiento</label>
                    </div>
                    
                    <p className="registerUser">¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link></p>
                    <button type="submit">Registrar</button>
                </form>
            </div>

            <div className="imagendos">
                {/* Capa 1: Fondo B&W */}
                <img src="https://img.freepik.com/vector-premium/homosexuales-ponen-marca-verificacion-barra-tareas-concepto-realizar-tareas-resolver-problemas_253334-151.jpg?w=1060" alt="" className="bw2"/>
                
                {/* Las 5 capas que se harán visibles según el progreso */}
                <div className={`register-layer-1 ${progress >= 20 ? 'visible' : ''}`}></div>
                <div className={`register-layer-2 ${progress >= 40 ? 'visible' : ''}`}></div>
                <div className={`register-layer-3 ${progress >= 60 ? 'visible' : ''}`}></div>
                <div className={`register-layer-4 ${progress >= 80 ? 'visible' : ''}`}></div>
                <div className={`register-layer-5 ${progress >= 100 ? 'visible' : ''}`}></div>
            </div> 
        </div>
        </>
    );
};

export default RegisterForm;