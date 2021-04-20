const container = {}

function buttonclick(e) {
    if(e.target?.dataset?.btn){
        switch (e.target.dataset.btn) {
            case "prev":
                prev();
                break;
            case "next":
                next();
                break;
        }
    }
}

function unselectclass() {
    for (let i = 0; i < container.navlis.length; i++) 
        if(container.navlis[i].classList.contains('selected')) container.navlis[i].classList.remove('selected')
}

function navclick(e) {
    const index = Array.prototype.indexOf.call(e.target.parentElement.children, e.target)
    container.pos = (index)?index:0
    setTransform()
}

function setTransform() {
    unselectclass()
    setinfos()
    container.itemselements.forEach(elem=>{
        elem.style.transform = 'translate3d(' + (-container.pos * elem.offsetWidth) + 'px,0,0)';
    })
    container.navlis.forEach(elem=>{
        elem.style.transform = 'translate3d(' + (-container.pos * (elem.offsetWidth/3)) + 'px,0,0)';
    })
    if (container.navlis[container.pos]?.classList?.contains('selected')) return
    container.navlis[container.pos]?.classList?.add('selected')
}

function prev() {
    if(container.loop) {
        container.pos--
        if (container.pos < 0) {
            container.pos = (container.itemCount - 1)
        }
    } else {
        container.pos = Math.max(container.pos - 1, 0);
    }
    setTransform();
}

function next() {
    if(container.loop) {
        container.pos++
        if(container.pos > (container.itemCount - 1)){
            container.pos = 0
        }
    } else {
        container.pos = Math.min(container.pos + 1, container.itemCount - 1);
    }
    setTransform();
}

const playnext = () => {
    container.pos++
    if(container.pos > (container.itemCount - 1)){
        container.pos = 0
    }
    setTransform()
}

function _init(elem, loop = false) {
    container.gallery = elem
    const wrap = container.gallery.querySelector('.wrap');
    container.nav = container.gallery.querySelector('.gallery__nav');
    container.navlis = container.nav.querySelectorAll('li');
    container.buttons = wrap.querySelectorAll("button");
    container.items = container.gallery.querySelector('.items');
    container.itemselements = container.gallery.querySelectorAll('.item')
    container.itemCount = container.itemselements.length;
    container.pos = 0
    container.loop = loop
    container.info = null
    container.total = null
    container.buttons.forEach(button=>{
        button.addEventListener("click", buttonclick)
    })
    container.navlis.forEach(element=>{
        element.addEventListener("click", navclick)
    })
    window.addEventListener('resize', setTransform);
}

function _destroy() {
    container.buttons.forEach(button=>{
        button.removeEventListener("click", buttonclick)
    })
    container.navlis.forEach(element=>{
        element.removeEventListener("click", navclick)
    })
    window.removeEventListener('resize', setTransform);
    container = {}
}

const autoslide = (indicatif) => {
    const type = typeof(indicatif)
    if (!(type === "boolean" || type === "number")){
        if(container.interval) clearInterval(container.interval)
        container.interval = null
        return
    }
    if (!indicatif) {
        if(container.interval) clearInterval(container.interval)
        container.interval = null
        return
    }
    if(container.interval) return
    if (type === "boolean") {
        return setAutoslide(5000)
    }
    setAutoslide(indicatif)
}

const autoslidestop = () => {
    if(container.interval) clearInterval(container.interval)
}

const setAutoslide = (millisec) => {
    container.interval = setInterval(playnext, millisec)
}

const setloop = (bool) => {
    if(type === "boolean") {
        container.loop = bool
    }
}

function isElement(element) {
    return element instanceof Element || element instanceof HTMLDocument;  
}

const _setinfoelements = (posElement, totalElement) => {
    if(isElement(posElement)) container.info = posElement
    if(isElement(totalElement)) container.total = totalElement
    setinfos()
}

const setinfos = () => {
    if(container.info) {
        container.info.innerHTML = ''
        container.info.insertAdjacentHTML(`beforeend`, (container.pos+1))
    }
    if(container.total) {
        if(container.total.innerText!=container.itemCount) {
            container.total.innerHTML = ''
            container.total.insertAdjacentHTML(`beforeend`, container.itemCount)
        }
    }
}

const bundle = {
    v: "1.0.0",
    init: _init,
    destroy: _destroy,
    autoSlide: autoslide,
    stop: autoslidestop,
    loop: setloop,
    setInfosElements: _setinfoelements,
}

if (!window.jhslider) window.jhslider = bundle