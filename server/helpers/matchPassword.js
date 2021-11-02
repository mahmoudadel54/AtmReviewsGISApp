

module.exports = async function(password,hashedPassword){

   return  bcrypt.compare(password, hashedPassword);
         
}