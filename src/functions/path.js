// Import npm and local modules
import { fileURLToPath } from 'url'
import { dirname } from 'path'
// Create path function
const path = (() => {
    // Create __filename function
    const __filename = ({url}) => {
        let __filename = fileURLToPath(url);
        return __filename;
    }
    // Create __dirname function
    const __dirname = ({url}) => {
        let __filename = fileURLToPath(url);
        let __dirname = dirname(__filename);
        return __dirname;
    }
    return {
        __filename,
        __dirname
    }
})();

export default path;