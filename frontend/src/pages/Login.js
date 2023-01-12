import React from 'react';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/Login.css';

import APIService from '../components/APIService';
import { Context } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate()
    const { signin, signed, signout } = useContext(Context)

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [isRequesting, setIsRequesting] = useState(false)

    const handleEmail = (event) => {
        const value = event.target.value
        setEmail(value)
    }
    const handleSenha = (event) => {
        const value = event.target.value
        setSenha(value)
    }

    if (signed) { signout() }

    const handleSubmit = () => {
        //let values = {email: email, senha:senha}

        setIsRequesting(true)

        APIService.Logar(email,senha)
        .then(resp => {
            //criar no users-db
            //console.log(resp)
            if(resp[0] === true){
                const iduser = resp[2]
                const token = Math.random().toString(36).substring(2);
                var usuario = [{email, token, id:iduser}]
                localStorage.setItem("user_db", JSON.stringify(usuario))
                signin(email,senha,token,iduser)
                navigate('/')
            }else{alert(resp[1])}
            
        })
        .catch(error => console.log(error))
        .finally(
            setIsRequesting(false)
        )
    }

    const styleObj = { paddingLeft: '2.5rem', paddingRight: '2.5rem'};

    return (
     
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-9 col-lg-6 col-xl-5">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                    className="img-fluid" alt="Sample image"/>
                </div>
                <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                    <form>
                    <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                        <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                        <button type="button" className="btn btn-primary btn-floating mx-1">
                        <FontAwesomeIcon icon={['fab', 'facebook']} />
                        </button>

                        <button type="button" className="btn btn-primary btn-floating mx-1">
                        <FontAwesomeIcon icon={['fab', 'twitter']} />
                        </button>

                        <button type="button" className="btn btn-primary btn-floating mx-1">
                        <FontAwesomeIcon icon={['fab', 'linkedin']} />
                        </button>
                    </div>

                    <div className="divider d-flex align-items-center my-4">
                        <p className="text-center fw-bold mx-3 mb-0">Or</p>
                    </div>

                    
                    <div className="form-outline mb-4">
                        <input type={'email'} id="form3Example3" className="form-control form-control-lg"
                        placeholder="Enter a valid email address" 
                        value={email}
                        onChange={handleEmail}
                        />
                        <label className="form-label" htmlFor="form3Example3">Email address</label>
                    </div>

                    
                    <div className="form-outline mb-3">
                        <input type={'password'} id="form3Example4" className="form-control form-control-lg"
                        placeholder="Enter password" 
                        value={senha}
                        onChange={handleSenha}
                        />
                        <label className="form-label" htmlFor="form3Example4">Password</label>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        
                        <div className="form-check mb-0">
                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                        <label className="form-check-label" htmlFor="form2Example3">
                            Remember me
                        </label>
                        </div>
                        <a href="#!" className="text-body">Forgot password?</a>
                    </div>

                    <div className="text-center text-lg-start mt-4 pt-2">
                        <button type="button" className="btn btn-primary btn-lg"
                        style={styleObj}
                        onClick={handleSubmit}
                        disabled={senha.length < 3 || email === '' || isRequesting}
                        >Login</button>
                        <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/registro"
                            className="link-danger">Register</a></p>
                    </div>

                    </form>
                </div>
                </div>
            </div>
            <div
                className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
                
                <div className="text-white mb-3 mb-md-0">
                Copyright © 2023. All rights reserved.
                </div>
                
                <div>
                <a href="#!" className="text-white me-4">
                    <FontAwesomeIcon icon={['fab', 'facebook']} />
                </a>
                <a href="#!" className="text-white me-4">
                    <FontAwesomeIcon icon={['fab', 'twitter']} />
                </a>
                <a href="#!" className="text-white me-4">
                    <FontAwesomeIcon icon={['fab', 'linkedin']} />
                </a>
                <a href="#!" className="text-white">
                    <FontAwesomeIcon icon={['fab', 'google']} />
                </a>
                </div>
                
            </div>
        </section>
      
    )
  }

export default Login;