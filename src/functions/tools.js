// Import npm and local modules
import portCheck from './portCheck.js';
// Create function of functions
const tools = (() => {
    return {
        portCheck
    }
})();

export default tools;