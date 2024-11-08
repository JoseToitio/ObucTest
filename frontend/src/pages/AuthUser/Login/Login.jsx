import { useState } from "react";
import AuthForm from "../../../components/AuthForm/AuthForm";
import { api } from "../../../services/api";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", {
        userName: user.username,
        password: user.password,
      });
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate('/');
      }
    } catch (err) {
      setError('Usuário não encontrado');
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
      title="Fazer Login"
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
      buttonText="Entrar"
      onSubmit={handleLogin}
      helpText="Não tem cadastro?"
      signupLink="Crie uma conta"
    />
  );
}
