
import axios from "axios"
import { parse } from 'node-html-parser';

class LinkGrabber{
    constructor(url){
        this.url = url
    }
    async getHTML(){
        if(!this.url) return false
        return axios(this.url,{credentials: 'include'})
        .then(response=>response.data)
    }
    getHTMLObject(){
        return this.getHTML().then(string=>parse(string))
    }
    getLinks(){
        return this.getHTMLObject()
        .then(htmlObj=>htmlObj
            .querySelectorAll("a")
            .map(e=>e.getAttribute("href"))
        )
    }
    getOutsideLinks(){
        const host = this.getHost()
        return this.getLinks().then(links=>
            links
            .filter(l=>l)
            .filter(l=>l.match(/^(http|https):/))
            .filter(l=> !l.includes(host) )
        )
    }
    getHost(){
        return this.url.replace("https://",'').replace("http://",'').replace("www.",'')
    }
}

export default LinkGrabber