import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import {
  SearchInputField,
  Header,
  PageContentContainer,
  Spacing,
} from "@components"
import { CategoryWithFlashcards } from "@interfaces/category"
import { Flashcard } from "@interfaces/flashcard"
import {
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ButtonBase,
  Collapse,
} from "@material-ui/core"
import {
  FilterList as FilterIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@material-ui/icons"
import FlashcardCard from "@pages/Category/FlashcardCard"
import FlashcardDialog from "@pages/Category/FlashcardDialog"
import useStyles from "@pages/Category/styles"
import categoryService from "@services/category"
import errorService from "@services/error"
import flashcardService, { CreateFlashcardInput } from "@services/flashcard"
import { removeAccents } from "@utils/removeAccents"
import stringToBoolean from "@utils/stringToBoolean"

async function getCategory(categoryId: number) {
  try {
    return categoryService.retrieveOne(categoryId)
  } catch (err) {
    errorService.handle(err)
    return null
  }
}

type FilterValue = "both" | "false" | "true"

type Filters = {
  isKnown: FilterValue
  isBookmarked: FilterValue
}

type Dialog = "create" | "edit"

const Categories: React.FC = () => {
  const [category, setCategory] = useState<CategoryWithFlashcards | null>()
  const [expandFilters, setExpandFilters] = useState(false)
  const [openDialog, setOpenDialog] = useState<Dialog | null>(null)
  const [searchText, setSearchText] = useState("")
  const [filters, setFilters] = useState<Filters>({
    isKnown: "both",
    isBookmarked: "both",
  })
  const [
    currentFlashcardOnEdition,
    setCurrentFlashcardOnEdition,
  ] = useState<Flashcard>()

  const classes = useStyles()

  const { id: categoryId } = useParams<{ id: string }>()

  function handleOpenDialog(dialog: Dialog) {
    setOpenDialog(dialog)
  }

  function handleCloseDialog() {
    setOpenDialog(null)
  }

  function handleToggleExpandFilters() {
    setExpandFilters(!expandFilters)
  }

  function insertFlashcardOnCategory(createdFlashcard: Flashcard) {
    if (!category) {
      return
    }

    const updatedFlashcards = [...category?.flashcards, createdFlashcard]

    setCategory({
      ...category,
      flashcards: updatedFlashcards,
    })
  }

  async function handleCreateFlashcard(flashcardData: CreateFlashcardInput) {
    try {
      const createdFlashcard = await flashcardService.create(
        +categoryId,
        flashcardData
      )
      insertFlashcardOnCategory(createdFlashcard)
    } catch (err) {
      errorService.handle(err)
    }
  }

  function handleClickEditFlashcard(flashcard: Flashcard) {
    setCurrentFlashcardOnEdition(flashcard)
    handleOpenDialog("edit")
  }

  function updateFlashcardOnCategory(updatedFlashcard: Flashcard) {
    if (!category) {
      return
    }

    const updatedFlashcards = category?.flashcards.map((flashcard) => {
      if (flashcard.id === updatedFlashcard.id) {
        return updatedFlashcard
      }

      return flashcard
    })

    setCategory({
      ...category,
      flashcards: updatedFlashcards,
    })
  }

  async function handleEditFlashcard(flashcardData: CreateFlashcardInput) {
    const flashcardId = currentFlashcardOnEdition?.id

    if (flashcardId) {
      try {
        const updatedFlashcard = await flashcardService.update(
          +flashcardId,
          flashcardData
        )
        updateFlashcardOnCategory(updatedFlashcard)
      } catch (err) {
        errorService.handle(err)
      }
    }
  }

  async function handleToggleIsFlashcardKnown(flashcard: Flashcard) {
    try {
      const updatedFlashcard = await flashcardService.update(flashcard.id, {
        isKnown: !flashcard.isKnown,
      })
      updateFlashcardOnCategory(updatedFlashcard)
    } catch (err) {
      errorService.handle(err)
    }
  }

  async function handleToggleIsFlashcardBookmarked(flashcard: Flashcard) {
    try {
      const updatedFlashcard = await flashcardService.update(flashcard.id, {
        isBookmarked: !flashcard.isBookmarked,
      })
      updateFlashcardOnCategory(updatedFlashcard)
    } catch (err) {
      errorService.handle(err)
    }
  }

  function deleteFlashcardOnCategory(deletedFlashcard: Flashcard) {
    if (!category) {
      return
    }

    const updatedFlashcards = category.flashcards.filter(
      (card) => card.id !== deletedFlashcard.id
    )

    setCategory({
      ...category,
      flashcards: updatedFlashcards,
    })
  }

  async function handleDeleteFlashcard(flashcard: Flashcard) {
    try {
      await flashcardService.delete(flashcard.id)
      deleteFlashcardOnCategory(flashcard)
    } catch (err) {
      errorService.handle(err)
    }
  }

  function handleChangeSearchText(value: string) {
    setSearchText(value)
  }

  function filterFlashcards(flashcard: Flashcard) {
    const normalizedQuestion = removeAccents(flashcard.question.toLowerCase())
    const normalizedId = flashcard.id.toString()
    const normalizedAnswer = removeAccents(flashcard.answer.toLowerCase())
    const normalizedSearchText = removeAccents(searchText.toLowerCase())

    // Remove flashcards that not match search text
    if (
      !(
        normalizedId.includes(normalizedSearchText) ||
        normalizedQuestion.includes(normalizedSearchText) ||
        normalizedAnswer.includes(normalizedSearchText)
      )
    ) {
      return false
    }

    if (filters.isKnown !== "both") {
      if (flashcard.isKnown !== stringToBoolean(filters.isKnown)) {
        return false
      }
    }

    if (filters.isBookmarked !== "both") {
      if (flashcard.isBookmarked !== stringToBoolean(filters.isBookmarked)) {
        return false
      }
    }

    return true
  }

  function handleChangeFilterValue(
    filterKey: keyof Filters,
    value: FilterValue
  ) {
    setFilters({
      ...filters,
      [filterKey]: value,
    })
  }

  useEffect(() => {
    async function getAndUpdateCategory() {
      const categoryData = await getCategory(+categoryId)
      setCategory(categoryData)
    }

    getAndUpdateCategory()
  }, [categoryId])

  return (
    <Grid container>
      <Grid item xs={12}>
        <Header
          title={category?.name}
          goBackTo="/categories"
          fabFn={() => handleOpenDialog("create")}
        >
          <ButtonBase
            onClick={handleToggleExpandFilters}
            className={classes.filtersButton}
          >
            <Grid
              container
              alignItems="center"
              justify="space-between"
              spacing={2}
            >
              <Grid item>
                <FilterIcon />
              </Grid>

              <Grid item xs>
                <Typography variant="body1" align="left">
                  Filter flashcards
                </Typography>
              </Grid>

              <Grid item>
                {expandFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </Grid>
            </Grid>
          </ButtonBase>

          <Collapse in={expandFilters}>
            <Spacing orientation="horizontal" size={1} />

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <SearchInputField
                  label="Search"
                  value={searchText}
                  onChange={handleChangeSearchText}
                />
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Bookmarked</InputLabel>

                  <Select
                    value={filters.isBookmarked}
                    label="Bookmarked"
                    onChange={({ target }) =>
                      handleChangeFilterValue(
                        "isBookmarked",
                        target.value as FilterValue
                      )
                    }
                  >
                    <MenuItem value="both">Both</MenuItem>
                    <MenuItem value="true">Yes</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Learned</InputLabel>

                  <Select
                    value={filters.isKnown}
                    label="Learned"
                    onChange={({ target }) =>
                      handleChangeFilterValue(
                        "isKnown",
                        target.value as FilterValue
                      )
                    }
                  >
                    <MenuItem value="both">Both</MenuItem>
                    <MenuItem value="true">Yes</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Collapse>
        </Header>
      </Grid>

      <Grid item xs={12}>
        <PageContentContainer>
          <Grid container spacing={2} alignItems="stretch">
            {category?.flashcards
              ?.filter(filterFlashcards)
              ?.map((flashcard) => (
                <Grid key={flashcard.id} item md={4} sm={6} xs={12}>
                  <FlashcardCard
                    key={flashcard.id}
                    flashcard={flashcard}
                    handleClickEdit={handleClickEditFlashcard}
                    handleClickDelete={handleDeleteFlashcard}
                    handleClickMarkAsKnown={handleToggleIsFlashcardKnown}
                    handleClickMarkAsBookmarked={
                      handleToggleIsFlashcardBookmarked
                    }
                  />
                </Grid>
              ))}
          </Grid>

          <FlashcardDialog
            title="Add flashcard"
            open={openDialog === "create"}
            onClose={handleCloseDialog}
            onOk={handleCreateFlashcard}
            okButtonLabel="add"
          />

          <FlashcardDialog
            title="Edit flashcard"
            open={openDialog === "edit"}
            onClose={handleCloseDialog}
            onOk={handleEditFlashcard}
            okButtonLabel="save"
            initialValues={{
              question: currentFlashcardOnEdition?.question || "",
              answer: currentFlashcardOnEdition?.answer || "",
            }}
          />
        </PageContentContainer>
      </Grid>
    </Grid>
  )
}

export default Categories
