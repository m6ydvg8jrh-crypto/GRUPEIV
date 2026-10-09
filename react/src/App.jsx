import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="page-container">
          <h1 className="brand">TaskQuest</h1>
        </div>
      </header>
      <main className="page-container projects" aria-labelledby="projects-title">
        <div className="projects-header">
          <h2 id="projects-title">My Projects</h2>
          <button className="new-project-button" type="button">+ New Project</button>
        </div>
        <div className="empty-state">
          <p>No projects yet.</p>
        </div>
      </main>
    </div>
  )
}

export default App
