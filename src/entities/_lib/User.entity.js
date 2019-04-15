import { BaseModel } from "../../helpers";

export class User extends BaseModel {
  constructor(user) {
    super();

    this.original = user;
    
    this.id = user.id;
    this.email = user.email || '';
    this.fuid = user.fuid;
    this.name = user.name;
    this.phone = user.phone || '';
    this.lastName = user.lastName;
    this.cpf = this._checkCpf(user.cnpjCpf);
    this.cnpj = this._checkCnpj(user.cnpjCpf);
    this.active = user.active;
    this.isSupplier = user.supplier;
    this.isEmployee = user.employee;
    this.isCustomer = user.customer;
    this.type = user.type;
    this.isCompany = user.isCompany;
    this.partnerShare = user.partnerShare;
    this.createDate = user.createDate;
    this.writeDate = user.writeDate;

    this.createdAt = this.createDate ? new Date(this.createDate) : null;
    this.updatedAt = this.writeDate ? new Date(this.writeDate) : null;

    this.isComplete = this._checkIfComplete();

    this._checkIfComplete = this._checkIfComplete.bind(this);
  }

  _checkCpf(value) {
    if(!value) return '';
    const length = typeof value === 'number' ? value.toSrting().length : value.length;
    if(length <= 11) return value;
    return '';
  }
  
  _checkCnpj(value) {
    if(!value) return '';
    const length = typeof value === 'number' ? value.toSrting().length : value.length;
    if(length > 11) return value;
    return '';
  }

  _checkIfComplete() {
    return Boolean(this.name && this.lastName && (this.cpf || this.cnpj) && this.email && this.phone);
  }
}