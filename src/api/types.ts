
export interface User{
    id: number,
    username: string,
    password: string,
    role: string,
    lastName: string,
    firstName: string,
    is_available: boolean,
}

// Should be not used
// export interface Worker {
//     id: string,
//     username: string,
//     firstName: string,
//     lastName: string,
//     position:  number,
//     avatar: string,
//     status: number,
//     memberSince: string,
// }

// export interface Vehicle {
//     id: string,
//     location: string,
//     usebyID: string,
//     status: number,
// }

export interface MCP {
    id: number,
    latitude:number,
    longitude:number,
    capacity: number,
    used: number,
    is_full: boolean,
}

export interface Vehicle {
    id: number,
    is_available: boolean,
    location: string,
    capacity: number,
    fuel: number,
    type: string,
}

export interface Task {
    id: number,
    from_user_id: number,
    to_user_id: number,
    vehicle_id: number,
    mcp_id: number[],
    created_at: string,
    completed_at: string,
}

export interface Route {
    id: number,
    mcpList: number[],
}