// Import npm and local modules
import { fileURLToPath } from 'url'
import { dirname } from 'path'
// Create path function
const path = (() => {
    const __filename = ({url}) => {
        let __filename = fileURLToPath(url);
        return __filename;
    }
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