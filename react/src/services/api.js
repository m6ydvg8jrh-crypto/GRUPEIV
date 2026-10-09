const API_BASE_URL = 'https://testapi.io/api/julijadr-git/resource'

export const API_COLLECTIONS = {
  users: `${API_BASE_URL}/Users`,
  projects: `${API_BASE_URL}/Projects`,
  tasks: `${API_BASE_URL}/Tasks`,
}

async function getCollection(url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`)
  }

  const result = await response.json()

  // testapi.io returns paginated collections in { data: [...], ... }.
  if (Array.isArray(result)) return result
  if (Array.isArray(result?.data)) return result.data

  throw new Error('API returned an unexpected collection format')
}

export function getUsers() {
  return getCollection(API_COLLECTIONS.users)
}

export function getProjects() {
  return getCollection(API_COLLECTIONS.projects)
}

export function getTasks() {
  return getCollection(API_COLLECTIONS.tasks)
}
