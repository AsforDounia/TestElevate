const arr = [
    {cat:"men",
        prix:150
    },
    {cat:"women",
    prix:170
    },
    {cat:"men",
        prix:180
    },
    {cat:"women",
    prix:100
    },
    {cat:"men",
        prix:200
    },
    {cat:"women",
    prix:10
    }
]
let res = arr.filter(category => {
    return category.cat === "women";
});
res = res.sort((a, b) => {
    if(a.prix > b.prix){
        return 1
    }else if(a.prix < b.prix){
        return -1
    }
    else return 0;
    return b.prix - a0.prix
});
console.log(res);
// console.log(arr);