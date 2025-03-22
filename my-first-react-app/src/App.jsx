const Card = ( {title}) => {
  return (  
    <div class="card">
      <h2>{title}</h2>
      <p></p>
    </div>
  )
}

const App = () => {
  return (
  <div className="card-container">
    <Card title="Star Wars" />
    <Card title="Avatar" />
    <Card title="The Lion King" />
  </div>


  )
}

export default App
