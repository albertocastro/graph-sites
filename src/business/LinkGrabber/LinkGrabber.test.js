/**
 * @jest-environment node
 */

import LinkGrabber from "./LinkGrabber"

it("should get the html from a site",async ()=>{
    const url = "https://www.nytimes.com"
    const lg = new LinkGrabber(url)
    const content = await lg.getHTML()
    expect(content.length)
    expect(content.includes("<html") )
})
it("should return expection if no url has been assigned",async ()=>{
    
    const lg = new LinkGrabber()
    const content = await lg.getHTML()
    expect(content).toBe(false)
})
it("should return HTML Object",async ()=>{

    const url = "https://www.nytimes.com"
    const lg = new LinkGrabber(url)
    const content = await lg.getHTMLObject()
    expect(content.constructor.name).toBe("HTMLElement")
})
it("should get all of the links",async ()=>{

    const url = "https://www.nytimes.com"
    const lg = new LinkGrabber(url)
    const content = await lg.getLinks()
    expect(content).toContain("https://www.nytimes.com/section/us")

})
describe("should get host from a given url",()=>{
    it("apple.com",()=>{
        const url = "https://apple.com"
        const lg = new LinkGrabber(url)
        expect(lg.getHost()).toBe("apple.com")

    })
    it("nytimes.com",()=>{
        const url = "https://nytimes.com"
        const lg = new LinkGrabber(url)
        expect(lg.getHost()).toBe("nytimes.com")

    })
})
describe("should get all outside links", ()=>{
    it("apple.com",async ()=>{

        const url = "https://www.apple.com"
        const lg = new LinkGrabber(url)
        const content = await lg.getOutsideLinks()
     
        expect(content).toContain("https://www.icloud.com")
    })
    it("americanexpress.com",async ()=>{

        const url = "https://www.americanexpress.com"
        const lg = new LinkGrabber(url)
        const content = await lg.getOutsideLinks()
        // console.log(content)
        expect(content).toContain("https://www.instagram.com/AmericanExpress")
        expect(content).toContain("http://shopsmall.com/OfferTerms")

    })

})
it("should get an object with all the outside links and the number of times found",async ()=>{
    const url = "https://www.americanexpress.com"
    const lg = new LinkGrabber(url)
    const content = await lg.getOutsideLinksWithCount()
    expect(content['facebook.com'])
    
})
it("should get an array with the non-repeated outside links",async ()=>{
    const url = "https://www.apple.com"
    const lg = new LinkGrabber(url)
    const content = await lg.getOutsideNonRepeatedLinks()
    expect(content)
    
})