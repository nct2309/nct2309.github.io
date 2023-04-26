
export interface User{
    id: number,
    username: string,
    password: string,
    role: string,
    lastName: string,
    firstName: string,
    is_available: number
}

// Should be not used
export interface Worker {
    id: string,
    username: string,
    firstName: string,
    lastName: string,
    position:  number,
    avatar: string,
    status: number,
    memberSince: string,
}

export interface Vehicle {
    id: string,
    location: string,
    usebyID: string,
    status: number,
}

export interface MCP {
    id: number,
    location: [number, number],
    capacity: number,
    used: number,
    is_full: boolean,
}

export interface Vehicles {
    id: number,
    is_available: boolean,
    capacity: number,
    fuel: number,
    type: string,
}

export interface Task {
    id: number,
    from_user_id: number,
    to_user_id: number,
    vehicle_id: number,
    mcp_location: [number, number][],
    created_at: string,
    completed_at: string,
}