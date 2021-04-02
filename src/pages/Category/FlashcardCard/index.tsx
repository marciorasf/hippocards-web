import React from "react"

import { Flashcard } from "@interfaces/flashcard"
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardActions,
  IconButton,
} from "@material-ui/core"
import {
  EditOutlined as EditIcon,
  DeleteOutlined as DeleteIcon,
} from "@material-ui/icons"

type FlashcardCardProps = {
  flashcard: Flashcard
  handleClickCard: (flashcard: Flashcard) => void
  handleClickEdit: (flashcard: Flashcard) => void
  handleClickDelete: (flashcard: Flashcard) => Promise<void>
}

const FlashcardCard: React.FC<FlashcardCardProps> = ({
  flashcard,
  handleClickCard,
  handleClickEdit,
  handleClickDelete,
}) => {
  return (
    <Card>
      <CardActionArea onClick={() => handleClickCard(flashcard)}>
        <CardHeader title={flashcard.question} />

        <CardContent>{flashcard.answer}</CardContent>
      </CardActionArea>

      <CardActions>
        <IconButton onClick={() => handleClickEdit(flashcard)}>
          <EditIcon />
        </IconButton>

        <IconButton onClick={() => handleClickDelete(flashcard)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default FlashcardCard
