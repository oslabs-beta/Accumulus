import { testServer } from './jest.setup'

export const closingTestServer = async (globalConfig) => {
  testServer.close()
}