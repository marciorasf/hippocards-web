import React from "react"

import { Category } from "@interfaces/category"
import {
  CardContent,
  CardHeader,
  Card,
  CardActions,
  IconButton,
  CardActionArea,
} from "@material-ui/core"
import {
  EditOutlined as EditIcon,
  DeleteOutlined as DeleteIcon,
} from "@material-ui/icons"

type CategoryCardProps = {
  category: Category
  handleClickCard: (category: Category) => void
  handleClickEdit: (category: Category) => void
  handleClickDelete: (category: Category) => Promise<void>
}

const CategoriesDashboard: React.FC<CategoryCardProps> = ({
  category,
  handleClickCard,
  handleClickEdit,
  handleClickDelete,
}) => {
  return (
    <Card>
      <CardActionArea onClick={() => handleClickCard(category)}>
        <CardHeader title={category.name} />

        <CardContent>{category.name}</CardContent>
      </CardActionArea>

      <CardActions>
        <IconButton onClick={() => handleClickEdit(category)}>
          <EditIcon />
        </IconButton>

        <IconButton onClick={() => handleClickDelete(category)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default CategoriesDashboard
