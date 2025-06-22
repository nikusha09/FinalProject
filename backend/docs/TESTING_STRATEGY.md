# 📊 Backend Testing Strategy

This document outlines the testing approach for the Recipe Parsing Backend API.

---

## 📌 Overview

The backend uses *Jest* as the testing framework and *Supertest* for testing HTTP endpoints. The focus is on ensuring that:

- Parsing logic works correctly
- API endpoints behave as expected
- Errors are handled gracefully
- Edge cases are properly tested

---

## 📌 Test Types

### ✅ Unit Tests
Test individual functions and utilities in isolation:

- parserUtils.test.ts
  - Tests splitting and grouping of recipe text into recipe blocks
  - Checks for error detection when lines appear before TITLE:  

- parserValidation.test.ts
  - Tests quantity parsing (fractions, decimals)
  - Validates recipe content (ingredients, steps)
  - Detects invalid prefixes, missing data, and malformed lines

---

### ✅ Integration Tests (API Tests)
Test the API endpoints' full behavior using Supertest:

- parsingController.test.ts
  - POST /api/parse
  - Tests for successful parsing and error response when no text is provided  

- batchController.test.ts
  - POST /api/batches
  - GET /api/batches
  - GET /api/batches/:batchName
  - DELETE /api/batches/:batchName
  - Tests for adding, retrieving, deleting batches, and error responses for missing data or non-existent batches  

---

## 📌 Running the Tests

To run all tests:

```bash
npm run test