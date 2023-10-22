# **Image Slider React Application**
    
This project is a fully functional Image Slider application built with React. It features smooth transitions between images and sections powered by the GSAP library, and the ability to add your own images and sections.

#### Installation

    Clone the repository to your local machine, navigate to the project directory in your terminal, and run the following commands:
    npm install
    npm run start
The first command installs the necessary dependencies, and the second command starts the development server.

### Project Structure and Components

* **App:** This is the main component where the different sections and images are managed. It imports the mock data sets and uses them to render the Header and ImageSlider components.
* **Header:** This component displays the details of the photographer and the category.
* **ImageSlider:** This component is responsible for displaying and managing the image slider. It includes the Sections, MainImage, ImageCounter, and Thumbnails components.
* **Sections:** This component displays the section titles.
* **MainImage:** This component displays the main image.
* **ImageCounter:** This component displays the active image index and the total number of images.
* **Thumbnails:** This component displays the thumbnail images.

### Adding Images and Sections
To add images and sections, you need to modify the mock data sets (mockData and mockData1). Each of these is an array of objects, with each object representing an image (or a section) and its metadata. Here is an example of how an image object looks like:

`    {
    section: "section1",
    photographer: "photographer1",
    category: "category1",
    src: "image_path",
    alt: "image_alt",
    id: "unique_id",
    color: "dominant_color",
    }
`

Note: The src field should contain the path to the image file. If the image file is located in the public directory of your project, the path would be something like /public/images/my_image.jpg.
