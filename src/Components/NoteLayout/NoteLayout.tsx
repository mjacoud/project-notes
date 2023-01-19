import {
  Navigate,
  Outlet,
  useOutlet,
  useOutletContext,
  useParams
} from 'react-router-dom'
import { Note, NoteLayoutProps } from '../../Types/types'

export const NoteLayout = ({ notes }: NoteLayoutProps) => {
  const { id } = useParams()
  const note = notes.find(n => n.id == id)

  if (note == null) {
    return <Navigate to="/" replace />
  }

  return <Outlet context={note} />
}

export const useNote = () => {
  return useOutletContext<Note>()
}
