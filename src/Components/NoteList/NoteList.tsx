import { useMemo, useState } from 'react'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'

import { Link } from 'react-router-dom'

import ReactSelect from 'react-select/creatable'

import { v4 as uuidv4 } from 'uuid'

import { NoteListProps, Tag } from '../../Types/types'
import { EditTagsModal } from '../EditTagsModal/EditTagsModal'

import NoteCard from '../NoteCard'

import styles from '../NoteList'

export const noteList = ({
  availableTags,
  notes,
  onEditTag,
  onDeleteTag
}: NoteListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [title, setTitle] = useState('')
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false)

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      return (
        (note.title == '' ||
          note.title.toLowerCase().includes(title.toLocaleLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every(tag =>
            note.tags.some(noteTag => noteTag.id === tag.id)
          ))
      )
    })
  }, [title, selectedTags, notes])

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
            <Button
              variant="outline-secondary"
              onClick={() => setEditTagsModalIsOpen(true)}
            >
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title"></Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Group controlId="tag"></Form.Group>
            <Form.Label>Tags</Form.Label>
            <ReactSelect
              isMulti
              value={selectedTags.map(tag => {
                return { label: tag.label, value: tag.id }
              })}
              onChange={tags => {
                setSelectedTags(
                  tags.map(tag => {
                    return { label: tag.label, id: tag.value }
                  })
                )
              }}
              options={availableTags.map(tags => {
                return { label: tags.label, value: tags.id }
              })}
            />
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map(note => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
      <EditTagsModal
        availableTags={availableTags}
        show={editTagsModalIsOpen}
        handleClose={() => setEditTagsModalIsOpen(false)}
        onEditTag={onEditTag}
        onDeleteTag={onDeleteTag}
      />
    </>
  )
}
