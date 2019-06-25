import { BaseModel, Formatter } from "../../helpers";
import { UserAddresses } from "./UserAddresses.entity";

export class User extends BaseModel {
  constructor(user, userAddresses = null) {
    super();

    this.original = user;
    
    this.id = user.id;
    this.email = user.email || '';
    this.fuid = user.fuid;
    this.mpid = user.mpid;
    this.name = user.name;
    this.phone = user.phone || '';
    this.phoneString = Formatter.formatPhone(this.phone) || "Sem telefone"
    this.lastName = user.lastName;
    this.cpf = this._checkCpf(user.cnpjCpf);
    this.document = user.cnpjCpf;
    this.cpfString = Formatter.formatCpf(this.cpf)
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

    this.addresses = userAddresses || new UserAddresses(user);
  }

  getUpdatedChildren(updated) {
    let copy = this.original;
    let index = -1;

    if(updated.id === this.id) {
      copy.addressIsDefault = true;
      for(let i in copy.children) {
        copy.children[i].addressIsDefault = false; 
      }
    } else {
      if(updated.addressIsDefault) copy.addressIsDefault = false;
      for(let i in copy.children) {
        const isEq = copy.children[i].id === updated.id;
        if(updated.addressIsDefault && !isEq) copy.children[i].addressIsDefault = false; 
        if(isEq) index = i;
      }
    }

    if(index > -1) copy.children.splice(index, 1, updated);

    return copy;
  }

  _checkCpf(value) {
    if(!value) return '42061251803';
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