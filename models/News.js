var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var NewsSchema = new Schema({
  date : { type :Date,
          required:true
        },
  title : { type : String,
            required:true
          } ,
  description : { type : String ,
                 required : true
                }    
  
});

module.exports = mongoose.model('News', NewsSchema);
