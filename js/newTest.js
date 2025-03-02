const btnNewTest=document.getElementById('btnNewTest');
btnNewTest.addEventListener('click', function(e){
    e.preventDefault();
    removeAllSections();
    logoutWithoutRedirecting();
    removeAuthInfo();
    location.reload();
}) 
// btnNewTest.onclick=(e)=>{
//     e.preventDefault();
//     removeAllSections();
//     logoutWithoutRedirecting();
//     removeAuthInfo();
// }