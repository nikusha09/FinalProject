# Recipe Parsing Application — Detailed Specification

---

## 1. Project Overview

Build a React + Node.js + TypeScript full-stack application that allows users to input one or multiple recipes in a simple, strict text format. The app parses these recipes, displays them in a clean, organized format, and enables saving batches of recipes locally in the browser with custom batch names.

---

## 2. Core Features

### 2.1 Input & Parsing

- Input: User enters plain text containing one or more recipes.
- Each recipe starts with a **single `TITLE:` line**.
- Followed by **one or more `ING:` lines** (ingredients).
- Followed by **one or more `STEP:` lines** (steps).
- Recipes separated by at least one blank line.
- Ingredient line format:  
  ```
  ING: <quantity> <unit> <ingredient name>
  ```
  - Quantity supports **whole numbers, decimals, and fractions** (e.g., `1`, `1.5`, `1/2`).
  - Unit is **free text** (any string, e.g., `cups`, `tablespoons`, `jar`).
  - Ingredient name is the rest of the line.
- Strict validation:  
  - Exactly one `TITLE:` line per recipe.  
  - Minimum one `ING:` and one `STEP:` per recipe.  
  - Ingredient lines must have valid quantity and unit, else **line rejected**.  
  - If *any* recipe is invalid, **entire input is rejected** with a **general error**:  
    `"Input contains invalid recipe(s)"`.
- Steps are plain text, one step per `STEP:` line.

### 2.2 Output Display

- Parsed recipes displayed **together on a single page/view**, stacked vertically.
- Each recipe shows:  
  - Title as heading.  
  - Ingredients as an unordered list.  
  - Steps as a numbered list.
- Each parsed batch displayed in **styled cards** for visual clarity.

### 2.3 Saving Recipes

- User can **save parsed batches** explicitly by clicking a **“Save” button**.
- Saving stores the **entire batch as a single saved item** in **browser’s local storage**.
- User is prompted to input a **custom batch name** during saving.
- Saved batches appear as **styled cards** with their custom batch name.
- Clicking a saved batch card opens the **entire batch at once**, showing all recipes in that batch stacked together.
- Users can **delete saved batches**, but only after a **confirmation prompt**.
- Saved batches are **read-only**; no editing allowed after saving.

---

## 3. Technology Stack

- **Frontend:** React + TypeScript  
  - Text input area for recipe input.  
  - Parse and Save buttons.  
  - Recipe display views.  
  - Popup/modal dialogs for saving batch name input.  
  - Local storage handling for persistence.
- **Backend:** Node.js + TypeScript (optional for future extension)  
  - For now, parsing logic can be client-side; backend can be used if storage or complex processing is needed.
- **Storage:** Browser’s Local Storage  
  - Stores saved batches keyed by user-defined batch names or unique IDs.

---

## 4. Data Structures

```ts
// Parsed ingredient line
interface Ingredient {
  quantity: number | string;  // number for decimals/whole, string for fractions
  unit: string;
  name: string;
}

// Parsed recipe
interface Recipe {
  title: string;
  ingredients: Ingredient[];
  steps: string[];
}

// Saved batch
interface RecipeBatch {
  id: string;              // unique identifier (UUID or timestamp)
  batchName: string;       // user-defined name
  recipes: Recipe[];
  savedAt: string;         // ISO timestamp
}
```

---

## 5. Error Handling

- Parsing errors lead to rejection of entire input with a **general error message** displayed to the user:
  - `"Input contains invalid recipe(s)"`
- Invalid ingredient lines (missing/invalid quantity or unit) cause the rejection.
- Missing or duplicate titles, missing ingredients or steps cause rejection.
- UI should clearly display error messages after clicking **Parse**.

---

## 6. User Interface Flow

1. User enters recipe text (one or multiple recipes) in the textarea.
2. User clicks **Parse**.
3. If input is valid, parsed recipes show on a new view stacked together.
4. User may click **Save** button.
5. Popup/modal asks user to input **batch name**.
6. After confirmation, the batch is saved to local storage.
7. User can view saved batches in a separate section (list of cards).
8. Clicking a saved batch opens full batch view (all recipes stacked).

---

## 7. Additional Details

- The parsing operation **resets the view each time**, discarding any previous parse results.
- Saved batches are **persistent per user/device** via local storage.
- No user authentication or server-side user management.
- Saved batches cannot be edited, only viewed or deleted (with confirmation).
- Error messages on invalid input are general (no line-by-line feedback).
- The UI uses styled cards for saved batches and parsed recipes.
- Multiple recipes are parsed and saved as a single batch.
- The ingredient quantity supports fractions, decimals, and whole numbers.
- Units are treated as free text.
- Steps are displayed as a numbered list, ingredients as unordered list.

---

## 8. Testing Plan

- **Unit tests** for parsing logic (valid and invalid inputs).  
  - Test correct parsing of TITLE, ING, STEP lines.  
  - Test detection of missing or duplicate titles.  
  - Test rejection of invalid ingredient lines (invalid quantity/unit).  
  - Test multi-recipe parsing with valid and invalid batches.
- **UI tests**:  
  - Parse button triggers parsing and displays results.  
  - Error message displays on invalid input.  
  - Save button prompts for batch name and saves correctly.  
  - Saved batches load correctly from local storage.  
  - Deletion prompts confirmation and removes batch from storage.  
  - Viewing saved batches shows all recipes stacked.
- **Integration tests**:  
  - End-to-end flow: input text → parse → display → save → load saved → delete.
- **Cross-browser tests** to ensure local storage compatibility.

---

# End of Specification
