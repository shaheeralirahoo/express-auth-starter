import type { AuthDto } from "./schemas/auth.schema";
import {
  BadRequestException,
  NotFoundException,
} from "../../utils/exception.util";
import { createUser, findOneUser } from "../users/users.service";
import { AUTH_MESSAGES } from "./auth.constant";
import { verifyPassword } from "../../utils/hash.util";

export async function signIn(user: AuthDto) {
  const oldUser = await findOneUser({

    where: { username: user.username }
    });

  if (!oldUser) throw new NotFoundException(AUTH_MESSAGES.NOT_FOUND);
  
  // if (oldUser.password != user.password)
  //   throw new BadRequestException(AUTH_MESSAGES.INC_CREDENTIALS);

  return oldUser;
}

export async function signUp(user: AuthDto) {
  const oldUser = await findOneUser({ where: { username: user.username } });
  if (oldUser) throw new BadRequestException(AUTH_MESSAGES.ALREADY_EXISTS);

  return await createUser(user);
}

