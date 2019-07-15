module.exports = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%IN_STOCK%}/g, product.in_stock);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%SALE%}/g, product.sale);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    output = output.replace(/{%PRODUCTRATING%}/g, replaceRating(product.rating));
    
    if (!product.sale) {
        output = output.replace(/{%NO_SALE%}/g, 'no-sale');
    }
    return output;
}

// helper function
const replaceRating = (rating) => {
    var star_str = '';
    for (let i=1; i<=rating; i++) {
        star_str += '⭐';
    }
    return star_str;
}