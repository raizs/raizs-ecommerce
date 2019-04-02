import { BaseModel } from "../../helpers";

export class User extends BaseModel {
  constructor(user) {
    super();
    
    this.id = user.id;
    this.email = user.email;
    this.fuid = user.fuid;
    this.name = user.name;
    this.lastName = user.lastName;
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
  }
}