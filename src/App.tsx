import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import NewNote from './Components/NewNote'
import NoteList from './Components/NoteList'
import NoteLayout from './Components/NoteLayout'
import Note from './Components/Note'

import { useLocalStorage } from './Hooks/UseLocalStorage'
import { NoteData, RawNote, Tag } from './Types/types'

import { useMemo } from 'react'

import { v4 as uuidv4 } from 'uuid'
import EditNote from './Components/EditNote'

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', [])
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return {
        ...note,
        tags: tags.filter(tag => note.tagsIds.includes(tag.id))
      }
    })
  }, [notes, tags])

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes(prevNotes => {
      return [
        ...prevNotes,
        { ...data, id: uuidv4(), tagsIds: tags.map(tag => tag.id) }
      ]
    })
  }

  const onEditNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return { ...note, ...data, tagsIds: tags.map(tag => tag.id) }
        } else {
          return note
        }
      })
    })
  }

  const addTag = (tag: Tag) => {
    setTags(prev => [...prev, tag])
  }

  const onDeleteNote = (id: string) => {
    setNotes(prevNotes => {
      return notes.filter(note => note.id !== id)
    })
  }

  const onEditTag = (id: string, label: string) => {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }

  const onDeleteTags = (id: string) => {
    setTags(prevTags => {
      return tags.filter(tag => tag.id !== id)
    })
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={
            <NoteList
              availableTags={tags}
              notes={notesWithTags}
              onEditTag={onEditTag}
              onDeleteTag={onDeleteTags}
            />
          }
        />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDelete={onDeleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={onEditNote}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App
