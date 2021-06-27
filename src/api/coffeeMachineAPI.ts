import apiInstance from './instances/defaultApi';

import { CoffeeMenu } from './types/coffeeMenu';

// Coffee Machine get Menu API
export const getCoffeeMenuRequest = (machineId: string) => apiInstance.get<CoffeeMenu>(`/coffee-machine/${machineId}`);