import { useState, useEffect } from "react"
import StatusBar from "./components/StatusBar"
import Footer from "./components/Footer"

function App() {

  const [alunos, setAlunos] = useState([
    { nome: "Guilherme", curso: "DSM" },
    { nome: "Danilo", curso: "ADS" }
  ])

  const [nome, setNome] = useState("")
  const [curso, setCurso] = useState("")

  useEffect(() => {
    console.log("Aplicação carregada!")
  }, [])

  function adicionarAluno() {

    if (!nome || !curso) {
      alert("Preencha todos os campos")
      return
    }

    const novoAluno = {
      nome: nome,
      curso: curso
    }

    setAlunos([...alunos, novoAluno])

    setNome("")
    setCurso("")
  }

  return (
    <div>

      <StatusBar mensagem="Sistema Acadêmico" />

      <img 
        src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png" 
        width="150"
      />

      <h2>Lista de Alunos</h2>

      {/* INPUTS */}
      <input 
        type="text" 
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input 
        type="text" 
        placeholder="Curso"
        value={curso}
        onChange={(e) => setCurso(e.target.value)}
      />

      <br /><br />

      {/* BOTÃO */}
      <button onClick={adicionarAluno}>
        Adicionar Aluno
      </button>

      <hr />

      {/* LISTA */}
      {alunos.map((aluno, index) => (
        <div key={index}>
          <p>{aluno.nome} - {aluno.curso}</p>
        </div>
      ))}

      <Footer />

    </div>
  )
}

export default App