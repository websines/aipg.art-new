Tech Stack:
- Next.js
- Typescript
- Tailwind/Shadcn
- React Query
- Zod
- Supabase
- Zustand

I want to create a art gallery, with a built in generator.

The site will also have a sidebar, i've kind of implemented, all dependencies are already installed.

The homepage will be the gallery, can be viewed by unauthenticated users.
the gallery will be a collection of images, masonry layout, with smooth scrolling infinite scroll. There will also be a search bar for the user to search for specific images. Each image will have a like button, and a download button. Also on clicking the image, it will open in a modal containing all the image details such as prompts, seed, size, modal and such, and a share button. The user can also comment on the image.

The sidebar will have the following menus:
- Home
- Generate
- Liked Images
- Generated Images
- Collections
- and a user profile picture that has logout and on click takes to profile page.

The generate page will have a form with the following fields:
1 tab (generate image only)
- Prompt
- Seed
- Size
- Model
- Steps
- Sampler
- CFG Scale
- Width
- Height
- clipskip
- denoising strength
- karras 
- hi-res fix
- public image boolean
- select an array of models (actually just 1)
- select an array of samplers (actually just 1)
- select an array of post processing
- and a generate button that will generate the image.


2nd tab img-to-img, same 

3rd tab, control nets, same