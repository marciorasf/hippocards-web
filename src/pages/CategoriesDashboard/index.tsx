import React, { useState } from "react"
import { useHistory } from "react-router-dom"

import { Header, Spacing } from "@components"
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
import useStyles from "@pages/CategoriesDashboard/styles"
import categoryService, {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "@services/category"
import errorService from "@services/error"
import useCommonStyles from "@styles/commonStyles"

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

  const commonClasses = useCommonStyles()
  const classes = useStyles()

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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Header />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h3">Categories</Typography>

        <Spacing orientation="horizontal" size={4} />

        <Grid
          container
          spacing={2}
          justify="space-between"
          alignItems="stretch"
        >
          <Grid item xs={6}>
            <Card className={classes.card}>
              <CardActionArea
                className={commonClasses.fullHeight}
                onClick={() => handleOpenDialog("create")}
              >
                <CardContent>
                  <Grid container justify="center" alignItems="center">
                    <AddIcon />
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {userCategories.map((category) => (
            <Grid key={category.id} item xs={6}>
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
