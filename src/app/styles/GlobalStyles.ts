'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

html,
body {
    max-width: 100vw;
    overflow-x: hidden;
    background-color: #f9fafb; /* gray-50 */
    color: #111827; /* gray-900 */
}

/* This ensures the Next.js font variable applies to all styled-components */
body {
    font-family: var(--font-jakarta), sans-serif; 
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

a {
    color: inherit;
    text-decoration: none;
}

button {
    font-family: inherit; /* Important for buttons to pick up the font */
}
`;

export default GlobalStyles;