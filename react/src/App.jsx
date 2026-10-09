import { useState } from 'react'
import './App.css'

function App() {
  const taskStatuses = ['To Do', 'In Progress', 'Done']
  const [projects, setProjects] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [selectedProjectId, setSelectedProjectId] = useState(null)
  const [tasks, setTasks] = useState([])
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false)
  const [taskName, setTaskName] = useState('')
  const [assignedTo, setAssignedTo] = useState('')

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

  function closeTaskForm() {
    setIsTaskFormOpen(false)
    setTaskName('')
    setAssignedTo('')
  }

  function createTask(event) {
    event.preventDefault()
    const name = taskName.trim()
    if (!name || !selectedProjectId) return

    const task = {
      id: crypto.randomUUID(),
      projectId: selectedProjectId,
      name,
      assignedTo: assignedTo.trim(),
      status: 'To Do',
    }
    setTasks((currentTasks) => [...currentTasks, task])
    closeTaskForm()
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
  }

  function updateTaskStatus(taskId, status) {
    setTasks((currentTasks) => currentTasks.map((task) => (
      task.id === taskId ? { ...task, status } : task
    )))
  }

  const selectedProjectTasks = tasks.filter((task) => task.projectId === selectedProjectId)
  const doneTasksCount = selectedProjectTasks.filter((task) => task.status === 'Done').length
  const projectProgress = selectedProjectTasks.length === 0
    ? 0
    : Math.round((doneTasksCount / selectedProjectTasks.length) * 100)

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

        {selectedProjectId && (
          <section className="project-tasks" aria-labelledby="tasks-title">
            <div className="tasks-header">
              <h2 id="tasks-title">Project Tasks</h2>
              <button
                className="new-project-button"
                type="button"
                aria-expanded={isTaskFormOpen}
                aria-controls={isTaskFormOpen ? 'new-task-form' : undefined}
                onClick={() => setIsTaskFormOpen(true)}
              >
                + Add Task
              </button>
            </div>

            {selectedProjectId && isTaskFormOpen && (
              <form id="new-task-form" className="project-form" onSubmit={createTask}>
                <label htmlFor="task-name">Task Name</label>
                <input
                  id="task-name"
                  type="text"
                  value={taskName}
                  onChange={(event) => setTaskName(event.target.value)}
                  autoFocus
                  required
                />
                <label htmlFor="assigned-to">Assigned To</label>
                <input
                  id="assigned-to"
                  type="text"
                  value={assignedTo}
                  onChange={(event) => setAssignedTo(event.target.value)}
                />
                <div className="form-actions">
                  <button className="new-project-button" type="submit" disabled={!taskName.trim()}>
                    Add Task
                  </button>
                  <button className="cancel-button" type="button" onClick={closeTaskForm}>
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="project-progress" aria-label={`Project progress: ${projectProgress}%`}>
              <div className="progress-label">
                <span>Project progress</span>
                <strong>{projectProgress}%</strong>
              </div>
              <div className="progress-track" role="progressbar" aria-valuenow={projectProgress} aria-valuemin="0" aria-valuemax="100">
                <div className="progress-fill" style={{ width: `${projectProgress}%` }} />
              </div>
              <p>{doneTasksCount} of {selectedProjectTasks.length} tasks done</p>
            </div>

            <div className="kanban-board">
              {taskStatuses.map((status) => {
                const columnTasks = selectedProjectTasks.filter((task) => task.status === status)

                return (
                  <section className="kanban-column" key={status} aria-labelledby={`column-${status.replaceAll(' ', '-').toLowerCase()}`}>
                    <h3 id={`column-${status.replaceAll(' ', '-').toLowerCase()}`} className="kanban-column-title">
                      <span>{status}</span>
                      <span className="column-count">{columnTasks.length}</span>
                    </h3>
                    {columnTasks.length === 0 ? (
                      <p className="column-empty">No tasks</p>
                    ) : (
                      <ul className="task-list">
                        {columnTasks.map((task) => (
                          <li className="task-card" key={task.id}>
                            <div className="task-details">
                              <h4>{task.name}</h4>
                              <p>{task.assignedTo ? `Assigned to: ${task.assignedTo}` : 'Unassigned'}</p>
                            </div>
                            <label className="status-control">
                              <span>Status</span>
                              <select value={task.status} onChange={(event) => updateTaskStatus(task.id, event.target.value)}>
                                {taskStatuses.map((taskStatus) => (
                                  <option key={taskStatus} value={taskStatus}>{taskStatus}</option>
                                ))}
                              </select>
                            </label>
                            <button className="delete-button" type="button" onClick={() => deleteTask(task.id)}>
                              Delete
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                )
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
