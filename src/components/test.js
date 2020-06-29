arr=[{name:'salo'},{name:'apro'},{name:'hkir'},{name:'bkjnasv'}]
arr1=[{id:33},{id:5},{id:66},{id:2},{id:1},{id:-4}]
console.log(arr1.sort((a, b) => (a.id > b.id) ? 1 : -1));
console.log(arr.sort((a, b) => (a.name > b.name) ? 1 : -1));


// arr.sort((a,b)=>{console.log(a.name>b.name)
// });

