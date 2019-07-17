import { BaseController } from "../../helpers";
import { MailRepository } from "../../repositories";
import { toast } from 'react-toastify';
toast.configure({
  autoClose: 8000,
  draggable: false,
  type:"error"
});

export class HelpCenterController extends BaseController {

  constructor({ toState, getState, getProps }) {
    super({ toState, getState, getProps });

    this.handleChange = this.handleChange.bind(this);
    this.sendContactEmail = this.sendContactEmail.bind(this);
    this.sendBePartnerEmail = this.sendBePartnerEmail.bind(this);
    this.mailRepo = new MailRepository();
  }

  handleChange(e, format) {
    this.toState(this.baseHandleChange(e, format, null));
  }

  async sendContactEmail() {
    const { name, email, msg, phone } = this.getState();
    const promise = await this.mailRepo.sendContactEmail({
      name,
      email,
      msg,
      phone
    });
    if (promise.err) {
      toast("Ocorreu um erro ao tentar enviar seu email. Confira as informações digitadas.")
    }
    else{
      toast("Email enviado com sucesso")
    }
  }

  async sendBePartnerEmail() {
    const { namePartner, emailPartner, msgPartner, phonePartner } = this.getState();
    const promise = await this.mailRepo.sendBePartnerEmail({
      name: namePartner,
      email: emailPartner,
      msg: msgPartner,
      phone: phonePartner
    });
    if (promise.err) {
      toast("Ocorreu um erro ao tentar enviar seu email. Confira as informações digitadas.")
    }
    else{
      toast("Email enviado com sucesso")
    }
  }



}