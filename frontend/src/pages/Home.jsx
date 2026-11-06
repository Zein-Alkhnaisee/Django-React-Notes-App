import api from '../api'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  const [notes, setNotes] = useState([])
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' })

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type })

    window.clearTimeout(showToast.timeoutId)
    showToast.timeoutId = window.setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }))
    }, 2600)
  }

  const getNotes = async () => {
    try {
      setIsLoading(true)
      const response = await api.get('/api/notes/')
      setNotes(response.data)
      console.log('Fetched notes:', response.data)
    } catch (error) {
      console.error('Error fetching notes:', error)
      showToast('An error occurred while loading notes.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteNote = async (id) => {
    try {
      const res = await api.delete(`/api/notes/delete/${id}/`)
      if (res.status === 204) {
        showToast('Note deleted successfully.', 'success')
        await getNotes()
      } else {
        showToast('Failed to delete note.', 'error')
      }
    } catch (error) {
      console.error('Error deleting note:', error)
      showToast('An error occurred while deleting the note.', 'error')
    }
  }

  const createNote = async (e) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      showToast('Please enter both the title and content.', 'error')
      return
    }

    try {
      const res = await api.post('/api/notes/', { title, content })

      if (res.status === 201) {
        showToast('Note created successfully.', 'success')
        setTitle('')
        setContent('')
        await getNotes()
      } else {
        showToast('Failed to create note.', 'error')
      }
    } catch (error) {
      console.error('Error creating note:', error)
      showToast('An error occurred while creating the note.', 'error')
    }
  }

  useEffect(() => {
    getNotes()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-slate-100">
      {toast.visible && (
        <div className="fixed right-5 top-5 z-50">
          <div
            className={`rounded-2xl border px-4 py-3 text-sm font-medium shadow-2xl backdrop-blur-md ${toast.type === 'success'
                ? 'border-emerald-400/40 bg-emerald-500/15 text-emerald-50'
                : 'border-red-400/40 bg-red-500/15 text-red-50'
              }`}
          >
            {toast.message}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-violet-300">Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold text-white">My Notes</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 rounded-2xl border border-violet-400/30 bg-violet-500/10 px-4 py-2">
              <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]" />
              <span className="text-sm text-violet-100">{notes.length} Notes</span>
            </div>

            <button
              type="button"
              onClick={() => navigate('/logout')}
              className="rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-200 transition hover:bg-red-500/20"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 shadow-xl backdrop-blur-sm">
            <div className="mb-6">
              <p className="text-sm uppercase tracking-[0.25em] text-sky-300">Add note</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Create a New Note</h2>
            </div>

            <form onSubmit={createNote} className="space-y-5">
              <div>
                <label htmlFor="title" className="mb-2 block text-sm font-medium text-slate-200">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Write your note title"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                />
              </div>

              <div>
                <label htmlFor="content" className="mb-2 block text-sm font-medium text-slate-200">
                  Content
                </label>
                <textarea
                  id="content"
                  rows="6"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your note content here..."
                  className="w-full resize-none rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-500 px-4 py-3 font-semibold text-white shadow-lg shadow-violet-900/30 transition hover:scale-[1.01] hover:from-violet-500 hover:to-indigo-400"
              >
                Save Note
              </button>
            </form>
          </aside>

          <main className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 shadow-xl backdrop-blur-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-emerald-300">Notes</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Your Notes</h2>
              </div>

              <button
                onClick={getNotes}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10"
              >
                Refresh
              </button>
            </div>

            {isLoading ? (
              <div className="flex min-h-[240px] items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
              </div>
            ) : notes.length === 0 ? (
              <div className="flex min-h-[240px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-950/20 px-6 text-center">
                <div className="mb-3 text-5xl">📝</div>
                <p className="text-lg font-medium text-slate-200">No notes yet</p>
                <p className="mt-2 text-sm text-slate-400">Create your first note from the form on the left</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notes.map((note) => (
                  <article
                    key={note.id}
                    className="rounded-2xl border border-white/10 bg-gradient-to-r from-slate-800/80 to-slate-900/80 p-5 shadow-lg shadow-slate-950/20"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{note.title}</h3>
                        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                          {new Date(note.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>

                      <button
                        onClick={() => deleteNote(note.id)}
                        className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/20"
                      >
                        Delete
                      </button>
                    </div>

                    <p className="mt-4 whitespace-pre-wrap text-base leading-7 text-slate-200">
                      {note.content}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Home