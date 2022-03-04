// Import npm and local modules
import path from './path.js';
import portCheck from './portCheck.js';
import samlStrategy from './samlStrategy.js';
// Create function of functions
const tools = (() => {
    return {
        path,
        portCheck,
        samlStrategy
    }
})();

export default tools;