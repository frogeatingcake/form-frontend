import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';

const Cyan = definePreset(Aura, {
    semantic: {
        primary: {
            50: '#e0f9f9',
            100: '#b3f0f0',
            200: '#80e6e6',
            300: '#4dd9d9',
            400: '#26cccc',
            500: '#00b3b3', // Your chosen color
            600: '#009999',
            700: '#008080',
            800: '#006666',
            900: '#004d4d',
            950: '#003333'
        },
        colorScheme: {
            light: {
                primary: {
                    color: '#00b3b3',  // Adjusted primary color
                    contrastColor: '#ffffff',
                    hoverColor: '#009999',  // Adjusted hover color
                    activeColor: '#008080'  // Adjusted active color
                },
                highlight: {
                    background: '#00b3b3',  // Adjusted background color
                    focusBackground: '#4dd9d9',  // Adjusted focus background color
                    color: '#ffffff',
                    focusColor: '#ffffff'
                },
            },
            dark: {
                primary: {
                    color: '#e0f9f9',
                    contrastColor: '#00b3b3',  // Adjusted contrast color
                    hoverColor: '#b3f0f0',
                    activeColor: '#80e6e6'
                },
                highlight: {
                    background: '#e0f9f9',
                    focusBackground: '#4dd9d9',
                    color: '#00b3b3',
                    focusColor: '#00b3b3'
                }
            }
        }
    }
});

export default Cyan;
