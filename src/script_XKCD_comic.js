function validateData(string){
    try {
        const newUrl = new URL(string);
        const pattern = new RegExp(
            '^([a-zA-Z]+:\\/\\/)?' + // protocol
              '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
              '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
              '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
              '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
              '(\\#[-a-z\\d_]*)?$', // fragment locator
            'i'
          );
          
        return (newUrl.protocol === 'http:' || newUrl.protocol === 'https:')&&pattern.test(string);
      } catch (err) {
        return false;
      }
}

async function getComic(){  
    // fetching id from inno
    var var_ID = await fetch('https://fwd.innopolis.app/api/hw2?email=n.niakhai@innopolis.university');
    var var_ID_json = await var_ID.json();
    console.log(var_ID_json);
    
   // Verify data xcc
    if(validateData(var_ID)){
        alert('Invalid source!');
       return;
    }

    // API fetching xcc data from comic site
    var comic_obj = await fetch(`https://getxkcd.vercel.app/api/comic?num=`+var_ID,{
    }).then((response) => response.json())
    .then(function(object){
        console.log(object);
        return object;
    }).catch(function(err){
        console.warn('Something went wrong, while gettind XKCD comic.')
    });

 

    //setting data in api
    const dataUpload = new Date(comic_obj.month+"/"+comic_obj.day+"/"+comic_obj.year);
    const templateDate = (date) => date.toLocaleDateString("en-GB",{
        era:"long"
    })
    //console.log(`Type of date ${typeof(date)}`);

    // Comic display
     document.querySelector('.XKCD_comic').innerText = `\n\nDescription of comic:\n${comic_obj.transcript}\n\nData of comic: ${templateDate(dataUpload)}\n\n`;
     const image = document.querySelector('.XKCD_comic_image');
     image.title=comic_obj.title;
     image.src=comic_obj.img;
     image.alt=comic_obj.alt;
}
