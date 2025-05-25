# Detailed TODO Checklist for Recipe Parsing Application

---

## 1. Project Initialization

### 1.1 Frontend Setup
- [ ] Initialize a new React project with TypeScript (`create-react-app` or Vite)  
- [ ] Setup TypeScript configuration (`tsconfig.json`) with strict type checking enabled  
- [ ] Configure ESLint and Prettier for consistent code style  
- [ ] Setup Jest and React Testing Library for unit and integration tests  
- [ ] Create basic folder structure: `/src/components`, `/src/hooks`, `/src/utils`, `/src/types`  

### 1.2 Backend Setup
- [ ] Initialize a new Node.js project with TypeScript (`npm init`, `ts-node`)  
- [ ] Setup basic Express server or similar lightweight framework  
- [ ] Setup TypeScript configuration with strict mode  
- [ ] Configure ESLint and Prettier  
- [ ] Setup Jest for backend unit tests  
- [ ] Create basic folder structure: `/src/routes`, `/src/controllers`, `/src/models`, `/src/utils`  

---

## 2. Data Structures and Types

### 2.1 Define Recipe-Related Types
- [ ] Define `Recipe` interface with:  
  - `title: string`  
  - `ingredients: Ingredient[]`  
  - `steps: string[]`  
- [ ] Define `Ingredient` interface with:  
  - `quantity: number` (float, or fraction parsed as float)  
  - `unit: string` (free text)  
  - `name: string`  
- [ ] Define `Batch` interface with:  
  - `batchName: string`  
  - `recipes: Recipe[]`  

### 2.2 Define Parsing Error Types
- [ ] Define structured error object with fields:  
  - `lineNumber: number`  
  - `message: string`  
  - `type: 'MissingTitle' | 'MissingIngredient' | 'MissingStep' | 'InvalidLineFormat' | 'InvalidQuantity' | ...`  

---

## 3. Parsing Logic Implementation

### 3.1 Basic Parsing Flow
- [ ] Implement function to split input text into lines  
- [ ] Trim whitespace and ignore empty lines  
- [ ] Identify line type prefix: `TITLE:`, `ING:`, `STEP:`  
- [ ] Group lines into recipes based on `TITLE:` lines (each `TITLE:` starts a new recipe)  

### 3.2 Validation Rules
- [ ] Ensure each recipe has exactly one `TITLE:` line  
- [ ] Ensure at least one `ING:` and one `STEP:` line per recipe  
- [ ] Reject and record error if line prefix is unknown or line is malformed  
- [ ] Validate ingredient line format: `ING:` followed by quantity, unit, and name  
- [ ] Parse quantity: support decimal numbers and simple fractions (e.g., `1`, `0.5`, `1/2`)  
- [ ] Allow any string after quantity as unit (no unit validation)  
- [ ] Allow any string after unit as ingredient name (must not be empty)  

### 3.3 Error Reporting
- [ ] Collect all errors per input parse attempt (do not stop at first error)  
- [ ] Return structured error list alongside partial or no parsed results  
- [ ] Format error messages with line numbers and descriptions  

### 3.4 Unit Tests for Parsing
- [ ] Valid single recipe with correct format  
- [ ] Multiple recipes in one input  
- [ ] Missing title line error  
- [ ] Missing ingredient or step line error  
- [ ] Invalid ingredient quantity format  
- [ ] Invalid line prefix  
- [ ] Empty or whitespace-only lines ignored  

---

## 4. Frontend Components & UI

### 4.1 Recipe Input Form
- [ ] Textarea for multi-line recipe input, controlled component  
- [ ] "Parse" button triggers parsing logic  
- [ ] Display parsing errors prominently under textarea, with line numbers and messages  
- [ ] Clear previous parse results and errors when user edits input  

### 4.2 Recipe Display View
- [ ] On successful parse, navigate to or render a new view/page showing:  
  - Recipe Title as `<h1>` or `<h2>` heading  
  - Ingredients as an unordered list (`<ul>`)  
  - Steps as a numbered list (`<ol>`)  
- [ ] Style recipes as cards with border, shadow, padding, and consistent font styling  
- [ ] Responsive layout (cards stacked vertically on narrow screens)  

### 4.3 Batch Management UI
- [ ] "Save Batch" button below recipe display  
- [ ] On click, open modal/popup dialog to input batch name (required)  
- [ ] Save batch (batch name + parsed recipes) to localStorage  
- [ ] List saved batches below input form as clickable cards showing batch name and number of recipes  
- [ ] Clicking batch card opens combined batch view  

### 4.4 Batch View
- [ ] Render all recipes in batch together as separate cards stacked vertically  
- [ ] Below recipe cards, render aggregated shopping list with combined ingredient quantities  
- [ ] Style shopping list with clear headings and well-spaced items  
- [ ] Provide batch deletion button with confirmation modal  

---

## 5. Ingredient Aggregation Logic

### 5.1 Combine Ingredients Across Recipes
- [ ] Normalize ingredient names (case insensitive trim) before comparison  
- [ ] Group ingredients by `[name + unit]` key  
- [ ] Sum quantities for grouped ingredients  
- [ ] Handle fractional quantities by converting to floats  
- [ ] Format aggregated quantities as decimal numbers (optionally fractional display later)  

### 5.2 Display Aggregated Shopping List
- [ ] Render combined ingredients as an unordered list or table  
- [ ] Show quantity, unit, and ingredient name clearly  
- [ ] Ensure list updates correctly when viewing different batches  

---

## 6. Persistence

### 6.1 Local Storage Handling
- [ ] Save batches as JSON string in localStorage under a consistent key (e.g., `recipeBatches`)  
- [ ] Load batches from localStorage on app startup and on demand  
- [ ] Update UI batch list based on loaded data  
- [ ] Handle corrupt or invalid localStorage data gracefully  

### 6.2 Tests for Persistence
- [ ] Save batch and verify data in localStorage  
- [ ] Load batch list and batch details from localStorage correctly  
- [ ] Delete batch and verify removal from localStorage  

---

## 7. Testing Strategy

### 7.1 Unit Tests
- [ ] Parser function tests for all input scenarios  
- [ ] Ingredient quantity parsing and aggregation tests  
- [ ] LocalStorage read/write utility tests  

### 7.2 Integration Tests
- [ ] Full flow test: input text → parse → render recipe(s) → save batch → load batch  
- [ ] Error display on invalid input  
- [ ] Batch deletion and UI update  

### 7.3 Manual Testing
- [ ] Cross-browser testing: Chrome, Firefox, Edge, Safari  
- [ ] Responsive UI test on desktop and mobile viewports  
- [ ] Accessibility checks: keyboard navigation, screen reader labels  

---

## 8. Final Polishing

- [ ] Code cleanup: remove console logs, dead code  
- [ ] Ensure all components have PropTypes or TypeScript typings  
- [ ] Add ARIA roles and labels for accessibility  
- [ ] Improve UI with consistent color scheme and typography  
- [ ] Document project setup and usage in README.md  

---

## Optional Future Enhancements

- [ ] Backend API to persist batches remotely  
- [ ] User authentication and multi-device sync  
- [ ] Fraction display and unit conversion in aggregation  
- [ ] Export shopping list as CSV or PDF  
- [ ] Allow import/export of recipe text files  

---

# End of Detailed TODO Checklist
