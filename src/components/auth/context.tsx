import React from 'react';
import { createContext } from 'react';
import { useContext, useMemo } from 'react';
import { User , Vehicle, MCP, Task } from '../../api/types';
import { Outlet, Navigate } from "react-router-dom";

export type AuthContextType = {
    currentUser: User | null;
    worker: User | null;
    vehicle: Vehicle | null;
    mcps: MCP[];
    dateTime: string;
    role: string;
    tasks: Task[];
    login: (user : User) => void;
    logout: () => void;
}
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider:React.FC<{ children: React.ReactNode }> = ({children}) => {
    
    
    const GetCurrentUser = () => {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) return JSON.parse(currentUser);
    }
    const GetWorker = () => {
        const worker = localStorage.getItem('worker');
        if (worker) return JSON.parse(worker);
    }
    const GetVehicle = () => {
        const vehicle = localStorage.getItem('vehicle');
        if (vehicle) return JSON.parse(vehicle);
    }
    const GetMCPs = () => {
        const mcps = localStorage.getItem('mcps');
        if (mcps) return JSON.parse(mcps);
    }
    const GetDateTime = () => {
        const dateTime = localStorage.getItem('dateTime');
        if (dateTime) return JSON.parse(dateTime);
    }
    const GetRole = () => {
        const role = localStorage.getItem('role');
        if (role) return JSON.parse(role);
    }
    const GetTasks = () => {
        const task = localStorage.getItem('tasks');
        if (task) return JSON.parse(task);
    }
    const [currentUser, setCurrentUser] = React.useState<User | null>(null);
    const [worker, setWorker] = React.useState<User | null>(null);
    const [vehicle, setVehicle] = React.useState<Vehicle | null>(null);
    const [mcps, setMcps] = React.useState<MCP[]>([]);
    const [dateTime, setDateTime] = React.useState('');
    const [role, setRole] = React.useState("");
    const [tasks, setTasks] = React.useState<Task[]>([]);

    // Advoid currentUser being redefined on every render
    useMemo(() => {
        setCurrentUser(GetCurrentUser());
        setWorker(GetWorker());
        setVehicle(GetVehicle());
        setMcps(GetMCPs());
        setDateTime(GetDateTime());
        setRole(GetRole());
        setTasks(GetTasks());
    }, []);

    const Login = (user : User) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        setCurrentUser(user);
    };
    const Logout = () => {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
    };

    return <AuthContext.Provider value = { { 
        currentUser: currentUser, login : Login, logout : Logout, 
        worker: worker, vehicle: vehicle, mcps: mcps, dateTime: dateTime, role: role, tasks: tasks
    } }>
      {children}
    </AuthContext.Provider>;
}
  
export function useAuthContext() {
    return useContext(AuthContext);
}

export const ProtectedRoutes = () => {
  const { currentUser } = useAuthContext() as AuthContextType;
  return <>{currentUser ? <Outlet /> : <Navigate to="/login" />}</>;
};
