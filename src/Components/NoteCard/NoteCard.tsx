import { Badge, Card, Stack } from 'react-bootstrap'

import { Link } from 'react-router-dom'

import { SimplifiedNote } from '../../Types/types'

import styles from '../NoteCard/NoteCard.module.css'

export const noteCard = ({ id, tags, title }: SimplifiedNote) => {
  return (
    <>
      <Card
        as={Link}
        to={`/${id}`}
        className={`h100 text-reset text-decoration-none ${styles.card}`}
      >
        <Card.Body>
          <Stack
            gap={2}
            className="align-items-center justify-content-center h100"
          >
            <span className="fs-5">{title}</span>
            {tags.length > 0 && (
              <Stack
                gap={1}
                direction="horizontal"
                className="justify-content-center flex-wrap"
              >
                {tags.map(tag => (
                  <Badge key={tag.id} className="text-truncade">
                    {tag.label}
                  </Badge>
                ))}
              </Stack>
            )}
          </Stack>
        </Card.Body>
      </Card>
    </>
  )
}
