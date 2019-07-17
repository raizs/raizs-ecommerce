import { BaseController } from '../../helpers';
import { ProductsRepository } from "../../repositories"
import sortby from 'lodash.sortby';

export class SearchBarController extends BaseController {

  constructor({ toState, getState, getProps }) {
    super({ toState, getState, getProps });
    this.productRepo = new ProductsRepository();
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.goToProduct = this.goToProduct.bind(this);
    this.timeout = null;
  }    

  async handleChange(e, format) {
    const { errors } = this.getState();
    await this.toState(this.baseHandleChange(e, null, errors));

    clearTimeout(this.timeout)
    this.timeout= setTimeout(this.handleSearch, 500)
    this.toState({loading:true})
    // this.handleSearch()
  }

  async handleSearch(){
    this.toState({loading:false})
  	const { search } = this.getState();
  	const { products } = this.getProps();
    let results = []
    if (search){
  	 results = sortby(products._search(search), "popularity").reverse();
     // if (results.length >=50){
     //  results.slice(0, 50)
     // }
    }	

  	this.toState({results})
  }

  goToProduct(id){
    const { history, toggleSearchBarAction } = this.getProps();

    toggleSearchBarAction(false)

    history.push(`/produto/${id}`)
  }

}
