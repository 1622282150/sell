let dateFormat = value => {
    if (!value || !value.length) {
        return;
    }
    return value.slice(0,10)
}
let titleLength = value => {
    if (!value || !value.length) {
        return;
    } else if (value.length > 15) {
        return value.slice(0,14)+'...'
    } else {
        return value
    }
    
}
let usernameLength = value => {
    if (!value || !value.length) {
        return;
    } else if (value.length > 7) {
        return value.slice(0,7)+'...'
    } else {
        return value
    }
    
}

let messageLength = value => {
    if (value > 98) {
        return 98
    } else {
        return value
    }
    
}
let communityname = value => {
    if (!value || !value.length) {
        return;
    } else if (value.length >5) {
        return value.slice(0,4)+'...'
    } else {
        return value
    }
    
}
let recodename = value => {
    if (!value || !value.length) {
        return;
    } else if (value.length >5) {
        return value.slice(0,5)+'...'
    } else {
        return value
    }
    
}
// 话题分类4个字
let huafenLength= value => {
    if (!value || !value.length) {
        return;
    } else if (value.length > 4) {
        return value.slice(0,4)+'...'
    } else {
        return value
    }
    
}
let renMenLength = value => {
    if (!value || !value.length) {
        return;
    } else if (value.length > 10) {
        return value.slice(0,9)+'...'
    } else {
        return value
    }
    
}
// 文章内容43个字
let articleContent = value => {
    if (!value || !value.length) {
        return;
    } else if (value.length > 43) {
        return value.slice(0,42)+'...'
    } else {
        return value
    }
    
}
//文章标题32个字
let articleTitle= value => {
    if (!value || !value.length) {
        return;
    } else if (value.length > 32) {
        return value.slice(0,32)+'...'
    } else {
        return value
    }
    
}
//shoptitle 20字
let shopTitle= value => {
    if (!value || !value.length) {
        return;
    } else if (value.length > 20) {
        return value.slice(0,20)+'...'
    } else {
        return value
    }
    
}
let shangTitle= value => {
    if (!value || !value.length) {
        return;
    } else if (value.length > 25) {
        return value.slice(0,24)+'...'
    } else {
        return value
    }
    
}
let priceLength= value => {
   
        return value.toFixed(2);
    
    
}
let addressName= value => {
    if (!value || !value.length) {
        return;
    } else {
        return value.slice(0,1)
    }
    


}
let shopProduct= value => {
    if (!value || !value.length) {
        return;
    } else if (value.length >18) {
        return value.slice(0,17)+'...'
    } else {
        return value
    }
    
}
export {recodename,addressName,priceLength,usernameLength,dateFormat,titleLength,renMenLength,articleContent,articleTitle,shopTitle,huafenLength,shangTitle,shopProduct,communityname,messageLength}