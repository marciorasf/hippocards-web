import React, { useState } from "react"
import { useHistory } from "react-router-dom"

import { Header } from "@components"
import useDidMount from "@hooks/useDidMount"
import { Category } from "@interfaces/category"
import {
  CardContent,
  Grid,
  Typography,
  Card,
  CardActionArea,
} from "@material-ui/core"
import { Add as AddIcon } from "@material-ui/icons"
import CategoryCard from "@pages/CategoriesDashboard/CategoryCard"
import CategoryDialog from "@pages/CategoriesDashboard/CategoryDialog"
import categoryService, {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "@services/category"
import errorService from "@services/error"

async function getCategories() {
  try {
    return await categoryService.retrieveAll()
  } catch (err) {
    errorService.handle(err)
    return []
  }
}

type Dialog = "create" | "edit"

const CategoriesDashboard: React.FC = () => {
  const [userCategories, setUserCategories] = useState<Category[]>([])
  const [openDialog, setOpenDialog] = useState<Dialog | null>(null)
  const [
    currentCategoryOnEdition,
    setCurrentCategoryOnEdition,
  ] = useState<Category>()

  const history = useHistory()

  async function getAndUpdateCategories() {
    const categories = await getCategories()
    setUserCategories(categories)
  }

  function goToCategoryPage(category: Category) {
    history.push(`/categories/${category.id}`)
  }

  function handleOpenDialog(dialog: Dialog) {
    setOpenDialog(dialog)
  }

  function handleCloseDialog() {
    setOpenDialog(null)
  }

  async function handleCreateCategory(categoryData: CreateCategoryInput) {
    try {
      await categoryService.create(categoryData)
      await getAndUpdateCategories()
    } catch (err) {
      errorService.handle(err)
    }
  }

  function handleClickEditCategory(category: Category) {
    setCurrentCategoryOnEdition(category)
    handleOpenDialog("edit")
  }

  async function handleEditCategory(categoryData: UpdateCategoryInput) {
    const categoryId = currentCategoryOnEdition?.id
    if (categoryId) {
      try {
        await categoryService.update(categoryId, categoryData)
        await getAndUpdateCategories()
      } catch (err) {
        errorService.handle(err)
      }
    }
  }

  async function handleDeleteCategory(category: Category) {
    try {
      await categoryService.delete(category.id)
      await getAndUpdateCategories()
    } catch (err) {
      errorService.handle(err)
    }
  }

  useDidMount(() => {
    getAndUpdateCategories()
  })

  return (
    <Grid container>
      <Grid item xs={12}>
        <Header />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h2">Categories</Typography>

        <Grid container>
          <Grid item>
            <Card>
              <CardActionArea onClick={() => handleOpenDialog("create")}>
                <CardContent>
                  <AddIcon />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {userCategories.map((category) => (
            <Grid key={category.id} item>
              <CategoryCard
                key={category.id}
                category={category}
                handleClickCard={goToCategoryPage}
                handleClickEdit={handleClickEditCategory}
                handleClickDelete={handleDeleteCategory}
              />
            </Grid>
          ))}
        </Grid>

        <CategoryDialog
          title="Add category"
          open={openDialog === "create"}
          onClose={handleCloseDialog}
          onOk={handleCreateCategory}
          okButtonLabel="add"
        />

        <CategoryDialog
          title="Edit category"
          open={openDialog === "edit"}
          onClose={handleCloseDialog}
          onOk={handleEditCategory}
          okButtonLabel="save"
          initialValues={{ name: currentCategoryOnEdition?.name || "" }}
        />
      </Grid>
    </Grid>
  )
}

export default CategoriesDashboard
