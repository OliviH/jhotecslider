# Beautiful gallery flexbox
![alt text](https://github.com/OliviH/flexbox-gallery-slider/blob/master/Capture-20210420152636-698x632.png?raw=true)

## Javascript gallery

```javascript
if(jhslider) jhslider.init(HtmlElement, loop: Boolean) // loop default value = false

jhslider.autoSlide(true|false|1000) // true -> interval = 5000ms or set time in millisecondes

jhslider.stop() // stop auto slide or use jg.autoSlide(false)

jhslider.loop(true|false) // set or unset galery loop

jhslider.setInfosElements(InfoPositionItemSelected: HtmlElement, InfoTotalItems: HtmlElement)

```

### TO USE BUNDLER

```bash
> yarn # to install

> yarn js:esmbuild

> yarn js:iifebuild

> yarn js:build

> yarn js:watch

```