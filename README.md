# Portrait Component

A dynamic and responsive React image slider component with GSAP animations, section-based navigation, and drag/touch interactions — ideal for photographer portfolios and image galleries.

## Features

### Free Tier
- **Responsive Design**: Adapts seamlessly to different screen sizes.
- **Animated Transitions**: Uses GSAP for smooth zoom and slide animations.
- **Interactive Image Slider**: Displays images with a dynamic header, counter, and draggable thumbnails.
- **Section-Based Navigation**: Easily switch between different image datasets.
- **Modern Styling**: Built with Tailwind CSS for a clean, utility-first approach.
- **Error Handling**: Graceful fallback when images fail to load.
- **Accessible**: ARIA labels and semantic markup.
- **Optimized Performance**: React.memo on key components to prevent unnecessary re-renders.

### Pro Tier
- **Fullscreen Lightbox**: Click any image to view it in a fullscreen overlay with Escape-to-close.
- **Keyboard Navigation**: Navigate images with Arrow keys (Left/Right/Up/Down).
- _More Pro features coming soon: advanced animation presets, watermark overlay, analytics integration._

## Installation

### As an npm package

```bash
npm install portraitcomponent
```

### Import and use

```tsx
import { ImageSlider, LicenseProvider } from 'portraitcomponent';
import 'portraitcomponent/styles';

const images = [
  { id: 1, imageUrl: '/photo1.jpg', photographer: 'Jane', category: 'Portraits' },
  { id: 2, imageUrl: '/photo2.jpg', photographer: 'Jane', category: 'Portraits' },
];

const sections = [{ title: 'Portraits', data: images }];

function App() {
  return (
    <LicenseProvider licenseKey="your-pro-key-here"> {/* omit licenseKey for free tier */}
      <ImageSlider
        images={images}
        sections={sections}
        onSectionClick={(data) => console.log(data)}
      />
    </LicenseProvider>
  );
}
```

### From source

```bash
git clone https://github.com/pastamamba/portraitcomponent.git
cd portraitcomponent
npm install
```

## Pro License

Unlock Pro features by wrapping your app with `<LicenseProvider>` and providing a valid license key:

```tsx
<LicenseProvider licenseKey="PC-PRO-XXXX-XXXX-XXXX">
  {/* Pro features are now active */}
</LicenseProvider>
```

Without a license key (or with an invalid one), the component operates in Free tier mode with all core features available.

**Get a Pro license:** Visit [our website](https://github.com/pastamamba/portraitcomponent) or contact us for pricing.

## Technologies

- **React & React-DOM**: For building interactive UI components.
- **TypeScript**: Provides type safety and improved developer experience.
- **Vite**: Fast development server and build tool.
- **GSAP**: High-performance animation library.
- **Tailwind CSS**: Utility-first CSS framework.
- **Lodash**: For robust utility functions.
- **ESLint**: Ensures code quality and consistency.

## Development

Start the development server:
```bash
npm run dev
```
Then, open your browser and navigate to the provided local URL.

Build the library:
```bash
npm run build
```

## Project Structure
```
src/
├── components/     React components (Header, ImageSlider, MainImage, Thumbnails, Sections, FullscreenOverlay)
│   └── hooks/      Custom hooks (useAnimations for GSAP-powered animations)
├── license/        Pro license system (LicenseProvider, useLicense, useProFeature)
├── utils/          Utility functions and TypeScript types
├── constants.ts    Centralized configuration constants
├── index.ts        Library entry point (npm package exports)
└── mockData.ts     Sample image data for development and testing
public/             Public assets and static files
```

## Customization
The modular structure allows you to easily integrate and customize the component to fit your needs. Feel free to tweak the styles, animations, or component logic. Key thresholds and constants are centralized in `src/constants.ts` for easy adjustment.

## Roadmap & Improvements
See [IMPROVEMENTS.md](./IMPROVEMENTS.md) for a detailed list of identified improvement areas including testing, state management, accessibility, and performance.

## Monetization
See [MONETIZATION.md](./MONETIZATION.md) for a comprehensive guide on monetization strategies — from npm publishing and template marketplaces to SaaS platforms and consulting.

## Sponsor
If you find this project useful, consider [sponsoring the development](https://github.com/sponsors/pastamamba).

## Contributing
Contributions are welcome! If you have suggestions or bug fixes, please open an issue or submit a pull request.

## License
This project is licensed under the MIT License.
