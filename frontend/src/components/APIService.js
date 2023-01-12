export default class APIService {
    static UpdatePessoa(id, body) {
        return fetch(`http://127.0.0.1:5000/update/${id}`,
            {method: 'PUT', 
            headers: {'Access-Control-Allow-Origin': '*','content-type': 'application/json'},
            body: JSON.stringify(body)
          })
          .then(resp => resp.json())
    }

    static InsertPessoa(body) {
      return fetch(`http://127.0.0.1:5000/cria`,
          {method: 'POST', 
          headers: {'Access-Control-Allow-Origin': '*','content-type': 'application/json'},
          body: JSON.stringify(body)
        })
        .then(resp => resp.json())
  }

    static DeletePessoa(id) {
      return fetch(`http://127.0.0.1:5000/delete/${id}`,
          {method: 'DELETE', 
          headers: {'Access-Control-Allow-Origin': '*','content-type': 'application/json'},
        })
        
    }

    static Logar(email, senha) {
      return fetch('http://127.0.0.1:5000/logar',
        {method: 'POST', 
          headers: {'Access-Control-Allow-Origin': '*','content-type': 'application/json'},
          body: JSON.stringify({email, senha})
        })
        .then(resp => resp.json())
      }

    static Registrar(dados) {
      return fetch('http://127.0.0.1:5000/registrar',
        {method: 'POST', 
          headers: {'Access-Control-Allow-Origin': '*','content-type': 'application/json'},
          body: JSON.stringify(dados)
        })
        .then(resp => resp.json())
      }
    static Publicar(dados) {
      return fetch('http://127.0.0.1:5000/publicar',
        {method: 'PUT', 
          headers: {'Access-Control-Allow-Origin': '*','content-type': 'application/json'},
          body: JSON.stringify(dados)
        })
        .then(resp => resp.json())
      }
    static ComprarProd(dados) {
      return fetch('http://127.0.0.1:5000/comprarprod',
        {method: 'PUT', 
          headers: {'Access-Control-Allow-Origin': '*','content-type': 'application/json'},
          body: JSON.stringify(dados)
        })
        .then(resp => resp.json())
      }

    static InserirProd(dados) {
      return fetch('http://127.0.0.1:5000/inserirprod',
        {method: 'POST', 
          headers: {'Access-Control-Allow-Origin': '*','content-type': 'application/json'},
          body: JSON.stringify(dados)
        })
        .then(resp => resp.json())
      }
    
  
}