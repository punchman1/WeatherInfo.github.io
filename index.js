// create your own web server call your api 

const http= require("http");
const fs=require("fs")
var requests = require ("requests");

const homeFile = fs.readFileSync("home.html","utf-8");
// console.log(homeFile);


const replaceVal=(tempVal,orgVal)=>{
     let temperature = tempVal.replace("{%tempval%}",orgVal.main.temp);
      temperature =temperature.replace("{%tempmin%}",orgVal.main.temp_min);
      temperature =temperature.replace("{%tempmax%}",orgVal.main.temp_max);
      temperature = temperature.replace("{%location%}",orgVal.name);
      temperature = temperature.replace("{%country%}",orgVal.sys.country);
      temperature = temperature.replace("{%tempstatus%}",orgVal.weather[0].main);
      return temperature;
}

const server = http.createServer((req,res)=>{
 // npm init    
// install request npm 
// npm i requests

     if(req.url=="/")
     {
        requests('https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=2bed6af06728f4fa001b33a4b335035a')
.on('data', (chunk)=> { //data event in streams
     const obj_data=JSON.parse(chunk);
     const arrData=[obj_data];
     // console.log(arrData);
     const real_Time_Data=arrData.map(val => replaceVal(homeFile,val)).join("");
     // console.log(arrData[0].main.temp);
     res.write(real_Time_Data);
     // console.log(realTimeData);
})
.on('end', (err)=> {
  if (err) return console.log('connection closed ', err);
     res.end();
//   console.log('end');
});
     }
});

server.listen(8000,"127.0.0.1");
