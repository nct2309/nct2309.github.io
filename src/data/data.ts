// This folder is for .json files
import activity from './Activity.json';
import mcp from './MCP.json';
import messages from './Messages.json';
import route from './Route.json';

import user from './User.json'
import vehicle from './Vehicle.json'

export const activityData = activity.data;

export const messagesData = messages.data;
export const routeData = route.data;

export const userData = user.data;
export const vehicleData = vehicle.data;
export const mcpData = mcp.data;

const data = {
    'user': userData,
    'vehicle': vehicleData,
    
    'mcp': mcpData,
    'messages': messagesData,

    'activity': activityData,
    'route': routeData,
    
}

export default data;