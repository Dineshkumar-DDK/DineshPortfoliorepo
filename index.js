$(function(){
    let nav = document.querySelector('#navbar')
    let startNav = document.querySelector('#projectspace')
    let navHeight = nav.scrollHeight

    function moveHeader(){
    let transitionDist=startNav.getBoundingClientRect().top-navHeight
    transitionDist < 0 ? nav.classList.add('in-body') : nav.classList.remove('in-body')
    requestAnimationFrame(moveHeader)
}

    requestAnimationFrame(moveHeader)
})