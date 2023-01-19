import { FormEvent, useRef, useState } from 'react'

import { Form, Stack, Row, Col, Button } from 'react-bootstrap'

import { Link, useNavigate } from 'react-router-dom'

import CreatableSelect from 'react-select/creatable'

import { NoteFormProps, Tag } from '../../Types/types'

import { v4 as uuidv4 } from 'uuid'

export const NoteForm = ({
  onSubmit,
  onAddTag,
  availableTags,
  tags = [],
  title = '',
  markdown = ''
}: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)

  const [selectedTags, SetSelectedTags] = useState<Tag[]>(tags)

  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags
    })
    navigate('..')
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Stack gap={4}>
          <Row>
            <Col>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  ref={titleRef}
                  required
                  defaultValue={title}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="tags">
                <Form.Label>Tags</Form.Label>
                <CreatableSelect
                  onCreateOption={label => {
                    const newTag = { id: uuidv4(), label }
                    onAddTag(newTag)
                    SetSelectedTags(prev => [...prev, newTag])
                  }}
                  isMulti
                  value={selectedTags.map(tag => {
                    return { label: tag.label, value: tag.id }
                  })}
                  onChange={tags => {
                    SetSelectedTags(
                      tags.map(tag => {
                        return { label: tag.label, id: tag.value }
                      })
                    )
                  }}
                  options={availableTags.map(tags => {
                    return { label: tags.label, value: tags.id }
                  })}
                />
              </Form.Group>
            </Col>
          </Row>
          <Col>
            <Form.Group controlId="markdown">
              <Form.Label>Body</Form.Label>
              <Form.Control
                required
                as="textarea"
                ref={markdownRef}
                rows={15}
                defaultValue={markdown}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Stack direction="horizontal" gap={2} className="justify-content-end">
            <Button type="submit" variant="primary">
              Save
            </Button>
            <Link to="..">
              <Button type="button" variant="outline-secondary">
                Cancel
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Form>
    </>
  )
}
