import Joi from "joi";

class joiService {
  constructor() {
    this.joi = Joi;
  }

  async validateUserData(data) {
    const schema = this.joi.object({
      firstName: this.joi.string().required(),
      lastName: this.joi.string().required(),
      email: this.joi.string().email().required(),
      age: this.joi.number().integer().required(),
    });

    await schema.validateAsync(data);
  }
}

export default joiService;
