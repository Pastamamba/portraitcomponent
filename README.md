# Portrait Component

A dynamic and responsive portrait component featuring an animated image slider with sections, smooth transitions, and intuitive user interactions.

## Features

- **Responsive Design**: Adapts seamlessly to different screen sizes.
- **Animated Transitions**: Uses GSAP for smooth zoom and slide animations.
- **Interactive Image Slider**: Displays images with a dynamic header, counter, and draggable thumbnails.
- **Section-Based Navigation**: Easily switch between different image datasets.
- **Modern Styling**: Built with Tailwind CSS for a clean, utility-first approach.
- **Error Handling**: Graceful fallback when images fail to load.
- **Accessible**: ARIA labels, keyboard navigation, and semantic markup.

## Technologies

- **React & React-DOM**: For building interactive UI components.
- **TypeScript**: Provides type safety and improved developer experience.
- **Vite**: Fast development server and build tool.
- **GSAP**: High-performance animation library.
- **Tailwind CSS**: Utility-first CSS framework.
- **Lodash**: For robust utility functions.
- **ESLint**: Ensures code quality and consistency.

## Installation

Clone the repository:

```bash
git clone https://github.com/pastamamba/portraitcomponent.git
cd portraitcomponent
```

Install the dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```
Then, open your browser and navigate to the provided local URL.

## Project Structure
```
src/
├── components/     React components (Header, ImageSlider, MainImage, Thumbnails, Sections)
│   └── hooks/      Custom hooks (useAnimations for GSAP-powered animations)
├── utils/          Utility functions and TypeScript types
├── constants.ts    Centralized configuration constants
└── mockData.ts     Sample image data for development and testing
public/             Public assets and static files
```

## Customization
The modular structure allows you to easily integrate and customize the component to fit your needs. Feel free to tweak the styles, animations, or component logic. Key thresholds and constants are centralized in `src/constants.ts` for easy adjustment.

## Roadmap & Improvements
See [IMPROVEMENTS.md](./IMPROVEMENTS.md) for a detailed list of identified improvement areas including testing, state management, accessibility, and performance.

## Monetization
See [MONETIZATION.md](./MONETIZATION.md) for a comprehensive guide on monetization strategies — from npm publishing and template marketplaces to SaaS platforms and consulting.

## Contributing
Contributions are welcome! If you have suggestions or bug fixes, please open an issue or submit a pull request.

## License
This project is licensed under the MIT License.
