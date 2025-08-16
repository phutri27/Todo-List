const test = document.querySelector("input");
document.querySelector("form").addEventListener("submit", (e)=>{
    e.preventDefault();
    console.log(test.value);
})