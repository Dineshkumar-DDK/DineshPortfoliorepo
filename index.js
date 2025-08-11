$(function(){
   
    let nav = document.querySelector('#navbar')
    let startNav = document.querySelector('#projectspace')
    let navHeight = nav.scrollHeight
    let backtoTop = document.querySelector('#backtotop')

    //====== paralax effect ======== //
    let headerContent = document.querySelector('.header-content')

    
    function moveHeader(){
    let transitionDist=startNav.getBoundingClientRect().top-navHeight
    transitionDist < 0 ? nav.classList.add('in-body') : nav.classList.remove('in-body')
    transitionDist < 0 ? backtoTop.classList.add('nav-top') : backtoTop.classList.remove('nav-top')
    
}
   addEventListener('scroll', () => {
        requestAnimationFrame(moveHeader);
    });
})