
import axios from "axios"
import { parse } from 'node-html-parser';

class LinkGrabber{
    constructor(url){
        this.url = url
    }
    async getHTML(){
        if(!this.url) return false
        return axios(this.url,
            {
                headers: {
                  
                }

        }
            )
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
    getHost(url = null){
        url = (url)?url:this.url
        url = url.replace("https://",'').replace("http://",'').replace("www.",'')
        if(url.includes("/")){
            return (url.split("/"))[0]
        }else{
            return url
        }
    }
    getBaseUrl(url){
        const host = url.replace("https://",'').replace("http://",'').replace("www.",'')
        if(host.includes("/")){
            const urlAsArray = url.split("/")
            return `${urlAsArray[0]}//${urlAsArray[2]}`
        }else{
            return url
        }
    }
    async getOutsideLinksWithCount(){
        let links = {}
        const outsideLinks = await this.getOutsideLinks()
        outsideLinks.map(l=>{
            const host = this.getBaseUrl(l)//this.getHost(l)
            if(!links[host]) links[host] = 0
            links[host] = links[host] +1
        })
        return links
    }
    async getOutsideNonRepeatedLinks(){
       const links = await this.getOutsideLinksWithCount()
       return Object.keys(links)
    }
}

export default LinkGrabber