import { useState } from 'react'
import './App.css'

function App() {
  const [projects, setProjects] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [selectedProjectId, setSelectedProjectId] = useState(null)

  function closeForm() {
    setIsFormOpen(false)
    setProjectName('')
  }

  function createProject(event) {
    event.preventDefault()
    const name = projectName.trim()
    if (!name) return

    const project = { id: crypto.randomUUID(), name }
    setProjects((currentProjects) => [...currentProjects, project])
    closeForm()
  }

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
          <button
            className="new-project-button"
            type="button"
            aria-expanded={isFormOpen}
            aria-controls={isFormOpen ? 'new-project-form' : undefined}
            onClick={() => setIsFormOpen(true)}
          >
            + New Project
          </button>
        </div>
        {isFormOpen && (
          <form id="new-project-form" className="project-form" onSubmit={createProject}>
            <label htmlFor="project-name">Project name</label>
            <input
              id="project-name"
              type="text"
              value={projectName}
              onChange={(event) => setProjectName(event.target.value)}
              autoFocus
              required
            />
            <div className="form-actions">
              <button className="new-project-button" type="submit" disabled={!projectName.trim()}>
                Create Project
              </button>
              <button className="cancel-button" type="button" onClick={closeForm}>
                Cancel
              </button>
            </div>
          </form>
        )}

        {projects.length === 0 ? (
          <div className="empty-state">
            <p>No projects yet.</p>
          </div>
        ) : (
          <ul className="project-list">
            {projects.map((project) => (
              <li key={project.id}>
                <button
                  className={`project-card${selectedProjectId === project.id ? ' selected' : ''}`}
                  type="button"
                  aria-pressed={selectedProjectId === project.id}
                  onClick={() => setSelectedProjectId(project.id)}
                >
                  {project.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}

export default App
