import './AuthForm.css';
import PropTypes from "prop-types";
import obucLogo from "../../assets/obuc-logo.png";
import { Link, useLocation } from 'react-router-dom';

export default function AuthForm({ title, fields, buttonText, onSubmit, helpText, signupLink, errorMessage }) {
  const location = useLocation();
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
      <img  src={obucLogo} className='image-logo' alt="Obuc logo" />
        <h2 className="title">{title}</h2>
        {fields.map((field, index) => (
          <input
            key={index}
            type={field.type}
            placeholder={field.placeholder}
            className="input"
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            required
          />
        ))}
        <p className='error-message'> {errorMessage} </p>
        <button type="submit" className="button">{buttonText}</button>
        <p className='help-text'>{helpText} <Link to={`${location.pathname === '/login' ? '/register': '/login'}`}>{signupLink}</Link></p>
      </form>
    </div>
  );
};

AuthForm.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
  })).isRequired, 
  buttonText: PropTypes.string.isRequired, 
  onSubmit: PropTypes.func.isRequired,
  helpText: PropTypes.string.isRequired,
  signupLink: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
};