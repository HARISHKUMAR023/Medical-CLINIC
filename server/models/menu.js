const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
  name : { type : String,  default : null, unique: true },
  
  status: {type : Number,default : 1},

},{
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
      }
});
const Menu = mongoose.model('menu', MenuSchema)
Menu.watch().addListener('change',(data)=>{  });

const SubMenuSchema = new mongoose.Schema({
    name : { type : String,  default : null, unique: true },
    status: {type : Number,default : 1},

    menu : {type: mongoose.Types.ObjectId, ref: "menu" ,default : null}  
  
  },{
      timestamps: {
          createdAt: 'created_at', // Use `created_at` to store the created date
          updatedAt: 'updated_at' // and `updated_at` to store the last updated date
        }
  });
  const SubMenu = mongoose.model('sub_menu', SubMenuSchema)
  SubMenu.watch().addListener('change',(data)=>{  });




module.exports = { Menu,SubMenu }