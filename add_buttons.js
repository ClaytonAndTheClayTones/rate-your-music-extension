
const update_album_panel = function(albumId, panel)
{ 
    chrome.storage.local.get([albumId], function(item) {   
        if(item[albumId]==="like")
        { 
            $(panel).css('background', "radial-gradient(#EFFFEF,#B0DFB0)");
        }
        else if(item[albumId]==="dislike")
        { 
            $(panel).css('background', "radial-gradient(#FFEFEF,#DFB0B0)");
        }
        else if(item[albumId]==="unsure")
        { 
            $(panel).css('background', "radial-gradient(#EFEFFF,#B0B0DF)");
        }
        else
        {  
          $(panel).css('background',"linear-gradient(to right,#f3f3f3,#fdfdfd)");
        }
   });
}

const getAlbumIdFromItemBox = function(itemBox)
{ 
    const id = $(itemBox).find('.release')[0].title;
 
    return id; 
}
   
const albumBoxes = $('.topcharts_itembox');
     
$(albumBoxes).each(function(albumBoxIndex, albumBoxObject) {
      
    let albumId = getAlbumIdFromItemBox(albumBoxObject);
     
    update_album_panel(albumId, albumBoxObject);

    $(albumBoxObject).append("<input type='submit' class='like-button' id='" + albumId + "' value='Like'/>   ");  
    $(albumBoxObject).append("<input type='submit' class='dislike-button' id='" + albumId + "' value='Dislike'/>   "); 
    $(albumBoxObject).append("<input type='submit' class='unsure-button' id='" + albumId + "' value='Unsure'/>   "); 
    $(albumBoxObject).append("<input type='submit' class='unlistened-button' id='" + albumId + "' value='Unlistened'/>   "); 
});

$(".like-button").click(function(){
    const button = $(this)[0];

    const store_key = button.id;

    const store_object = {};
    store_object[store_key] = "like";

    chrome.storage.local.set(store_object, function(result) {
        console.log(store_key + " liked");

        const parent_main = $(button).closest(".topcharts_itembox");

        update_album_panel(button.id, parent_main);

    });
});

$(".dislike-button").click(function(){
    const button = $(this)[0];

    const store_key =  button.id;

    const store_object = {};
    store_object[store_key] = "dislike";

    chrome.storage.local.set(store_object, function(result) {
        console.log(store_key + " disliked");

        const parent_main = $(button).closest(".topcharts_itembox");

        update_album_panel(button.id, parent_main);

    });
});

$(".unsure-button").click(function(){
    const button = $(this)[0];

    const store_key =  button.id;

    const store_object = {};
    store_object[store_key] = "unsure";

    chrome.storage.local.set(store_object, function(result) {
        console.log(store_key + " unsure");

        const parent_main = $(button).closest(".topcharts_itembox");

        update_album_panel(button.id, parent_main);

    });
});

$(".unlistened-button").click(function(){
    const button = $(this)[0];

    const store_key = button.id;

    chrome.storage.local.remove(store_key, function(result) {
        console.log(store_key + " unlistened"); 
        
        const parent_main = $(button).closest(".topcharts_itembox");

        update_album_panel(button.id, parent_main);
    });
}); 