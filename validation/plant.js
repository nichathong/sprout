const Validator  = require ("validator");
const validText = require("./valid-text");

module.exports = function validPlant(data){
    let errors={};
    data.name = validText(data.name) ? data.name : ''
    data.level = validText(data.level) ? data.level : ''

    
      if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
      }
    
      if (Validator.isEmpty(data.level)) {
        errors.level = 'Level field is required';
      }
      if (Validator.isEmpty(data.waterFrequency)) {
        errors.waterFrequency = 'Water Frequency field is required';
      }
    
      return {
        errors,
        isValid: Object.keys(errors).length === 0
      };
}