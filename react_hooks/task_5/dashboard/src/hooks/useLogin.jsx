import { useState } from 'react';

function useLogin(onLogin) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [enableSubmit, setEnableSubmit] = useState(false);

    const validateForm = (email, password) => {
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const isValidPassword = password.length >= 8;
        setEnableSubmit(isValidEmail && isValidPassword);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        const updatedData = { ...formData, [id]: value };
        setFormData(updatedData);
        validateForm(updatedData.email, updatedData.password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(formData.email, formData.password);
    };

    return {
        email: formData.email,
        password: formData.password,
        enableSubmit,
        handleChange,
        handleSubmit,
    };
}

export default useLogin;
