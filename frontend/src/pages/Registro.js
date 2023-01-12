import React, { useContext } from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/Registro.css';
import { useNavigate } from 'react-router-dom';
import { Context } from '../Context/AuthContext';
import APIService from '../components/APIService';

const Registro = () => {

    const navigate = useNavigate()
    const { signed, signout } = useContext(Context)

    const [nome, setNome] = useState("")
    const [tel, setTel] = useState('')
    const [cpf, setCPF] = useState('')
    const [nascimento, setNascimento] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [senha2, setSenha2] = useState('')
    const [erro, setErro] = useState('')
    const [isRequesting, setIsRequesting] = useState(false)

    const handleName = (event) => {
      let badValues = /[^A-Za-z]+/gi
      var value = event.target.value.split(' ').map(n => n.replace(badValues, ''))
      var string2 = ""
      value.map(p => string2 === '' ? string2 += p : string2 += " " + p)
      setNome(string2)
    }
    const handleTel = (event) => {
      const value = event.target.value.replace(/\D/g,'')
      setTel(value)
    }
    const handleCPF = (event) => {
      const value = event.target.value.replace(/\D/g,'')
      setCPF(value)
    }
    const handleNascimento = (event) => {
      const value = event.target.value
      setNascimento(value)
    }
    const handleEmail = (event) => {
        const value = event.target.value
        setEmail(value)
    }
    const handleSenha = (event) => {
        const value = event.target.value
        setSenha(value)
    }
    const handleSenha2 = (event) => {
      const value = event.target.value
      setSenha2(value)
    }

    if (signed) { signout() }

    const handleSubmit = (event) => {
        //let values = {email: email, senha:senha}
        if(senha !== senha2){
          setErro("As senhas precisam ser iguais")
          return;
        }

        event.preventDefault()

        
        setIsRequesting(true)

        const dados = {nome, tel, cpf, nascimento, email, senha}

        APIService.Registrar(dados)
        .then(resp => {
          //console.log(resp)
          if(resp[0] === true){
            alert(resp[1])
            navigate('/login')
          }else{
            alert(resp[1])
          }
          //alert('Usuário cadastrado com sucesso')

        })
        .catch(error => console.log(error))
        .finally(
            setIsRequesting(false)
        )
    }

    return (
     
      <div className='container col-md-4'> 
          <div className='text-center'>
          <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
          <li className="nav-item" role="presentation">
              <a className="nav-link active" id="tab-login" data-mdb-toggle="pill" href="/login" role="tab"
              aria-controls="pills-login" aria-selected="true">Login</a>
          </li>
          <li className="nav-item" role="presentation">
              <a className="nav-link" id="tab-register" data-mdb-toggle="pill" href="#" role="tab"
              aria-controls="pills-register" aria-selected="false">Register</a>
          </li>
          </ul>
          
        
          <div className="tabela-registro">
          <form>
            <div className="text-center mb-3">
              <p>Sign up with:</p>
              <button type="button" className="btn btn-link btn-floating mx-1">
              <FontAwesomeIcon icon={['fab', 'facebook']} />
              </button>

              <button type="button" className="btn btn-link btn-floating mx-1">
              <FontAwesomeIcon icon={['fab', 'google']} />
              </button>

              <button type="button" className="btn btn-link btn-floating mx-1">
              <FontAwesomeIcon icon={['fab', 'twitter']} />
              </button>

              <button type="button" className="btn btn-link btn-floating mx-1">
              <FontAwesomeIcon icon={['fab', 'github']} />
              </button>
            </div>

            <p className="text-center">or:</p>

            
            <div className="form-outline mb-1">
                  <input type="text" id="nameForm" className="form-control form-control-lg"
                    value={nome} onChange={handleName}
                    placeholder="Enter as a name" />
                  <label className="form-label" htmlFor="nameForm">Nome</label>
                </div>

              <div className="form-outline mb-1">
                  <input type="nome" id="telFor" className="form-control form-control-lg"
                  value={tel}
                  onChange={handleTel}
                    placeholder="Telefone" />
                  <label className="form-label" htmlFor="telFor">Telefone</label>
                </div>

            
            <div className="form-outline mb-1">
                  <input type="cpf" id="cpfForm" className="form-control form-control-lg"
                  value={cpf}
                  onChange={handleCPF}
                    placeholder="Enter a valid CPF" />
                  <label className="form-label" htmlFor="cpfForm">CPF</label>
                </div>

            <div className="form-outline mb-1">
                  <input type='date' id="dataForm" className="form-control form-control-lg"
                  value={nascimento}
                  onChange={handleNascimento} />
                  <label className="form-label" htmlFor="nascForm">Data de nascimento</label>
              </div>
            
            <div className="form-outline mb-1">
                  <input type={'email'} id="emailForm" className="form-control form-control-lg"
                    value={email} onChange={handleEmail}
                    placeholder="Enter a valid email address" />
                  <label className="form-label" htmlFor="emailForm">Email</label>
                </div>

            
            <div className="form-outline mb-1">
              <input type="password" id="registerPassword" className="form-control form-control-lg"
              value={senha} onChange={handleSenha}
                placeholder="Enter a password" />
              <label className="form-label" htmlFor="registerPassword">Password</label>
            </div>

            <div className="form-outline mb-1">
              <input type="password" id="registerRepeatPassword" className="form-control form-control-lg"
              value={senha2} onChange={handleSenha2}
                placeholder="repeat password" />
              <label className="form-label" htmlFor="registerRepeatPassword"> Repeat Password</label>
            </div>

            
            
            <div className="form-check d-flex justify-content-center mb-4">
              <input className="form-check-input me-2" type="checkbox" value="" id="registerCheck"
                aria-describedby="registerCheckHelpText" />
              <label className="form-check-label" htmlFor="registerCheck">
                I have read and agree to the terms
              </label>
            </div>

            
            <button type="submit" className="btn btn-primary btn-block mb-3" 
            onClick={handleSubmit}
            disabled={senha.length < 3 || email === '' || cpf === '' || isRequesting}
            >Sign in</button>
          </form>
          </div>
          </div>

      </div>
      
    )
  }

export default Registro;