import express from "express";

import serverRenderer from '../middleware/renderer';
import configureStore from '../../src/store/configureStore';
import { setCurrentProductAction } from '../../src/store/actions';
import { ProductsRepository } from "../../src/repositories"
import { Product } from "../../src/entities"

const router = express.Router();
const path = require("path");


const actionIndex = async (req, res, next) => {
	let splitedUrl = req.baseUrl.split("/")
    const store = configureStore();
    console.log("PASSA NO SERVER")
	if (splitedUrl.length>=3 && splitedUrl[2] =="p"){
		let seoDescription = splitedUrl[1];
		let productRepo = new ProductsRepository();
		let promise = await productRepo.fetchProduct(`seoDescription=${seoDescription}`)
	    await store.dispatch(setCurrentProductAction(new Product({...promise.data, stock:{}})))
		// console.log(promise)
	}
	console.log("PRODUCTPAGE LOGIC");


    serverRenderer(store)(req, res, next);

};


// root (/) should always serve our server rendered page
router.use('^/$', actionIndex);

// other static resources should just be served as they are
router.use(express.static(
    path.resolve(__dirname, '..', '..', 'build'),
    { maxAge: '30d' },
));

// any other route should be handled by react-router, so serve the index page
router.use('*', actionIndex);


export default router;
