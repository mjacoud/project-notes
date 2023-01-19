import NoteForm from '../NoteForm'
import { NewNoteProps } from '../../Types/types'

export const NewNote = ({
  onSubmit,
  onAddTag,
  availableTags
}: NewNoteProps) => {
  return (
    <>
      <h1 className="mb-4">New</h1>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  )
}
