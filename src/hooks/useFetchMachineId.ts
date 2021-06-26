export const useFetchMachineId = (): string => {
  // Ideally fetch from a machine redux store, after it has been set by a Get Machine call
  return process.env.REACT_APP_MACHINE_ID
    ? process.env.REACT_APP_MACHINE_ID
    : "60ba1ab72e35f2d9c786c610";
}
