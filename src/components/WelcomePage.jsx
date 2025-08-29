import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Welcome = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Verificar si hay usuario logueado
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            navigate('/login');
        } else {
            setUser(currentUser);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/login');
    };

    if (!user) return <div>Loading...</div>;

    return (
        <>
        <div className='all'>
            <div className="welcome-container">
                <div className="avatar">
                    {user.username.charAt(0).toUpperCase()}
                </div>
                <h2>Welcome, {user.username}!</h2>
                <div className="user-info">
                    <p><i class="fi fi-ts-envelopes"></i> {user.email}</p>
                    <p><i class="fi fi-tr-phone-call"></i> {user.telefono}</p>
                    <p><i class="fi fi-tr-calendar-lines"></i> {new Date(user.fechaNacimiento).toLocaleDateString()}</p>
                </div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
        </>
    );
}

export default Welcome;