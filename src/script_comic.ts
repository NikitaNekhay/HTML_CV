
// import { create } from "domain";
"use strict";

interface ComicObj{
    alt: string;
    day: string;
    img: string;
    link: string;
    month: string;
    news: string;
    num: number;
    safe_title: string;
    title: string;
    transcript: string;
    year: string;
}

function validateData(str:string | number) : boolean{
    try {
        const newUrl = new URL(str.toString());
        const pattern = new RegExp(
            '^([a-zA-Z]+:\\/\\/)?' + // protocol
              '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
              '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
              '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
              '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
              '(\\#[-a-z\\d_]*)?$', // fragment locator
            'i'
          );
          
        return (newUrl.protocol === 'http:' || newUrl.protocol === 'https:')&&pattern.test(str.toString());
      } catch (err) {
        return false;
      }
}

async function getComic(){  
    // fetching id from inno
    let varja: Response = await fetch('https://fwd.innopolis.app/api/hw2?email=n.niakhai@innopolis.university');
    let var_ID:number = await varja.json(); 
     if(validateData(var_ID) || var_ID === null){
         alert('Invalid source!');
         return;
     }
     console.log(var_ID);

    // API fetching xcc data from comic site
    let comic_obj_json:Response = await fetch(`https://getxkcd.vercel.app/api/comic?num=`+var_ID);
    let comic_obj:ComicObj = await comic_obj_json.json();    

    let dataUpload = new Date(comic_obj.month+"/"+comic_obj.day+"/"+comic_obj.year);
    let templateDate = (date:Date) => date.toLocaleDateString("en-GB",{
        era:"long"
    })

    // Comic display
    
    let ComicSpace = document.querySelector('#XKCD_comic') as HTMLSpanElement;//
  
     ComicSpace!.innerText = `\n\nDescription of comic:\n${comic_obj.transcript}\n\nData of comic: ${templateDate(dataUpload)}\n\n`;
     
     let image = document.querySelector('#XKCD_comic_image');//:HTMLImageElement | null

     if(image!=null){
        image.setAttribute('title', comic_obj.title);
        image.setAttribute('src', comic_obj.img);
        image.setAttribute('alt', comic_obj.alt);
     }
}

let comic = document.querySelector('#NN_button')
  comic?.addEventListener('click', (e:Event) => {
    e.preventDefault();
    getComic();
  });
   