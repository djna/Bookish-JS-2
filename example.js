

doWork(-1);
doWork(0);
doWork(1);

async function doWork(value) {
    console.log("request ");

    
    
        getItems(value).then(
            (items) =>
                console.log("workWith", items)
        ).catch(e => console.log("Promise catch Error", e));
    
    
    
    /*
    try {
        let items = await getItems(value);
        //.catch(
        //    e => console.log("caught from await", e)
        //);
        console.log("awaited workWith", items);
    } catch (e) {
        console.log(" repo threw", e);
    }
    */
    
    

    return;
}

async function getItems(value){
    if ( value < 0) {
        return Promise.reject("Negative failure");
    } else  if (value == 0){
        throw "Zero failure";
    } else {
        return "Got some items";
    }

}