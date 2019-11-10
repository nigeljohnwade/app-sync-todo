export const cleanEmptyStrings = (flatObject, toNull = false) =>{
    for(const item in flatObject){
        if(flatObject[item] === ''){
            toNull
                ? flatObject[item] = null
                : flatObject[item] = undefined;
        }
    }
    return flatObject;
}