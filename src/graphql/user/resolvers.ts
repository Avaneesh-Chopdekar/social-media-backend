import UserService, {
  CreateUserPayload,
  GetUserTokenPayload,
} from "../../services/user";

const queries = {
  getUserToken: async (_: any, payload: GetUserTokenPayload) => {
    const token = await UserService.getUserToken(payload);
    return token;
  },
  getCurrentLoggedInUser: async (_: any, params: any, context: any) => {
    if (context && context.user) {
      const { id } = context.user;
      const user = await UserService.getUserById(id);
      return user;
    }
    throw new Error("example error");
  },
};

const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const res = await UserService.createUser(payload);
    return res.id;
  },
};

const resolvers = { queries, mutations };

export default resolvers;
