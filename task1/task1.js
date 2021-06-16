
const os = require("os");
const fs = require("fs");
const path = require("path");
const result = require('dotenv').config();


const getOSInfo = () => {
     // Return the OS information
    let osinfo = { 
        "Host name": os.hostname(),
        "Type": os.type(),
        "Platform": os.platform(),
        "Relsease": os.release(),
        "CPUs": os.cpus(),
        "Architecture": os.arch()};
    
    return new Promise((resolve, reject) => {
    resolve(osinfo);
})};


const OS_info_writer =  (path, data) =>
    {   // write os info in file
        fs.writeFile(path, JSON.stringify(data), ()=> { console.log("OS information has been written!") })

    }



const pathCreater = ()=> 
    new Promise((resolve, reject) => 
    {
    /* Create directory in current working director
       and create file under that directory*/

    let fileName = process.env.File_Name;
    let dirName = process.env.DIR_Name;

    // Check if directory already exists otherwise create it
    if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName);
    }
    
    let fullName = dirName + "/" + fileName;
    let filePath = path.resolve(process.cwd(), fullName);
    resolve(filePath);
})


const main = async() => {
    let data = await getOSInfo();
    let path = await pathCreater();
    OS_info_writer(path, data);
}

// Executuion point
main()
