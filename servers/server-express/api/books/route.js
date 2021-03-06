const express = require('express')
const router = express.Router()

const api = require('./controller')
const auth = require('../../auth/controller')

// -----------------------------------------------------------------------------
// ADMINISTRATIVE
// -----------------------------------------------------------------------------

// Seed a few books
router.post('/actions/seed', [auth.isWithAPIKey, auth.isSetup], api.seedBooks)
// Seed a lot of books
router.post('/actions/seed-lot', [auth.isWithAPIKey, auth.isSetup], api.seedBooksLot)
// Delete all books
router.delete('/actions/delete', auth.isAdmin, api.deleteBooks)

// -----------------------------------------------------------------------------
// AUTHENTICATED ACCOUNT
// -----------------------------------------------------------------------------

// Post a book
router.post('/', auth.isAuthenticated, api.postBook)
// Update a book by ISBN
router.put('/:isbn', auth.isAuthenticated, api.updateBookByISBN)
// Update a book owners
router.put('/:isbn/owners', auth.isAuthenticated, api.updateBookByISBNAndOwner)
// Delete a book by ISBN
router.delete('/:isbn', auth.isAuthenticated, api.deleteBookByISBN)

// -----------------------------------------------------------------------------
// PUBLIC USER
// -----------------------------------------------------------------------------

// Get all books with pagination
router.get('/', api.getBooks)
// Get all books without pagination
router.get('/all', api.getBooksAll)
// Get a book by ISBN
router.get('/:isbn', api.getBookByISBN)
// Search books by data
router.post('/search', api.searchBooks)

// -----------------------------------------------------------------------------

module.exports = router
