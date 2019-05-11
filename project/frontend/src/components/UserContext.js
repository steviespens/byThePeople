
import React from "react";

export const UserContext = React.createContext({
    user: null,
    setUser: () => {},
});
// function ThemeTogglerButton() {
//     // The Theme Toggler Button receives not only the theme
//     // but also a toggleTheme function from the context
//     return (
//         <UserContext.Consumer>
//             {({ user, setheme }) => (
//                 <button
//                     onClick={toggleTheme}
//                     style={{ backgroundColor: theme.background }}>
//                     Toggle Theme
//         </button>
//             )}
//         </ThemeContext.Consumer>
//     );
// }
