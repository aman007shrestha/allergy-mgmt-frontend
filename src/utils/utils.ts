export const getConfig = (token: string) => {
  const config = {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  return config
}
