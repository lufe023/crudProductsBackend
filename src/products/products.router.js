const router = require('express').Router()

const productsServices = require('./products.services')

router.get('/', productsServices.getAllProducts)
router.post('/', productsServices.postProducts)

router.get('/:id', productsServices.getProductsByid)
router.patch('/:id', productsServices.patchProducts)
router.delete('/:id', productsServices.deleteProducts)


module.exports = router