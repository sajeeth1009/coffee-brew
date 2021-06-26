import apiInstance from './instances/defaultApi';

import { CoffeeMenu } from './types/coffeeMenu';

// Study API
export const getCoffeeMenuRequest = (machineId: string) => apiInstance.get<CoffeeMenu>(`/coffee-machine/${machineId}`);