import { useState, useEffect } from "react"
import { auth, db } from "./firebase"
import StatusBar from "./components/StatusBar"
import Footer from "./components/Footer"

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth"

import {
  collection,
  addDoc,
  getDocs
} from "firebase/firestore"

function App() {

  
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [usuario, setUsuario] = useState(null)

  
  const [nome, setNome] = useState("")
  const [curso, setCurso] = useState("")
  const [alunos, setAlunos] = useState([])


  function cadastrar() {
    createUserWithEmailAndPassword(auth, email, senha)
      .then(() => alert("Cadastrado!"))
      .catch(() => alert("Erro ao cadastrar"))
  }

  
  function login() {
    signInWithEmailAndPassword(auth, email, senha)
      .then((user) => {
        setUsuario(user.user)
        alert("Logado!")
      })
      .catch(() => alert("Erro no login"))
  }

  
  function sair() {
    signOut(auth)
    setUsuario(null)
  }

  
  async function adicionarAluno() {
    if (!nome || !curso) {
      alert("Preencha tudo")
      return
    }

    await addDoc(collection(db, "alunos"), {
      nome,
      curso
    })

    setNome("")
    setCurso("")
    buscarAlunos()
  }

  
  async function buscarAlunos() {
    const dados = await getDocs(collection(db, "alunos"))
    const lista = dados.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    setAlunos(lista)
  }

  useEffect(() => {
    buscarAlunos()
  }, [])

  
  if (!usuario) {
    return (
      <div style={{ textAlign: "center" }}>

        <StatusBar mensagem="Sistema Acadêmico" />

        <h2>Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <br /><br />

        <button onClick={cadastrar}>Cadastrar</button>
        <button onClick={login}>Login</button>

        <Footer />

      </div>
    )
  }

  
  return (
    <div style={{ textAlign: "center", minHeight: "100vh" }}>

      <StatusBar mensagem="Sistema Acadêmico" />

      <img 
        src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png" 
        width="150"
      />

      <h2>Lista de Alunos</h2>

      <button onClick={sair}>Logout</button>

      <br /><br />

      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        placeholder="Curso"
        value={curso}
        onChange={(e) => setCurso(e.target.value)}
      />

      <br /><br />

      <button onClick={adicionarAluno}>Salvar</button>

      <hr />

      {alunos.map((a) => (
        <p key={a.id}>
          {a.nome} - {a.curso}
        </p>
      ))}

      <Footer />

    </div>
  )
}

export default App