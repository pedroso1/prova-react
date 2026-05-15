import { useState, useEffect } from "react"
import { auth, db } from "./firebase"
import { supabase } from "./supabase"

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
  
  const [personagens, setPersonagens] = useState([])

  
  const [imagem, setImagem] = useState(null)

  useEffect(() => {
    buscarAlunos()
  }, [])

  
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

    if (!nome || !imagem) {
      alert("Preencha tudo")
      return
    }

    let urlImagem = ""

  
    if (imagem) {

      const nomeArquivo = Date.now() + imagem.name

      const { error } = await supabase.storage
        .from("imagens")
        .upload(nomeArquivo, imagem)

      if (!error) {

        const { data } = supabase.storage
          .from("imagens")
          .getPublicUrl(nomeArquivo)

        urlImagem = data.publicUrl
      }
    }

  
    await addDoc(collection(db, "personagens"), {
      nome,
      imagem: urlImagem,
      dataCadastro: new Date().toLocaleDateString()
    })

    setNome("")
    
    setImagem(null)

    buscarAlunos()
  }


  async function buscarAlunos() {

  const dados = await getDocs(collection(db, "personagens"))

    const lista = dados.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    setPersonagens(lista)
  }


  if (!usuario) {
    return (
      <div style={{ textAlign: "center" }}>

        <h1>Login</h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <br /><br />

        <button onClick={cadastrar}>
          Cadastrar
        </button>

        <button onClick={login}>
          Login
        </button>

      </div>
    )
  }

 
  return (
    <div
      style={{
        textAlign: "center",
        minHeight: "100vh",
        backgroundColor: "#0b0f1a",
        color: "white",
        padding: "20px"
      }}
    >

      <StatusBar mensagem="Marvel Heroes" />

        <img
        src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg"
        width="180"
        style={{
       marginTop: "20px",
        marginBottom: "10px"
     }}
/>
    <h2>Personagens Marvel</h2>

      <button onClick={sair}>
        Logout
      </button>

      <br /><br />

      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <br /><br />

      <input
        type="file"
        onChange={(e) => setImagem(e.target.files[0])}
      />

      <br /><br />

      <button onClick={adicionarAluno}>
        Salvar
      </button>

      <hr />

      {personagens.map((a) => (
        <div key={a.id}>

   <p>{a.nome}</p>

  <p>{a.dataCadastro}</p>

          {a.imagem && (
            <img
              src={a.imagem}
              width="100"
            />
          )}

        </div>
      ))}

      <Footer />

    </div>
  )
}

export default App