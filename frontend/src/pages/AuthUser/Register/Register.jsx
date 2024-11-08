import { useState } from "react";
import AuthForm from "../../../components/AuthForm/AuthForm";
import { api } from "../../../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      const response = await api.post("/register", {
        userName: user.username,
        password: user.password,
      });
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (err) {
      setError('Usuário já cadastrado');
      console.error(err.response.data.error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <AuthForm
      title="Fazer Cadastro"
      fields={[
        {
          type: "text",
          placeholder: "Usuário",
          name: "username",
          value: user.username,
          onChange: handleInputChange,
        },
        {
          type: "password",
          placeholder: "Senha",
          name: "password",
          value: user.password,
          onChange: handleInputChange,
        },
      ]}
      errorMessage={error}
      buttonText="Registrar"
      onSubmit={handleRegister}
      helpText="Já tem login?"
      signupLink="Fazer login"
    />
  );
}
