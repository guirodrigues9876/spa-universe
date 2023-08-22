export class Router {

    routes = {}

    add(routeName, page) {
       this.routes[routeName] = page
    }

    route(event){
        event = event || window.event
        event.preventDefault()

        window.history.pushState({}, "", event.target.href)

        this.handle()
    }

    handle(){
        const { pathname } = window.location
        const route = this.routes[pathname] || this.routes[404]
        const url = route.split('/')[3].slice(0,-5)

        fetch(route)
        .then(data => data.text())
        .then(html => {
            document.querySelector('#app').innerHTML = html
            document.querySelector('body').style.backgroundImage =  `url(/src/assets/${url}.png)`
        })
    }
}