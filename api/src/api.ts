import { api } from "encore.dev/api"

// trying to do call into https://github.com/gardencmp/jazz/tree/main/packages/jazz-nodejs
// and returning data
export const get = api(
  { expose: true, method: "GET", path: "/topic/:topic" },
  async ({ topic }: { topic: string }): Promise<Response> => {
    const msg = `Stub for getting this topic: ${topic}!`
    return { message: msg }
  },
)

interface Response {
  message: string
}
