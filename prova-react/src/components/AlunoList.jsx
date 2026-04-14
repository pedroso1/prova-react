function AlunoList({ alunos }) {
  return (
    <div>
      <h2>Lista de Alunos</h2>
      {alunos.map((aluno, index) => (
        <div key={index}>
          <p>Nome: {aluno.nome}</p>
          <p>Curso: {aluno.curso}</p>
          <hr />
        </div>
      ))}
    </div>
  )
}
export default AlunoList
