export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagsIds: string[]
}

export type Tag = {
  id: string
  label: string
}

export type Note = {
  id: string
} & NoteData

export type SimplifiedNote = {
  id: string
  title: string
  tags: Tag[]
}

export type NoteFormProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
} & Partial<NoteData>

export type NoteLayoutProps = {
  notes: Note[]
}

export type NewNoteProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

export type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

export type NoteListProps = {
  availableTags: Tag[]
  notes: Note[]
  onDeleteTag: (id: string) => void
  onEditTag: (id: string, label: string) => void
}

export type NoteProps = {
  onDelete: (id: string) => void
}

export type EditTagsModalProps = {
  show: boolean
  handleClose: () => void
  availableTags: Tag[]
  onDeleteTag: (id: string) => void
  onEditTag: (id: string, label: string) => void
}
