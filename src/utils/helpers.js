export const updateObjectInArray = (items, itemId,  objPropName, objNewProps ) => {
    return items.map(item => {
        if (item[objPropName] === itemId) {
            return {...item, ...objNewProps}
        }
        return item;
    })
};