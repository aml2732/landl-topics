# Responsive Images
- **srcset** defines "sources" - aka possible images the browser can choose to load.  srcsets are a comma separated list of pairs. Each pair consists of a URI and the width in pixels(basically) of that resource (signified as w).
  - So if you have one source, you would code something it like this: `"assets/large.png 2000w"`
  - if you have two sources, you would code something like this: `"medium.png 1024w, large.png 2000w"`
  - if you have three sources, you would code something like this: `"small.png 800w, medium.png 1024w, large.png 2000w"`
  - and so on and so forth
- **sizes**
  - sizes are weird
  - example: `"(max-width: 600px) 100vw, (max-width: 1024px) 100vw, 100vw"`
  - sizes are a comma separated list of pairs EXCEPT FOR THE last entry - which is NOT a pair. Each pair consists of a media-query (representative of screen/device size) and a width of the area this resource is to fill.
    - Elaboration on `width area this resource is meant to fill` because it tripped me up: 
      - Can be defined in px, %, vw, etc. 
      - If you are on mobile (say media query was (max-width:550px)), and you want the image being loaded to take up the entirety of your screen - you would use 100vw. (aka 100 percent of the viewwidth).
      - If you are on mobile (say media query was (max-width:550px)), and you only want the loaded image to take up 1/3 of the screen - you would use 33vw. (aka 33 percent of the viewwidth)
- Keep in mind, your browser ultimately makes the decision for which image it thinks is best to load, so don't be super concerned if the browser chooses to load an image slightly larger than you expect. Maybe it knows something about your Device Pixel Ratio that you don't!
- Another way to keep your pages easy to test responsively is to add the following to you <head> tag: `<meta name="viewport" content="width=device-width, initial-scale=1">`

## Resources:
- https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
- https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag
- https://imagekit.io/responsive-images/#:~:text=srcset%20%2D%20To%20define%20multiple%20image,or%20relative%20to%20the%20viewport.
- https://web.dev/learn/images/descriptive#:~:text=The%20ratio%20between%20a%20device's,has%20a%20DPR%20of%203.5.