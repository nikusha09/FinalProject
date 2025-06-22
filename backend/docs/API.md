# 📖 Recipe Parsing API - Endpoints

## Base URL

http://localhost:3000/api


---

## Endpoints

### 📌 POST /parse
*Description:*  
Parses provided recipe text into structured recipes and returns parsing errors if any.

---

### 📌 POST /batches
*Description:*  
Creates and saves a new batch containing parsed recipes.

---

### 📌 GET /batches
*Description:*  
Retrieves a list of all saved recipe batches.

---

### 📌 GET /batches/:batchName
*Description:*  
Fetches details of a single batch by its batchName.

---

### 📌 DELETE /batches/:batchName
*Description:*  
Deletes a batch by its batchName.

---

## Notes
- All endpoints expect and return JSON.
- Parsing validates recipe structure (TITLE, ING, STEP lines).
- Batches are stored in-memory.