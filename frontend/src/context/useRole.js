import { useContext } from 'react';
import { RoleContext } from './RoleStore';

export function useRole() {
    return useContext(RoleContext);
}
