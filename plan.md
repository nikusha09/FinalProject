# Blueprint & Iterative Development Plan for Recipe Parsing Application

---

## 1. Detailed Step-by-Step Blueprint (High-level)

1. **Set up the project structure**  
   - Initialize React + TypeScript frontend  
   - Setup Node.js + TypeScript backend (optional minimal API or stub for future)  
   - Setup tooling: ESLint, Prettier, testing frameworks (Jest + React Testing Library)

2. **Design & implement recipe text parser (core logic)**  
   - Define parsing rules based on spec  
   - Create TypeScript interfaces for Recipe, Ingredient, Batch  
   - Implement parser function with strict validation  
   - Unit tests for parser covering valid & invalid inputs

3. **Frontend: Basic UI skeleton**  
   - Textarea input for recipe text  
   - Parse button triggers parsing function  
   - Display error messages on parse failure  
   - On success, show parsed recipes with title, ingredients, steps (unstyled)

4. **Frontend: Recipe display improvements**  
   - Style recipes as cards  
   - Show ingredients as unordered list, steps as numbered list  
   - Clear previous results on new parse

5. **Frontend: Batch save/load system**  
   - Add "Save batch" button  
   - Popup/modal to input batch name  
   - Save parsed batch to localStorage with unique ID  
   - Show saved batches as cards below input area  
   - Load saved batch view on card click

6. **Frontend: Batch management**  
   - Implement batch deletion with confirmation  
   - Persist saved batches across sessions

7. **Ingredient aggregation for multiple recipes**  
   - Implement logic to combine ingredient quantities with same unit and name  
   - Display aggregated shopping list view

8. **Testing & polish**  
   - Write integration tests for full flow  
   - Cross-browser testing for localStorage  
   - UI/UX improvements

---

## 2. Iterative Chunks (First Pass)

### Chunk 1: Project Setup & Parser Interface  
- Initialize React+TS project with tooling  
- Create TypeScript interfaces (Recipe, Ingredient, Batch)  
- Stub parser function that returns dummy data  
- Write unit test scaffold for parser function

### Chunk 2: Parser Implementation & Unit Tests  
- Implement full parser logic with strict validation  
- Write comprehensive unit tests for various inputs  
- Add error message generation in parser

### Chunk 3: Basic UI for Input & Parsing  
- Create textarea input and parse button  
- Hook parser function to parse button  
- Show error message on invalid input  
- Show parsed recipe data raw on success (unstyled)

### Chunk 4: Recipe Display Styling  
- Style recipes with cards, ingredients UL, steps OL  
- Clear old parse results on new parse  
- Make UI responsive and clean

### Chunk 5: Saving Parsed Batches Locally  
- Add "Save batch" button  
- Show popup for batch name input  
- Save batch to localStorage  
- Show list of saved batches as cards

### Chunk 6: Batch Viewing & Deletion  
- Clicking saved batch card shows full batch view  
- Implement delete button with confirmation  
- Persist saved batches reliably

### Chunk 7: Ingredient Aggregation Logic  
- Implement logic to combine ingredients across recipes  
- Show combined shopping list UI for selected batches

### Chunk 8: Testing & Final Polishing  
- Write integration tests  
- Add error boundaries  
- Cross-browser checks  
- UI/UX polishing

---

## 3. Iterative Chunks (Second Pass: breaking down chunk 2 and 3 further)

### Chunk 2a: Parser - Basic Line Parsing  
- Parse lines by prefix (TITLE, ING, STEP)  
- Return structured lines (partial parse)  
- Unit test line parsing with various examples

### Chunk 2b: Parser - Recipe Grouping & Validation  
- Group lines into recipes by TITLE  
- Validate required lines exist per recipe  
- Unit tests for grouping and validation

### Chunk 2c: Parser - Ingredient Parsing & Quantity Validation  
- Parse quantity (support decimals, fractions)  
- Validate unit and ingredient name presence  
- Reject invalid lines with error  
- Unit tests for ingredient parsing and validation

### Chunk 2d: Parser - Steps Extraction  
- Extract step text lines per recipe  
- Final validation pass  
- Unit tests for step extraction

### Chunk 3a: UI - Input & Button Components  
- Create controlled textarea input  
- Add parse button with click handler stub  
- Show parse error area

### Chunk 3b: UI - Display Raw Parsed Output  
- On parse success, display raw parsed JSON below input  
- Style error message in UI

### Chunk 3c: UI - Parsing Integration  
- Wire UI to call parser on parse button  
- Show errors or parsed results accordingly

---

## 4. Summary

This plan ensures:

- **Incremental progress**: build parsing logic stepwise, then UI, then saving, then extras  
- **Test-driven**: every parsing step has unit tests; UI errors and flows tested progressively  
- **No big jumps**: start with simple parsing, then add validation, then UI display, then saving  
- **Integration early**: parsing and UI integration happens early to validate architecture  
- **Good developer handoff**: each step produces working, tested features that can be reviewed

---

## 5. Next: Generate Prompts for Each Step

The next step is to write detailed prompts for each chunk above to feed to a code-generation LLM. Each prompt will:  
- Include context of previous work  
- Specify exactly what to implement & test  
- Emphasize best practices, TypeScript types, and testing  
- Ask to return only the required code/files with explanations  
- Make sure code is wired to previous steps with no orphaned code

---

# End of Blueprint & Iteration Plan
