import React, { useState } from "react"
import { useHistory } from "react-router-dom"

import { Header, Loading, PageContentContainer } from "@components"
import useDidMount from "@hooks/useDidMount"
import useIsMobile from "@hooks/useIsMobile"
import { Category, CategoryWithFlashcardsInfo } from "@interfaces/category"
import { Grid } from "@material-ui/core"
import CategoryCard from "@pages/Categories/CategoryCard"
import CategoryDialog from "@pages/Categories/CategoryDialog"
import categoryService, {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "@services/category"
import errorService from "@services/error"
import handleBackButton, { newStateName } from "@utils/handleBackButton"
import { removeAccents } from "@utils/removeAccents"

import CategoriesSkeleton from "./CategoriesSkeleton"
import DesktopFilters from "./DesktopFilters"
import MobileFilters from "./MobileFilters"

async function getCategories() {
  try {
    return await categoryService.retrieveAll()
  } catch (err) {
    errorService.handle(err)
    return []
  }
}

type Dialog = "create" | "edit"

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<CategoryWithFlashcardsInfo[]>([])
  const [openDialog, setOpenDialog] = useState<Dialog | null>(null)
  const [searchText, setSearchText] = useState("")
  const [
    currentCategoryOnEdition,
    setCurrentCategoryOnEdition,
  ] = useState<Category>()
  const [loading, setLoading] = useState(true)

  const isMobile = useIsMobile()

  const history = useHistory()

  async function getAndUpdateCategories() {
    setLoading(true)

    const categoriesData = await getCategories()
    setCategories(categoriesData)

    setLoading(false)
  }

  function goToCategoryPage(category: Category) {
    history.push(`/categories/${category.id}`)
  }

  function handleCloseDialog() {
    setOpenDialog(null)

    if (window.history.state === newStateName) {
      window.history.back()
    }
  }

  function handleOpenDialog(dialog: Dialog) {
    setOpenDialog(dialog)

    handleBackButton(handleCloseDialog)
  }

  function insertCategoryOnCategories(
    createdCategory: CategoryWithFlashcardsInfo
  ) {
    if (!categories) {
      return
    }

    setCategories([...categories, createdCategory])
  }

  async function handleCreateCategory(categoryData: CreateCategoryInput) {
    try {
      const category = await categoryService.create(categoryData)
      insertCategoryOnCategories(category)
    } catch (err) {
      errorService.handle(err)
    }
  }

  function handleClickEditCategory(category: Category) {
    setCurrentCategoryOnEdition(category)
    handleOpenDialog("edit")
  }

  function updateCategoryOnCategories(updatedCategory: Category) {
    if (!categories) {
      return
    }

    const updatedCategories = categories.map((category) => {
      if (category.id === updatedCategory.id) {
        return {
          ...category,
          ...updatedCategory,
        }
      }

      return category
    })

    setCategories(updatedCategories)
  }

  async function handleEditCategory(categoryData: UpdateCategoryInput) {
    const categoryId = currentCategoryOnEdition?.id
    if (categoryId) {
      try {
        const category = await categoryService.update(categoryId, categoryData)
        updateCategoryOnCategories(category)
      } catch (err) {
        errorService.handle(err)
      }
    }
  }

  function deleteCategoryOnCategories(deletedCategory: Category) {
    if (!categories) {
      return
    }

    const updatedCategories = categories.filter(
      (category) => category.id !== deletedCategory.id
    )

    setCategories(updatedCategories)
  }

  async function handleDeleteCategory(category: Category) {
    try {
      await categoryService.delete(category.id)
      deleteCategoryOnCategories(category)
    } catch (err) {
      errorService.handle(err)
    }
  }

  function filterCategories(category: Category) {
    if (!searchText) {
      return true
    }

    const normalizedCategoryName = removeAccents(category.name.toLowerCase())
    const normalizedSearchText = removeAccents(searchText.toLowerCase())

    return normalizedCategoryName.includes(normalizedSearchText)
  }

  useDidMount(() => {
    getAndUpdateCategories()
  })

  return (
    <Grid container>
      <Grid item xs={12}>
        <Header title="Categories" fabFn={() => handleOpenDialog("create")}>
          {isMobile ? (
            <MobileFilters
              searchText={searchText}
              setSearchText={setSearchText}
            />
          ) : (
            <DesktopFilters
              searchText={searchText}
              setSearchText={setSearchText}
            />
          )}
        </Header>
      </Grid>

      <Grid item xs={12}>
        <PageContentContainer>
          <Loading
            loading={loading}
            customLoadingElement={<CategoriesSkeleton />}
          >
            <Grid container spacing={2} alignItems="stretch">
              {categories.filter(filterCategories).map((category) => (
                <Grid key={category.id} item md={4} sm={6} xs={12}>
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
          </Loading>

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
        </PageContentContainer>
      </Grid>
    </Grid>
  )
}

export default Categories
